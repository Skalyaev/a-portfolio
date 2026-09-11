import { fetchGithubRepoLanguages, fetchGithubUserRepos } from "@/lib/github"
import { mapWithConcurrency } from "@/lib/utils/async"

import { languageColors } from "@/constants/github/languages"
import { githubUsername, projectOverrides } from "@/constants/github/projects"

import type { ProjectTag } from "@/constants/github/projects"

const revalidateSeconds = 3600
const languageFetchConcurrency = 8

export interface ProjectLanguage {
  name: string
  bytes: number
  percent: number
  color: string
}

export interface Project {
  name: string
  descriptionKey: string | null
  htmlUrl: string
  languages: ProjectLanguage[]
  otherLanguagesPercent: number
  tags: ProjectTag[]
  lastModified: string
}

export async function getProjects(): Promise<Project[]> {
  const repos = await fetchGithubUserRepos(githubUsername, revalidateSeconds)

  const ownRepos = repos.filter(
    (repo) =>
      !repo.fork &&
      repo.name !== githubUsername &&
      projectOverrides.some((project) => project.htmlUrl === repo.htmlUrl)
  )

  const projects = await mapWithConcurrency(
    ownRepos,
    languageFetchConcurrency,
    async (repo): Promise<Project> => {
      const languages = repo.hasLanguages
        ? await fetchGithubRepoLanguages(
            githubUsername,
            repo.name,
            revalidateSeconds
          )
        : []

      const override = projectOverrides.find(
        (project) => project.htmlUrl === repo.htmlUrl
      )

      const knownLanguages = languages.filter(
        (language) => language.name in languageColors
      )
      const otherLanguagesPercent = languages
        .filter((language) => !(language.name in languageColors))
        .reduce((sum, language) => sum + language.percent, 0)

      return {
        name: repo.name,
        descriptionKey: override ? `projects.descriptions.${repo.name}` : null,
        htmlUrl: repo.htmlUrl,
        languages: knownLanguages.map((language) => ({
          ...language,
          color: languageColors[language.name]
        })),
        otherLanguagesPercent,
        tags: override?.tags ?? [],
        lastModified: repo.pushedAt
      }
    }
  )

  return projects.sort(
    (a, b) =>
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  )
}
