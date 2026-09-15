import { useEffect, useLayoutEffect, useRef, useState } from "react"

import { useLanguage } from "@/components/i18n/LanguageContext"

import { useFrameReady } from "@/lib/hooks/useFrameReady"
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll"
import { useTransitionDelay } from "@/lib/hooks/useTransitionDelay"
import { cn, revealClassName, revealScaleClassName } from "@/lib/utils/style"

import { revealDurationMs } from "@/constants/animation"
import { labelClassName } from "@/constants/style"

import { ActivityRow } from "./ActivityRow"

import type { Activity } from "../_lib/activity"
import type { RefObject } from "react"

const pageSize = 8
const timelineStepMs = 120
const upcomingGroupKey = "upcoming"
const markerTransitionClassName = "transition-[scale,opacity] duration-400"
const textTransitionClassName = "transition-[opacity,translate] duration-400"

/**
 * Returns the timeline group of an activity.
 *
 * @param activity - Activity to group.
 * @returns The upcoming group key for future activities, the year of the activity otherwise.
 */
function getGroupKey(activity: Activity): string {
  return activity.upcoming ? upcomingGroupKey : activity.date.slice(0, 4)
}

/**
 * Returns the entrance delay of the activity at a position.
 *
 * The first page is traced from the bottom up, in step with the growing line; pages loaded later
 * while scrolling cascade from the top down.
 *
 * @param index - Position of the activity, 0 being the most recent.
 * @param firstPageCount - Number of activities on the first page.
 * @returns The entrance delay, in milliseconds.
 */
function getRevealDelayMs(index: number, firstPageCount: number): number {
  return index < firstPageCount
    ? (firstPageCount - 1 - index) * timelineStepMs
    : (index % pageSize) * timelineStepMs
}

interface TimelineItemProps {
  activity: Activity
  groupLabel: string | null
  isFirst: boolean
  entered: boolean
  delayMs: number
  skipAnimation: boolean
  markerRef?: RefObject<HTMLSpanElement | null>
}

/**
 * Displays an activity, preceded by its group marker when it opens a group.
 *
 * The item animates in once the timeline has entered and a frame has passed since it mounted, so
 * items loaded while scrolling animate too. The delay is dropped once the entrance is over, so
 * hover transitions stay immediate. Set `skipAnimation` to show it settled right away instead,
 * for items that only appear because the filters changed.
 *
 * @param props - Component props.
 * @param props.activity - Activity to display.
 * @param props.groupLabel - Label of the group this activity opens, `null` when it does not open one.
 * @param props.isFirst - Whether this is the first item of the list.
 * @param props.entered - Whether the timeline has entered the viewport.
 * @param props.delayMs - Entrance delay, in milliseconds.
 * @param props.skipAnimation - Whether to skip the entrance animation and show the settled state.
 * @param props.markerRef - Ref set on the marker, when it is the first one of the timeline.
 * @returns The timeline item.
 */
function TimelineItem({
  activity,
  groupLabel,
  isFirst,
  entered,
  delayMs,
  skipAnimation,
  markerRef
}: TimelineItemProps) {
  const frameReady = useFrameReady()
  const active = skipAnimation || (entered && frameReady)
  const transitionDelay = useTransitionDelay(active, delayMs, revealDurationMs)

  return (
    <li className="flex flex-col">
      {groupLabel && (
        <span
          className={cn(
            "grid grid-cols-[2rem_1fr] items-center gap-x-4 pb-1",
            !isFirst && "pt-5"
          )}>
          <span
            ref={markerRef}
            style={{ transitionDelay }}
            className={cn(
              "relative mx-auto size-2.5 bg-foreground",
              markerTransitionClassName,
              revealScaleClassName(active)
            )}
          />
          <span
            style={{ transitionDelay }}
            className={cn(
              labelClassName,
              textTransitionClassName,
              revealClassName(active, "right")
            )}>
            {groupLabel}
          </span>
        </span>
      )}
      <ActivityRow
        activity={activity}
        entered={active}
        transitionDelay={transitionDelay}
      />
    </li>
  )
}

export interface ActivityTimelineProps {
  activities: Activity[]
  entered: boolean
  skipAnimation?: boolean
}

/**
 * Displays activities on a vertical timeline, in a box scrolling on its own from `md` upward.
 *
 * Once entered, the line grows from the bottom up to the first (topmost) marker, without
 * overshooting past it, and each activity of the first page appears as the line reaches it. More
 * activities load as the list is scrolled near its end, once that first trace is over. Pass
 * `skipAnimation` while updating `activities` (e.g. from a filter change) to swap the list in
 * place with no entrance animation. Its own scroll position, not covered by the app's route-level
 * reset, is forced back to the top on mount and on `pageshow`, since some browsers restore it on
 * reload.
 *
 * @param props - Component props.
 * @param props.activities - Activities to display, most recent first.
 * @param props.entered - Whether the timeline has entered the viewport.
 * @param props.skipAnimation - Whether new items should appear settled instead of animating in.
 * @returns The activity timeline.
 */
export function ActivityTimeline({
  activities,
  entered,
  skipAnimation = false
}: ActivityTimelineProps) {
  const { t } = useLanguage()
  const [visibleCount, setVisibleCount] = useState(pageSize * 2)
  const [traced, setTraced] = useState(false)
  const [lineTopPx, setLineTopPx] = useState(0)
  const frameReady = useFrameReady()
  const scrollRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const firstMarkerRef = useRef<HTMLSpanElement>(null)

  const lineActive = entered && frameReady
  const firstPageCount = Math.min(pageSize, activities.length)
  const lineDurationMs =
    Math.max(firstPageCount - 1, 0) * timelineStepMs + revealDurationMs
  const visibleActivities = activities.slice(0, visibleCount)
  const hasMore = traced && visibleCount < activities.length
  const groupStartFlags = visibleActivities.map(
    (activity, index) =>
      index === 0 ||
      getGroupKey(visibleActivities[index - 1]) !== getGroupKey(activity)
  )

  const { ref: loadMoreRef } = useInfiniteScroll<HTMLDivElement>({
    hasMore,
    itemCount: visibleCount,
    onLoadMore: () => setVisibleCount((count) => count + pageSize)
  })

  useEffect(() => {
    if (!lineActive) return
    const timeout = setTimeout(() => setTraced(true), lineDurationMs)
    return () => clearTimeout(timeout)
  }, [lineActive, lineDurationMs])

  useEffect(() => {
    const resetScroll = () => scrollRef.current?.scrollTo({ top: 0 })

    resetScroll()
    window.addEventListener("pageshow", resetScroll)
    return () => window.removeEventListener("pageshow", resetScroll)
  }, [])

  useLayoutEffect(() => {
    const timeline = timelineRef.current
    const marker = firstMarkerRef.current
    if (!timeline || !marker) return

    const measure = () => {
      const timelineRect = timeline.getBoundingClientRect()
      const markerRect = marker.getBoundingClientRect()
      const markerCenterY =
        markerRect.top + markerRect.height / 2 - timelineRect.top
      setLineTopPx(Math.max(markerCenterY, 0))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(timeline)
    return () => observer.disconnect()
  }, [activities, visibleCount])

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-px origin-center bg-border transition-[scale] duration-600 ease-linear",
          lineActive ? "scale-x-100" : "scale-x-0"
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-px origin-center bg-border transition-[scale] duration-400 ease-linear",
          lineActive ? "scale-x-100" : "scale-x-0"
        )}
      />
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 pt-3 sm:overflow-y-auto sm:pr-4 sm:[scrollbar-gutter:stable] sm:[scrollbar-width:thin]"
        tabIndex={-1}>
        <div
          ref={timelineRef}
          className="relative">
          <span
            aria-hidden="true"
            style={{
              transitionDuration: `${lineDurationMs}ms`,
              top: lineTopPx
            }}
            className={cn(
              "absolute bottom-0 left-4 w-0.5 origin-bottom -translate-x-1/2 bg-border transition-[scale] ease-linear",
              lineActive ? "scale-y-100" : "scale-y-0"
            )}
          />
          <ol className="flex flex-col">
            {visibleActivities.map((activity, index) => {
              const groupKey = getGroupKey(activity)
              const isGroupStart = groupStartFlags[index]
              const groupLabel = !isGroupStart
                ? null
                : groupKey === upcomingGroupKey
                  ? t("home.activity.upcoming")
                  : groupKey
              return (
                <TimelineItem
                  key={activity.id}
                  activity={activity}
                  groupLabel={groupLabel}
                  isFirst={index === 0}
                  entered={entered}
                  delayMs={getRevealDelayMs(index, firstPageCount)}
                  skipAnimation={skipAnimation}
                  markerRef={index === 0 ? firstMarkerRef : undefined}
                />
              )
            })}
          </ol>
          {hasMore && (
            <div
              ref={loadMoreRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-96"
            />
          )}
        </div>
      </div>
    </div>
  )
}
