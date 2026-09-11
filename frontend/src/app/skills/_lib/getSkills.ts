import { fetchGithubRepoLanguages, fetchGithubUserRepos } from "@/lib/github"
import { mapWithConcurrency } from "@/lib/utils/async"

import { languageColors, languageOrder } from "@/constants/github/languages"
import { githubUsername, projectOverrides } from "@/constants/github/projects"

const revalidateSeconds = 3600
const languageFetchConcurrency = 8

export interface LanguageStat {
  name: string
  percent: number
  color: string
}

export interface LanguageProject {
  name: string
  htmlUrl: string
  descriptionKey?: string
}

export interface SkillsData {
  languages: LanguageStat[]
  otherLanguagesPercent: number
  projectsByLanguage: Record<string, LanguageProject[]>
}

export async function getSkills(): Promise<SkillsData> {
  const repos = await fetchGithubUserRepos(githubUsername, revalidateSeconds)

  const ownRepos = repos.filter(
    (repo) =>
      !repo.fork &&
      repo.hasLanguages &&
      repo.name !== githubUsername &&
      projectOverrides.some((project) => project.htmlUrl === repo.htmlUrl)
  )

  const repoLanguages = await mapWithConcurrency(
    ownRepos,
    languageFetchConcurrency,
    (repo) =>
      fetchGithubRepoLanguages(githubUsername, repo.name, revalidateSeconds)
  )

  const totalBytesByLanguage = new Map<string, number>()
  const projectsByLanguage: Record<string, LanguageProject[]> = {}
  ownRepos.forEach((repo, index) => {
    for (const language of repoLanguages[index]) {
      totalBytesByLanguage.set(
        language.name,
        (totalBytesByLanguage.get(language.name) ?? 0) + language.bytes
      )
      const projects = (projectsByLanguage[language.name] ??= [])
      const override = projectOverrides.find(
        (project) => project.htmlUrl === repo.htmlUrl
      )
      projects.push({
        name: repo.name,
        htmlUrl: repo.htmlUrl,
        descriptionKey: override
          ? `projects.descriptions.${repo.name}`
          : undefined
      })
    }
  })

  const grandTotalBytes = Array.from(totalBytesByLanguage.values()).reduce(
    (sum, bytes) => sum + bytes,
    0
  )
  if (grandTotalBytes === 0) {
    return { languages: [], otherLanguagesPercent: 0, projectsByLanguage: {} }
  }

  const languages: LanguageStat[] = Array.from(totalBytesByLanguage.entries())
    .filter(([name]) => name in languageColors)
    .map(([name, bytes]) => ({
      name,
      percent: (bytes / grandTotalBytes) * 100,
      color: languageColors[name]
    }))
    .sort(
      (a, b) => languageOrder.indexOf(a.name) - languageOrder.indexOf(b.name)
    )

  const otherLanguagesPercent = Array.from(totalBytesByLanguage.entries())
    .filter(([name]) => !(name in languageColors))
    .reduce((sum, [, bytes]) => sum + (bytes / grandTotalBytes) * 100, 0)

  return { languages, otherLanguagesPercent, projectsByLanguage }
}
