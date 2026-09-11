"use client"

import { useState } from "react"

import { LanguageBar } from "@/components/chart/LanguageBar"

import { useLanguage } from "@/lib/hooks/useLanguage"

import {
  otherLanguageColor,
  otherLanguageKey
} from "@/constants/github/languages"

import { HoverProjects } from "../HoverProjects"
import { SkillsSection } from "../SkillsSection"
import { LanguageTag } from "./LanguageTag"

import type { LanguageStat, LanguageProject } from "../../_lib/getSkills"

export interface LanguagesSectionProps {
  languages: LanguageStat[]
  otherLanguagesPercent: number
  projectsByLanguage: Record<string, LanguageProject[]>
}
export function LanguagesSection({
  languages,
  otherLanguagesPercent,
  projectsByLanguage
}: LanguagesSectionProps) {
  const { t } = useLanguage()
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null)

  const hasLanguages = languages.length > 0 || otherLanguagesPercent > 0

  return (
    <SkillsSection
      title={t("skills.languages.title")}
      subtitle={t("skills.languages.subtitle")}>
      {hasLanguages ? (
        <div className="flex flex-col gap-3">
          <LanguageBar
            languages={languages}
            otherPercent={otherLanguagesPercent}
            otherLabel={t("skills.languages.other")}
            highlightedName={hoveredLanguage}
          />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {languages.map((language) => (
              <HoverProjects
                key={language.name}
                className="block"
                projects={projectsByLanguage[language.name] ?? []}
                onHoverChange={(hovering) =>
                  setHoveredLanguage(hovering ? language.name : null)
                }>
                <LanguageTag
                  name={language.name}
                  color={language.color}
                  percent={language.percent}
                  highlighted={hoveredLanguage === language.name}
                />
              </HoverProjects>
            ))}
            {otherLanguagesPercent > 0 && (
              <HoverProjects
                className="block"
                projects={[]}
                onHoverChange={(hovering) =>
                  setHoveredLanguage(hovering ? otherLanguageKey : null)
                }>
                <LanguageTag
                  name={t("skills.languages.other")}
                  color={otherLanguageColor}
                  percent={otherLanguagesPercent}
                  highlighted={hoveredLanguage === otherLanguageKey}
                />
              </HoverProjects>
            )}
          </div>
        </div>
      ) : (
        <p className="text-xs text-muted whitespace-pre-line font-light">
          {t("skills.loadError")}
        </p>
      )}
    </SkillsSection>
  )
}
