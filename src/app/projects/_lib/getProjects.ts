import { fetchGithubReposWithLanguages } from "@/lib/github"

import { languageColors } from "@/constants/github/languages"
import {
  githubLanguageFetchConcurrency,
  githubRevalidateSeconds,
  githubUsername,
  projectOverrides
} from "@/constants/github/projects"

import type { ProjectTag } from "@/constants/github/projects"

export interface ProjectLanguage {
  name: string
  percent: number
  color: string
}

export interface Project {
  name: string
  descriptionKey: string
  htmlUrl: string
  languages: ProjectLanguage[]
  otherLanguagesPercent: number
  tags: ProjectTag[]
  lastModified: string
}

/**
 * Fetches the listed GitHub repositories with their language breakdown and tags.
 *
 * Languages without a known color are merged into `otherLanguagesPercent`.
 *
 * @returns The projects, most recently pushed first.
 */
export async function getProjects(): Promise<Project[]> {
  const tagsByUrl = new Map<string, ProjectTag[]>(
    projectOverrides.map((override) => [override.htmlUrl, override.tags])
  )
  const repos = await fetchGithubReposWithLanguages(
    githubUsername,
    Array.from(tagsByUrl.keys()),
    githubRevalidateSeconds,
    githubLanguageFetchConcurrency
  )

  const projects: Project[] = repos.map((repo) => ({
    name: repo.name,
    descriptionKey: `projects.descriptions.${repo.name}`,
    htmlUrl: repo.htmlUrl,
    languages: repo.languages
      .filter((language) => language.name in languageColors)
      .map((language) => ({
        name: language.name,
        percent: language.percent,
        color: languageColors[language.name]
      })),
    otherLanguagesPercent: repo.languages
      .filter((language) => !(language.name in languageColors))
      .reduce((sum, language) => sum + language.percent, 0),
    tags: tagsByUrl.get(repo.htmlUrl) ?? [],
    lastModified: repo.pushedAt
  }))

  return projects.sort(
    (a, b) =>
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  )
}
