import { Button } from "@/components/tag/Button"
import { AcademicCap } from "@/components/svg/AcademicCap"
import { Briefcase } from "@/components/svg/Briefcase"
import { Code } from "@/components/svg/Code"
import { HackTheBox } from "@/components/svg/HackTheBox"
import { RootMe } from "@/components/svg/RootMe"
import { useLanguage } from "@/components/i18n/LanguageContext"

import {
  formatFullDate,
  formatMonthCount,
  formatMonthYear,
  monthsBetween
} from "@/lib/utils/date"
import { cn, revealClassName, revealScaleClassName } from "@/lib/utils/style"

import { diploma } from "@/constants/education/diploma"
import { projectDescriptionsKey } from "@/constants/github/projects"
import { hackTheBoxAcademy, hackTheBoxLab } from "@/constants/skills/hackthebox"
import { rootMeProfile } from "@/constants/skills/rootme"
import { labelClassName } from "@/constants/style"

import type { Activity, CyberPlatform } from "../_lib/activity"
import type { IconComponent } from "@/constants/icons"
import type { PlatformProfile } from "@/constants/skills/profile"

const maxListedNames = 3
const markerTransitionClassName =
  "transition-[border-color,color,scale,opacity] duration-[200ms,200ms,400ms,400ms]"
const textTransitionClassName = "transition-[opacity,translate] duration-400"

interface CyberPlatformDisplay {
  profile: PlatformProfile
  Icon: IconComponent
}

const cyberPlatforms: Record<CyberPlatform, CyberPlatformDisplay> = {
  hackTheBoxLab: { profile: hackTheBoxLab, Icon: HackTheBox },
  hackTheBoxAcademy: { profile: hackTheBoxAcademy, Icon: HackTheBox },
  rootMe: { profile: rootMeProfile, Icon: RootMe }
}

interface ActivityText {
  label: string
  title: string
  detail: string | null
  Icon: IconComponent
}

/**
 * Lists the first names and counts the others, e.g. `"libft, pipex, cub3d +4"`.
 *
 * @param names - Names to list.
 * @returns The shortened list.
 */
function formatNames(names: string[]): string {
  const listed = names.slice(0, maxListedNames).join(", ")
  const hiddenCount = names.length - maxListedNames
  return hiddenCount > 0 ? `${listed} +${hiddenCount}` : listed
}

/**
 * Labels a group of items: the singular label for one item, the count and plural label otherwise.
 *
 * @param t - Translation function.
 * @param count - Number of items.
 * @param singularKey - Translation key of the label for one item.
 * @param pluralKey - Translation key of the label following the count.
 * @returns The label, e.g. `"New project"` or `"3 new projects"`.
 */
function formatCountLabel(
  t: (key: string) => string,
  count: number,
  singularKey: string,
  pluralKey: string
): string {
  return count === 1 ? t(singularKey) : `${count} ${t(pluralKey)}`
}

/**
 * Builds the localized texts and icon of an activity.
 *
 * @param activity - Activity to describe.
 * @param t - Translation function.
 * @param locale - Locale used to format durations.
 * @returns The kind label, title, optional detail and icon.
 */
function getActivityText(
  activity: Activity,
  t: (key: string) => string,
  locale: string
): ActivityText {
  switch (activity.kind) {
    case "projectCreated":
      return {
        label: formatCountLabel(
          t,
          activity.names.length,
          "home.activity.kinds.projectCreated",
          "home.activity.kinds.projectsCreated"
        ),
        title: formatNames(activity.names),
        detail:
          activity.names.length === 1
            ? t(`${projectDescriptionsKey}.${activity.names[0]}`)
            : null,
        Icon: Code
      }
    case "experienceStarted":
    case "experienceEnded": {
      const { experience } = activity
      const role = t(`experience.items.${experience.id}.role`)
      const isStart = activity.kind === "experienceStarted"
      const months = monthsBetween(experience.startDate, experience.endDate)
      return {
        label: t(`home.activity.kinds.${activity.kind}`),
        title: experience.company,
        detail: isStart
          ? `${role} · ${t(`experience.contracts.${experience.contract}`)}`
          : `${role} · ${formatMonthCount(months, locale)}`,
        Icon: Briefcase
      }
    }
    case "diplomaAwarded":
      return {
        label: t("home.activity.kinds.diplomaAwarded"),
        title: t("education.diploma.name"),
        detail: `${diploma.certifierName} · ${t("education.diploma.levelName")} ${diploma.level} (${t("education.diploma.levelEquivalent")})`,
        Icon: AcademicCap
      }
    case "challengeSolved":
    case "moduleCompleted": {
      const { profile, Icon } = cyberPlatforms[activity.platform]
      const isChallenge = activity.kind === "challengeSolved"
      return {
        label: formatCountLabel(
          t,
          activity.names.length,
          isChallenge
            ? "home.activity.kinds.challengeSolved"
            : "home.activity.kinds.moduleCompleted",
          isChallenge
            ? "home.activity.kinds.challengesSolved"
            : "home.activity.kinds.modulesCompleted"
        ),
        title: formatNames(activity.names),
        detail: profile.name,
        Icon
      }
    }
  }
}

export interface ActivityRowProps {
  activity: Activity
  entered: boolean
  transitionDelay: string
}

/**
 * Displays an activity on the timeline: a marker with its icon, then its kind, date, title and
 * detail, the whole row linking to the related page.
 *
 * The marker pops in from its center, the date slides in from the left, and the rest of the text
 * slides in from the right, all on the same delay so they appear together as the timeline line
 * reaches this row. Upcoming activities get a dashed marker.
 *
 * @param props - Component props.
 * @param props.activity - Activity to display.
 * @param props.entered - Whether the row has entered.
 * @param props.transitionDelay - Entrance transition delay to apply to every animated part.
 * @returns The activity row.
 */
export function ActivityRow({
  activity,
  entered,
  transitionDelay
}: ActivityRowProps) {
  const { t, locale } = useLanguage()

  const { label, title, detail, Icon } = getActivityText(activity, t, locale)
  const date =
    activity.datePrecision === "day"
      ? formatFullDate(activity.date, locale)
      : formatMonthYear(activity.date, locale)

  return (
    <Button
      href={activity.href}
      target={activity.external ? "_blank" : undefined}
      rel={activity.external ? "noopener noreferrer" : undefined}
      className="group grid w-full select-text grid-cols-[2rem_1fr] items-start gap-x-4 bg-transparent px-0 py-2.5 text-left font-normal hover:bg-transparent focus-visible:bg-transparent">
      <span
        style={{ transitionDelay }}
        className={cn(
          "flex size-8 items-center justify-center border-2 bg-background text-muted group-hover:border-foreground group-hover:text-foreground group-focus-visible:border-foreground group-focus-visible:text-foreground",
          markerTransitionClassName,
          activity.upcoming ? "border-dashed border-muted" : "border-border",
          revealScaleClassName(entered)
        )}>
        <Icon
          width={14}
          height={14}
        />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="flex flex-wrap items-baseline justify-between gap-x-3">
          <span
            style={{ transitionDelay }}
            className={cn(
              labelClassName,
              textTransitionClassName,
              revealClassName(entered, "left")
            )}>
            {label}
          </span>
          <span
            style={{ transitionDelay }}
            className={cn(
              "shrink-0 text-2xs font-light text-muted",
              textTransitionClassName,
              revealClassName(entered, "right")
            )}>
            {date}
          </span>
        </span>
        <span
          style={{ transitionDelay }}
          className={cn(
            "text-sm font-medium text-foreground group-hover:underline group-focus-visible:underline",
            textTransitionClassName,
            revealClassName(entered, "left")
          )}>
          {title}
        </span>
        {detail && (
          <span
            style={{ transitionDelay }}
            className={cn(
              "text-xs text-muted",
              textTransitionClassName,
              revealClassName(entered, "left")
            )}>
            {detail}
          </span>
        )}
      </span>
    </Button>
  )
}
