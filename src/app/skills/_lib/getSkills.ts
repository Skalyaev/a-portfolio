import { fetchGithubReposWithLanguages } from "@/lib/github"

import { languageColors, languageOrder } from "@/constants/github/languages"
import {
  githubLanguageFetchConcurrency,
  githubRevalidateSeconds,
  githubUsername,
  projectDescriptionsKey,
  projectOverrides
} from "@/constants/github/projects"

import type { LanguageShare } from "@/constants/github/languages"

export interface LanguageProject {
  name: string
  htmlUrl: string
  descriptionKey: string
}

interface SkillsData {
  languages: LanguageShare[]
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
      descriptionKey: `${projectDescriptionsKey}.${repo.name}`
    }
    for (const language of repo.languages) {
      totalBytesByLanguage.set(
        language.name,
        (totalBytesByLanguage.get(language.name) ?? 0) + language.bytes
      )
      if (languageColors[language.name]) {
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

  const languages: LanguageShare[] = Array.from(totalBytesByLanguage.entries())
    .flatMap(([name, bytes]): LanguageShare[] => {
      const color = languageColors[name]
      return color
        ? [{ name, percent: (bytes / grandTotalBytes) * 100, color }]
        : []
    })
    .sort(
      (a, b) => languageOrder.indexOf(a.name) - languageOrder.indexOf(b.name)
    )

  const otherLanguagesPercent = Array.from(totalBytesByLanguage.entries())
    .filter(([name]) => !languageColors[name])
    .reduce((sum, [, bytes]) => sum + (bytes / grandTotalBytes) * 100, 0)

  return { languages, otherLanguagesPercent, projectsByLanguage }
}
