"use client"

import { FlexCol } from "@/components/layout/FlexCol"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { revealCascadeStepMs } from "@/constants/animation"
import { experiences } from "@/constants/experience/experiences"

import { ExperienceCard } from "./ExperienceCard"

/**
 * Renders the experience page body: one card per professional experience, most recent first.
 *
 * @returns The experience view.
 */
export function ExperienceView() {
  const { t } = useLanguage()

  return (
    <FlexCol
      title={t("experience.title")}
      subtitle={t("experience.subtitle")}>
      <ol className="flex flex-col pb-6 md:pb-10">
        {experiences.map((experience, index) => (
          <li
            key={experience.id}
            className="pt-4 first:pt-0">
            <ExperienceCard
              experience={experience}
              delayMs={index * revealCascadeStepMs}
              isLast={index === experiences.length - 1}
            />
          </li>
        ))}
      </ol>
    </FlexCol>
  )
}
