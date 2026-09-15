import { Button } from "@/components/tag/Button"
import { useLanguage } from "@/components/i18n/LanguageContext"
import { Globe } from "@/components/svg/Globe"
import { LinkedIn } from "@/components/svg/LinkedIn"

import { useReveal } from "@/lib/hooks/useReveal"
import { cn, revealClassName } from "@/lib/utils/style"
import {
  formatMonthCount,
  formatMonthYear,
  monthsBetween
} from "@/lib/utils/date"

import { revealDurationMs, revealRootMargin } from "@/constants/animation"
import {
  languageIcons,
  technologyIcons
} from "@/constants/experience/experiences"
import { skillDescriptionKeys } from "@/constants/skills/tools"
import { labelClassName } from "@/constants/style"

import type { Experience } from "@/constants/experience/experiences"
import type { IconComponent } from "@/constants/icons"

const linkClassName = "px-3 py-2 text-2xs text-muted hover:text-foreground"

interface StackItem {
  key: string
  label: string
  Icon: IconComponent
}

interface StackGroupProps {
  title: string
  items: StackItem[]
}

/**
 * Displays a titled list of stack badges, each with its logo.
 *
 * @param props - Group title and badges.
 * @returns The stack group.
 */
function StackGroup({ title, items }: StackGroupProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className={labelClassName}>{title}</span>
      <ul className="flex flex-wrap gap-1.5">
        {items.map(({ key, label, Icon }) => (
          <li
            key={key}
            className="inline-flex items-center gap-1.5 bg-accent px-2 py-0.5 text-2xs text-muted">
            <Icon
              width={12}
              height={12}
              className="shrink-0"
            />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export interface ExperienceCardProps {
  experience: Experience
  delayMs: number
  isLast: boolean
}

/**
 * Displays an experience: company and its links, role, contract, highlights, languages and technologies.
 *
 * The card is anchored by the experience id, so `/experience#<id>` scrolls to it, and slides in the
 * first time it enters the viewport. Unless it is the last one, a bottom border separates it from
 * the next card; it fades in with the rest of the card since it lives on the same animated element.
 *
 * @param props - Component props.
 * @param props.experience - Experience to display.
 * @param props.delayMs - Entrance animation delay in milliseconds.
 * @param props.isLast - Whether this is the last card, hiding its separator.
 * @returns The experience card.
 */
export function ExperienceCard({
  experience,
  delayMs,
  isLast
}: ExperienceCardProps) {
  const { t, locale } = useLanguage()
  const { ref, entered, transitionDelay } = useReveal<HTMLElement>({
    enabled: true,
    delayMs,
    durationMs: revealDurationMs,
    rootMargin: revealRootMargin
  })

  const itemKey = `experience.items.${experience.id}`
  const contract = t(`experience.contracts.${experience.contract}`)
  const months = monthsBetween(experience.startDate, experience.endDate)
  const period = `${formatMonthYear(experience.startDate, locale)} - ${formatMonthYear(experience.endDate, locale)} (${formatMonthCount(months, locale)})`

  const languageItems: StackItem[] = experience.languages.map((language) => ({
    key: language,
    label: language,
    Icon: languageIcons[language]
  }))
  const technologyItems: StackItem[] = experience.technologies.map(
    (technology) => ({
      key: technology,
      label: t(`skills.tools.names.${skillDescriptionKeys[technology]}`),
      Icon: technologyIcons[technology]
    })
  )

  return (
    <article
      ref={ref}
      id={experience.id}
      className={cn(
        "flex scroll-mt-6 flex-col gap-2 transition-[opacity,translate] duration-400 md:scroll-mt-10",
        !isLast && "border-b border-border pb-6",
        revealClassName(entered)
      )}
      style={{ transitionDelay }}>
      <div className="flex flex-col gap-1">
        <header className="flex flex-wrap items-center justify-between gap-x-4">
          <h5>{experience.company}</h5>
          <div className="flex">
            {experience.websiteUrl && (
              <Button
                href={experience.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}>
                <Globe
                  width={14}
                  height={14}
                  className="shrink-0"
                />
                <span>{t("experience.website")}</span>
              </Button>
            )}
            {experience.linkedinUrl && (
              <Button
                href={experience.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}>
                <LinkedIn
                  width={14}
                  height={14}
                  className="shrink-0"
                />
                <span>LinkedIn</span>
              </Button>
            )}
          </div>
        </header>
        <p className="text-xs text-muted italic -mt-1">
          {t(`${itemKey}.about`)}
        </p>
        {experience.leaders.length > 0 && (
          <div className="flex flex-wrap gap-x-3 items-center">
            <span className={labelClassName}>{t("experience.leadership")}</span>
            <div className="flex flex-wrap">
              {experience.leaders.map((leader) => (
                <Button
                  key={leader.linkedinUrl}
                  href={leader.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className={cn("select-text shrink-0", linkClassName)}>
                  <span className="text-foreground">{leader.name}</span>
                  <span className="font-normal">
                    ·{" "}
                    {leader.roles
                      .map((role) => t(`experience.leaderRoles.${role}`))
                      .join(" & ")}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 -mt-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-sm font-semibold">{t(`${itemKey}.role`)}</span>
          <span className="text-xs text-muted font-light">{contract}</span>
        </div>
        <span className="shrink-0 text-2xs text-muted mr-2">{period}</span>
      </div>

      {experience.highlightKeys.length > 0 && (
        <p className="text-xs -mt-0.5">
          {t(`${itemKey}.highlights.${experience.highlightKeys[0]}`)}
        </p>
      )}
      {experience.highlightKeys.length > 1 && (
        <ul className="flex list-[square] list-inside flex-col gap-1 text-xs text-muted mx-4">
          {experience.highlightKeys.slice(1).map((key) => (
            <li key={key}>{t(`${itemKey}.highlights.${key}`)}</li>
          ))}
        </ul>
      )}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {languageItems.length > 0 && (
          <StackGroup
            title={t("experience.languages")}
            items={languageItems}
          />
        )}
        <StackGroup
          title={t("experience.technologies")}
          items={technologyItems}
        />
      </div>
    </article>
  )
}
