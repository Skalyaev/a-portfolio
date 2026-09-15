import { fetchGithubRepos } from "@/lib/github"

import {
  githubRevalidateSeconds,
  githubUsername,
  projectOverrides
} from "@/constants/github/projects"

export interface ProjectCreation {
  name: string
  htmlUrl: string
  createdAt: string
}

/**
 * Fetches the creation date of the listed GitHub repositories.
 *
 * @returns The projects with their creation timestamp, or an empty array if GitHub is unavailable.
 */
export async function getProjectCreations(): Promise<ProjectCreation[]> {
  const repos = await fetchGithubRepos(
    githubUsername,
    projectOverrides.map((override) => override.htmlUrl),
    githubRevalidateSeconds
  )

  return repos.map(({ name, htmlUrl, createdAt }) => ({
    name,
    htmlUrl,
    createdAt
  }))
}
