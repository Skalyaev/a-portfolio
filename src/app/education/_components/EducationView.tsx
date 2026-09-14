"use client"

import { FlexCol } from "@/components/layout/FlexCol"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { DiplomaOverview } from "./DiplomaOverview"
import { CompetenciesSection } from "./CompetenciesSection"

/**
 * Renders the education page body: the diploma overview and its certified skills.
 *
 * @returns The education view.
 */
export function EducationView() {
  const { t } = useLanguage()

  return (
    <FlexCol
      title={t("education.title")}
      subtitle={t("education.subtitle")}>
      <DiplomaOverview />
      <CompetenciesSection />
    </FlexCol>
  )
}
