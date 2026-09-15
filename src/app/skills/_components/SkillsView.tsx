"use client"

import { FlexCol } from "@/components/layout/FlexCol"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { LanguagesSection } from "./languages/LanguagesSection"
import { ToolsSection } from "./tools/ToolsSection"
import { CyberSecuritySection } from "./cybersecurity/CyberSecuritySection"

import type { LanguageShare } from "@/constants/github/languages"
import type { LanguageProject } from "../_lib/getSkills"

export interface SkillsViewProps {
  languages: LanguageShare[]
  otherLanguagesPercent: number
  projectsByLanguage: Record<string, LanguageProject[]>
}

/**
 * Renders the skills page body: languages, tools and cybersecurity sections.
 *
 * @param props - Language statistics and projects by language.
 * @returns The skills view.
 */
export function SkillsView({
  languages,
  otherLanguagesPercent,
  projectsByLanguage
}: SkillsViewProps) {
  const { t } = useLanguage()

  return (
    <FlexCol
      title={t("skills.title")}
      subtitle={t("skills.subtitle")}>
      <LanguagesSection
        languages={languages}
        otherLanguagesPercent={otherLanguagesPercent}
        projectsByLanguage={projectsByLanguage}
      />
      <ToolsSection />
      <CyberSecuritySection />
    </FlexCol>
  )
}
