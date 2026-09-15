import { Button } from "@/components/tag/Button"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { formatFullDate } from "@/lib/utils/date"

import { diploma } from "@/constants/education/diploma"

const buttonClassName = "border-2 border-border text-xs"

/**
 * Displays the diploma header and its two reference links: France Compétences and the diploma
 * itself, the latter disabled with a tooltip giving the award date until it is issued.
 *
 * @returns The diploma overview.
 */
export function DiplomaOverview() {
  const { t, locale } = useLanguage()

  const levelLabel = `${t("education.diploma.levelName")} ${diploma.level}`
  const awardNote = `${t("education.awardNote")} ${formatFullDate(diploma.awardDate, locale)}.`
  const isAwarded = diploma.downloadUrl !== null

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h4>{t("education.diploma.name")}</h4>
          <span className="text-2xs text-muted">
            {diploma.certifierName} · {levelLabel} (
            {t("education.diploma.levelEquivalent")})
          </span>
        </div>
        <p className="text-xs text-muted leading-4.5">
          {t("education.diploma.objective")}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex flex-wrap gap-2">
          <Button
            href={diploma.franceCompetencesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClassName}>
            <span>{t("education.actions.franceCompetences")}</span>
          </Button>
          <Button
            href={diploma.downloadUrl ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!isAwarded}
            title={isAwarded ? undefined : awardNote}
            className={buttonClassName}>
            <span>{t("education.actions.download")}</span>
          </Button>
        </div>
        {!isAwarded && (
          <p className="text-2xs text-muted italic">{awardNote}</p>
        )}
      </div>
    </section>
  )
}
