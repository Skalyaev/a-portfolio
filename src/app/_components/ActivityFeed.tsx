import { useMemo, useState } from "react"

import { Section } from "@/components/layout/Section"
import { Button } from "@/components/tag/Button"
import { Briefcase } from "@/components/svg/Briefcase"
import { Code } from "@/components/svg/Code"
import { Shield } from "@/components/svg/Shield"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { useInView } from "@/lib/hooks/useInView"
import { useToggleList } from "@/lib/hooks/useToggleList"
import { cn, revealClassName } from "@/lib/utils/style"

import { revealRootMargin } from "@/constants/animation"

import {
  activityFilters,
  buildActivities,
  getActivityFilter
} from "../_lib/activity"
import { ActivityTimeline } from "./ActivityTimeline"

import type { Activity, ActivityFilter } from "../_lib/activity"
import type { ProjectCreation } from "../_lib/getProjectCreations"
import type { IconComponent } from "@/constants/icons"

const headerTransitionClassName = "transition-[opacity,translate] duration-400"

const filterIcons: Record<ActivityFilter, IconComponent> = {
  projects: Code,
  career: Briefcase,
  cybersecurity: Shield
}

export interface ActivityFeedProps {
  projects: ProjectCreation[]
}

/**
 * Displays the recent activity: a header with category filters above the activity timeline.
 *
 * The header and filters slide down as soon as the section enters the viewport, while the
 * timeline starts tracing. Changing the filters updates the timeline's list in place, with no
 * entrance animation.
 *
 * @param props - Component props.
 * @param props.projects - Projects with their creation timestamp.
 * @returns The activity feed section.
 */
export function ActivityFeed({ projects }: ActivityFeedProps) {
  const { t } = useLanguage()
  const { items: selectedFilters, toggle: toggleFilter } =
    useToggleList<ActivityFilter>()
  const { ref, inView: entered } = useInView<HTMLDivElement>({
    rootMargin: revealRootMargin
  })
  const [skipTimelineAnimation, setSkipTimelineAnimation] = useState(false)

  const activities = useMemo<Activity[]>(
    () => buildActivities(projects),
    [projects]
  )
  const filteredActivities = useMemo<Activity[]>(
    () =>
      selectedFilters.length === 0
        ? activities
        : activities.filter((activity) =>
            selectedFilters.includes(getActivityFilter(activity))
          ),
    [activities, selectedFilters]
  )
  const headerRevealClassName = cn(
    headerTransitionClassName,
    revealClassName(entered, "down")
  )

  return (
    <div
      ref={ref}
      className="flex min-h-0 flex-1 flex-col">
      <Section
        className="min-h-0 flex-1"
        title={t("home.activity.title")}
        subtitle={t("home.activity.subtitle")}
        headerClassName={headerRevealClassName}>
        <div
          className={cn(
            "flex flex-wrap items-center gap-2",
            headerRevealClassName
          )}>
          {activityFilters.map((filter) => {
            const isSelected = selectedFilters.includes(filter)
            const Icon = filterIcons[filter]
            return (
              <Button
                key={filter}
                onClick={() => {
                  setSkipTimelineAnimation(true)
                  toggleFilter(filter)
                  setTimeout(() => setSkipTimelineAnimation(false), 0)
                }}
                selected={isSelected}
                ariaPressed={isSelected}
                className={cn(
                  "border-2 border-border py-1.5 shadow-xs",
                  !isSelected &&
                    "hover:border-foreground hover:bg-background focus-visible:border-foreground focus-visible:bg-background"
                )}>
                <Icon
                  width={16}
                  height={16}
                  fill={isSelected}
                />
                <span className="text-xs">
                  {t(`home.activity.filters.${filter}`)}
                </span>
              </Button>
            )
          })}
        </div>

        {filteredActivities.length === 0 ? (
          <p className="text-xs font-light text-muted">
            {t("home.activity.empty")}
          </p>
        ) : (
          <ActivityTimeline
            activities={filteredActivities}
            entered={entered}
            skipAnimation={skipTimelineAnimation}
          />
        )}
      </Section>
    </div>
  )
}
