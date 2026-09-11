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

interface RawGithubRepo {
  name: string
  html_url: string
  language: string | null
  fork: boolean
  pushed_at: string
}

const githubApiBase = "https://api.github.com"

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
    if (!response.ok) return null

    return (await response.json()) as T
  } catch {
    return null
  }
}

export async function fetchGithubUserRepos(
  username: string,
  revalidateSeconds: number
): Promise<GithubRepoSummary[]> {
  const data = await githubGet<RawGithubRepo[]>(
    `/users/${username}/repos?per_page=100&sort=updated`,
    revalidateSeconds
  )
  if (!data) return []

  return data.map((repo) => ({
    name: repo.name,
    htmlUrl: repo.html_url,
    hasLanguages: repo.language !== null,
    fork: repo.fork,
    pushedAt: repo.pushed_at
  }))
}

export async function fetchGithubRepoLanguages(
  owner: string,
  repo: string,
  revalidateSeconds: number
): Promise<GithubLanguageStat[]> {
  const data = await githubGet<Record<string, number>>(
    `/repos/${owner}/${repo}/languages`,
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
