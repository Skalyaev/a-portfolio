import { fetchGithubReposWithLanguages } from "@/lib/github"

import { languageColors, languageOrder } from "@/constants/github/languages"
import {
  githubLanguageFetchConcurrency,
  githubRevalidateSeconds,
  githubUsername,
  projectOverrides
} from "@/constants/github/projects"

export interface LanguageStat {
  name: string
  percent: number
  color: string
}

export interface LanguageProject {
  name: string
  htmlUrl: string
  descriptionKey: string
}

export interface SkillsData {
  languages: LanguageStat[]
  otherLanguagesPercent: number
  projectsByLanguage: Record<string, LanguageProject[]>
}

/**
 * Aggregates the language breakdown of the listed GitHub repositories.
 *
 * Languages without a known color are merged into `otherLanguagesPercent`.
 *
 * @returns Language percentages and the projects using each known language.
 */
export async function getSkills(): Promise<SkillsData> {
  const repos = await fetchGithubReposWithLanguages(
    githubUsername,
    projectOverrides.map((override) => override.htmlUrl),
    githubRevalidateSeconds,
    githubLanguageFetchConcurrency
  )

  const totalBytesByLanguage = new Map<string, number>()
  const projectsByLanguage: Record<string, LanguageProject[]> = {}
  for (const repo of repos) {
    const project: LanguageProject = {
      name: repo.name,
      htmlUrl: repo.htmlUrl,
      descriptionKey: `projects.descriptions.${repo.name}`
    }
    for (const language of repo.languages) {
      totalBytesByLanguage.set(
        language.name,
        (totalBytesByLanguage.get(language.name) ?? 0) + language.bytes
      )
      if (language.name in languageColors) {
        const projects = (projectsByLanguage[language.name] ??= [])
        projects.push(project)
      }
    }
  }

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
