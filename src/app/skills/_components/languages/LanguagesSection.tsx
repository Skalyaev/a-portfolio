import { useState } from "react"

import { LanguageBar } from "@/components/chart/LanguageBar"
import { Section } from "@/components/layout/Section"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { groupByKeys } from "@/lib/utils/collection"

import { experiences } from "@/constants/experience/experiences"
import {
  otherLanguageColor,
  otherLanguageKey
} from "@/constants/github/languages"

import { HoverRelated } from "../HoverRelated"
import { LanguageTag } from "./LanguageTag"

import type { Experience } from "@/constants/experience/experiences"
import type { LanguageShare } from "@/constants/github/languages"
import type { LanguageProject } from "../../_lib/getSkills"

const experiencesByLanguage: Partial<Record<string, Experience[]>> =
  groupByKeys(experiences, (experience) => experience.languages)

export interface LanguagesSectionProps {
  languages: LanguageShare[]
  otherLanguagesPercent: number
  projectsByLanguage: Record<string, LanguageProject[]>
}

/**
 * Renders the languages section: a distribution bar and a tag per language linked to its projects and experiences.
 *
 * @param props - Language statistics and projects by language.
 * @returns The languages section, or an error message when no data is available.
 */
export function LanguagesSection({
  languages,
  otherLanguagesPercent,
  projectsByLanguage
}: LanguagesSectionProps) {
  const { t } = useLanguage()
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null)

  const hasLanguages = languages.length > 0 || otherLanguagesPercent > 0

  /**
   * Highlights a language while hovered, only clearing the highlight if it is still this language's.
   *
   * @param name - Language name or the "other" key.
   * @param hovering - Whether the language tag is hovered.
   */
  function handleHoverChange(name: string, hovering: boolean): void {
    setHoveredLanguage((current) => {
      if (hovering) return name
      return current === name ? null : current
    })
  }

  return (
    <Section
      title={t("skills.languages.title")}
      subtitle={t("skills.languages.subtitle")}>
      {hasLanguages ? (
        <div className="flex flex-col gap-3">
          <LanguageBar
            languages={languages}
            otherPercent={otherLanguagesPercent}
            otherLabel={t("skills.languages.other")}
            highlightedName={hoveredLanguage}
            animate
          />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {languages.map((language) => (
              <HoverRelated
                key={language.name}
                projects={projectsByLanguage[language.name] ?? []}
                experiences={experiencesByLanguage[language.name] ?? []}
                onHoverChange={(hovering) =>
                  handleHoverChange(language.name, hovering)
                }>
                <LanguageTag
                  name={language.name}
                  color={language.color}
                  percent={language.percent}
                  highlighted={hoveredLanguage === language.name}
                />
              </HoverRelated>
            ))}
            {otherLanguagesPercent > 0 && (
              <HoverRelated
                projects={[]}
                experiences={[]}
                onHoverChange={(hovering) =>
                  handleHoverChange(otherLanguageKey, hovering)
                }>
                <LanguageTag
                  name={t("skills.languages.other")}
                  color={otherLanguageColor}
                  percent={otherLanguagesPercent}
                  highlighted={hoveredLanguage === otherLanguageKey}
                />
              </HoverRelated>
            )}
          </div>
        </div>
      ) : (
        <p className="text-xs text-muted whitespace-pre-line font-light">
          {t("skills.loadError")}
        </p>
      )}
    </Section>
  )
}
