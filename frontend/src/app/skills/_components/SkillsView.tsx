"use client"

import { FlexCol } from "@/components/layout/FlexCol"

import { useLanguage } from "@/lib/hooks/useLanguage"

import { LanguagesSection } from "./languages/LanguagesSection"
import { ToolsSection } from "./tools/ToolsSection"
import { CyberSecuritySection } from "./cybersecurity/CyberSecuritySection"

import type { LanguageStat, LanguageProject } from "../_lib/getSkills"
import type { CyberSecurityData } from "../_lib/getCyberSecurity"

export interface SkillsViewProps {
  languages: LanguageStat[]
  otherLanguagesPercent: number
  projectsByLanguage: Record<string, LanguageProject[]>
  cyberSecurity: CyberSecurityData
}
export function SkillsView({
  languages,
  otherLanguagesPercent,
  projectsByLanguage,
  cyberSecurity
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
      <CyberSecuritySection cyberSecurity={cyberSecurity} />
    </FlexCol>
  )
}
