import { mapWithConcurrency } from "@/lib/utils/async"

export interface GithubRepoSummary {
  name: string
  htmlUrl: string
  hasLanguages: boolean
  pushedAt: string
}

export interface GithubLanguageStat {
  name: string
  bytes: number
  percent: number
}

export interface GithubRepoWithLanguages extends GithubRepoSummary {
  languages: GithubLanguageStat[]
}

interface RawGithubRepo {
  name: string
  html_url: string
  language: string | null
  pushed_at: string
}

const githubApiBase = "https://api.github.com"
const githubPageSize = 100

/**
 * Tells whether a value is a plain JSON object.
 *
 * @param value - Value to check.
 * @returns Whether `value` is a non-null, non-array object.
 */
function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

/**
 * Tells whether a value is a list of repositories as returned by the GitHub API.
 *
 * @param value - Parsed response body.
 * @returns Whether every item has the repository fields used here.
 */
function isRawGithubRepoList(value: unknown): value is RawGithubRepo[] {
  return (
    Array.isArray(value) &&
    value.every(
      (repo: unknown) =>
        isJsonObject(repo) &&
        typeof repo.name === "string" &&
        typeof repo.html_url === "string" &&
        (typeof repo.language === "string" || repo.language === null) &&
        typeof repo.pushed_at === "string"
    )
  )
}

/**
 * Tells whether a value is a language breakdown as returned by the GitHub API.
 *
 * @param value - Parsed response body.
 * @returns Whether `value` maps language names to byte counts.
 */
function isLanguageBreakdown(value: unknown): value is Record<string, number> {
  return (
    isJsonObject(value) &&
    Object.values(value).every((bytes) => typeof bytes === "number")
  )
}

/**
 * Calls the GitHub REST API and returns the parsed JSON body once checked.
 *
 * Authenticates with `GITHUB_TOKEN` when set. Failures are logged, not thrown.
 *
 * @param path - API path starting with `/`, query string included.
 * @param revalidateSeconds - Lifetime of the cached response, in seconds.
 * @param isExpectedBody - Type guard the parsed body must pass.
 * @returns The parsed body, or `null` on a non-OK response, an unexpected body or a network error.
 */
async function githubGet<T>(
  path: string,
  revalidateSeconds: number,
  isExpectedBody: (value: unknown) => value is T
): Promise<T | null> {
  try {
    const token = process.env.GITHUB_TOKEN

    const headers: HeadersInit = { Accept: "application/vnd.github+json" }
    if (token) headers.Authorization = `Bearer ${token}`

    const response = await fetch(`${githubApiBase}${path}`, {
      headers,
      next: { revalidate: revalidateSeconds }
    })
    if (!response.ok) {
      console.error(`GitHub API request failed (${response.status}): ${path}`)
      return null
    }

    const body: unknown = await response.json()
    if (!isExpectedBody(body)) {
      console.error(`GitHub API returned an unexpected body: ${path}`)
      return null
    }

    return body
  } catch (error) {
    console.error(`GitHub API request failed: ${path}`, error)
    return null
  }
}

/**
 * Fetches all public repositories of a GitHub user, most recently updated first.
 *
 * @param username - GitHub login of the user.
 * @param revalidateSeconds - Lifetime of the cached responses, in seconds.
 * @returns The repositories, or an empty array if any page fails to load.
 */
async function fetchGithubUserRepos(
  username: string,
  revalidateSeconds: number
): Promise<GithubRepoSummary[]> {
  const repos: RawGithubRepo[] = []

  for (let page = 1; ; page++) {
    const data = await githubGet(
      `/users/${encodeURIComponent(username)}/repos?per_page=${githubPageSize}&page=${page}&sort=updated`,
      revalidateSeconds,
      isRawGithubRepoList
    )
    if (!data) return []

    repos.push(...data)
    if (data.length < githubPageSize) break
  }

  return repos.map((repo) => ({
    name: repo.name,
    htmlUrl: repo.html_url,
    hasLanguages: repo.language !== null,
    pushedAt: repo.pushed_at
  }))
}

/**
 * Fetches the language breakdown of a repository, largest first.
 *
 * @param owner - GitHub login of the repository owner.
 * @param repo - Repository name.
 * @param revalidateSeconds - Lifetime of the cached response, in seconds.
 * @returns The languages, or an empty array if the request fails or the repository has no code.
 */
async function fetchGithubRepoLanguages(
  owner: string,
  repo: string,
  revalidateSeconds: number
): Promise<GithubLanguageStat[]> {
  const data = await githubGet(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`,
    revalidateSeconds,
    isLanguageBreakdown
  )
  if (!data) return []

  const totalBytes = Object.values(data).reduce((sum, bytes) => sum + bytes, 0)
  if (totalBytes === 0) return []

  return Object.entries(data)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percent: (bytes / totalBytes) * 100
    }))
    .sort((a, b) => b.bytes - a.bytes)
}

/**
 * Fetches a user's repositories matching the given URLs, with their language breakdown.
 *
 * @param username - GitHub login of the user.
 * @param htmlUrls - Repository URLs to keep, e.g. `https://github.com/owner/repo`.
 * @param revalidateSeconds - Lifetime of the cached responses, in seconds.
 * @param concurrency - Maximum number of language requests running at once.
 * @returns The matching repositories, or an empty array if the repository list fails to load.
 */
export async function fetchGithubReposWithLanguages(
  username: string,
  htmlUrls: readonly string[],
  revalidateSeconds: number,
  concurrency: number
): Promise<GithubRepoWithLanguages[]> {
  const repos = await fetchGithubUserRepos(username, revalidateSeconds)
  const matchingRepos: GithubRepoSummary[] = repos.filter((repo) =>
    htmlUrls.includes(repo.htmlUrl)
  )

  return mapWithConcurrency(
    matchingRepos,
    concurrency,
    async (repo): Promise<GithubRepoWithLanguages> => ({
      ...repo,
      languages: repo.hasLanguages
        ? await fetchGithubRepoLanguages(username, repo.name, revalidateSeconds)
        : []
    })
  )
}
