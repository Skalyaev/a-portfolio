import { mapWithConcurrency } from "@/lib/utils/async"

export interface GithubRepoSummary {
  name: string
  htmlUrl: string
  hasLanguages: boolean
  fork: boolean
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
  fork: boolean
  pushed_at: string
}

const githubApiBase = "https://api.github.com"
const githubPageSize = 100

/**
 * Calls the GitHub REST API and returns the parsed JSON body.
 *
 * Authenticates with `GITHUB_TOKEN` when set. Failures are logged, not thrown.
 *
 * @param path - API path starting with `/`, query string included.
 * @param revalidateSeconds - Lifetime of the cached response, in seconds.
 * @returns The parsed body, or `null` on a non-OK response or network error.
 */
async function githubGet<T>(
  path: string,
  revalidateSeconds: number
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

    return (await response.json()) as T
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
export async function fetchGithubUserRepos(
  username: string,
  revalidateSeconds: number
): Promise<GithubRepoSummary[]> {
  const repos: RawGithubRepo[] = []

  for (let page = 1; ; page++) {
    const data = await githubGet<RawGithubRepo[]>(
      `/users/${encodeURIComponent(username)}/repos?per_page=${githubPageSize}&page=${page}&sort=updated`,
      revalidateSeconds
    )
    if (!data) return []

    repos.push(...data)
    if (data.length < githubPageSize) break
  }

  return repos.map((repo) => ({
    name: repo.name,
    htmlUrl: repo.html_url,
    hasLanguages: repo.language !== null,
    fork: repo.fork,
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
export async function fetchGithubRepoLanguages(
  owner: string,
  repo: string,
  revalidateSeconds: number
): Promise<GithubLanguageStat[]> {
  const data = await githubGet<Record<string, number>>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`,
    revalidateSeconds
  )
  if (!data) return []

  const totalBytes = Object.values(data).reduce((sum, bytes) => {
    return sum + bytes
  }, 0)
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
