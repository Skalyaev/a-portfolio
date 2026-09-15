import { fetchGithubReposWithLanguages } from "@/lib/github"

import { languageColors } from "@/constants/github/languages"
import {
  githubLanguageFetchConcurrency,
  githubRevalidateSeconds,
  githubUsername,
  projectDescriptionsKey,
  projectOverrides
} from "@/constants/github/projects"

import type { LanguageShare } from "@/constants/github/languages"
import type { ProjectTag } from "@/constants/github/projects"

export interface Project {
  name: string
  descriptionKey: string
  htmlUrl: string
  languages: LanguageShare[]
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
    descriptionKey: `${projectDescriptionsKey}.${repo.name}`,
    htmlUrl: repo.htmlUrl,
    languages: repo.languages.flatMap((language): LanguageShare[] => {
      const color = languageColors[language.name]
      return color
        ? [{ name: language.name, percent: language.percent, color }]
        : []
    }),
    otherLanguagesPercent: repo.languages
      .filter((language) => !languageColors[language.name])
      .reduce((sum, language) => sum + language.percent, 0),
    tags: tagsByUrl.get(repo.htmlUrl) ?? [],
    lastModified: repo.pushedAt
  }))

  return projects.sort(
    (a, b) =>
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  )
}
