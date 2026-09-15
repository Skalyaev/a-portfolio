import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/tag/Button"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { cn } from "@/lib/utils/style"
import { useClickOutside } from "@/lib/hooks/useClickOutside"

import { labelClassName } from "@/constants/style"

import type { FocusEvent, ReactNode } from "react"
import type { Experience } from "@/constants/experience/experiences"
import type { LanguageProject } from "../_lib/getSkills"

const edgeMargin = 16
const sideMinSpace = 212
const verticalMinSpace = 160
const itemClassName =
  "flex shrink-0 flex-col px-2 py-1 hover:bg-accent group transition-colors items-start gap-0"
const sectionLabelClassName = cn(labelClassName, "px-1 pb-1")

export interface HoverRelatedProps {
  projects: LanguageProject[]
  experiences: Experience[]
  placement?: "bottom" | "side"
  children: ReactNode
  onHoverChange?: (hovering: boolean) => void
}

/**
 * Wraps content with a popover listing related projects and experiences, opened on hover, focus or click.
 *
 * The popover opens on the side with the most room, downward unless the viewport lacks room below
 * and has more above, and is height-capped to the viewport.
 *
 * @param props - Projects, experiences, trigger content, placement and hover handler.
 * @returns The trigger with its popover.
 */
export function HoverRelated({
  projects,
  experiences,
  placement = "bottom",
  children,
  onHoverChange
}: HoverRelatedProps) {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)
  const [fromLeft, setFromLeft] = useState(true)
  const [opensDown, setOpensDown] = useState(true)
  const [effectivePlacement, setEffectivePlacement] = useState(placement)
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined)
  const ref = useRef<HTMLDivElement>(null)

  const hasProjects = projects.length > 0
  const hasExperiences = experiences.length > 0
  const hasRelated = hasProjects || hasExperiences

  useEffect(() => {
    if (!visible) return
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [visible])

  /** Picks the popover side, placement, direction and max height from the trigger position in the viewport. */
  function computePosition(): void {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    const spaceLeft = rect.left
    const spaceRight = window.innerWidth - rect.right
    setFromLeft(spaceRight >= spaceLeft)

    const canFitSide =
      placement === "side" && Math.max(spaceLeft, spaceRight) >= sideMinSpace
    const nextPlacement = canFitSide ? "side" : "bottom"
    setEffectivePlacement(nextPlacement)

    const isSide = nextPlacement === "side"
    const spaceBelow =
      window.innerHeight - (isSide ? rect.top : rect.bottom) - edgeMargin
    const spaceAbove = (isSide ? rect.bottom : rect.top) - edgeMargin
    const nextOpensDown =
      spaceBelow >= verticalMinSpace || spaceBelow >= spaceAbove
    setOpensDown(nextOpensDown)
    setMaxHeight(Math.max(nextOpensDown ? spaceBelow : spaceAbove, 0))
  }

  /** Notifies the hover start and opens the popover when there is related content. */
  function handleEnter(): void {
    onHoverChange?.(true)
    if (!hasRelated) return
    computePosition()
    setVisible(true)
  }

  /** Notifies the hover end and closes the popover. */
  function handleLeave(): void {
    onHoverChange?.(false)
    setVisible(false)
    setEntered(false)
  }

  /**
   * Closes the popover when focus leaves the trigger and its popover.
   *
   * @param event - Blur event of the wrapper.
   */
  function handleBlur(event: FocusEvent<HTMLDivElement>): void {
    if (
      event.relatedTarget instanceof Node &&
      event.currentTarget.contains(event.relatedTarget)
    )
      return
    handleLeave()
  }

  /** Opens the popover on click, for touch devices without hover. */
  function handleClick(): void {
    if (!hasRelated) return
    onHoverChange?.(true)
    computePosition()
    setVisible(true)
  }

  useClickOutside(ref, handleLeave, visible)

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleBlur}
      onClick={handleClick}>
      {children}
      {visible && hasRelated && (
        <div
          className={cn(
            "absolute z-20",
            effectivePlacement === "side"
              ? cn(
                  opensDown ? "top-0" : "bottom-0",
                  fromLeft ? "left-full pl-1" : "right-full pr-1"
                )
              : cn(
                  opensDown ? "top-full pt-1" : "bottom-full pb-1",
                  fromLeft ? "left-0" : "right-0"
                )
          )}>
          <div
            style={{ maxHeight }}
            className={cn(
              "flex w-max min-w-48 max-w-64 flex-col overflow-y-auto border-2 border-border bg-background p-2 shadow-xs transition-[opacity,translate] duration-200",
              entered
                ? "translate-x-0 opacity-100 ease-out"
                : cn(
                    "opacity-0 ease-in",
                    fromLeft ? "translate-x-2" : "-translate-x-2"
                  )
            )}>
            {hasProjects && (
              <>
                <span className={sectionLabelClassName}>
                  {t("skills.relatedProject")}
                </span>
                {projects.map((project) => (
                  <Button
                    key={project.htmlUrl}
                    href={project.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={itemClassName}>
                    <span className="text-xs font-medium text-foreground">
                      {project.name}
                    </span>
                    <span className="text-2xs text-muted group-hover:text-foreground font-normal">
                      {t(project.descriptionKey)}
                    </span>
                  </Button>
                ))}
              </>
            )}
            {hasExperiences && (
              <>
                <span
                  className={cn(
                    sectionLabelClassName,
                    hasProjects && "mt-2 border-t border-border pt-2"
                  )}>
                  {t("skills.relatedExperience")}
                </span>
                {experiences.map((experience) => (
                  <Button
                    key={experience.id}
                    href={`/experience#${experience.id}`}
                    className={itemClassName}>
                    <span className="text-xs font-medium text-foreground">
                      {experience.company}
                    </span>
                    <span className="text-2xs text-muted group-hover:text-foreground font-normal">
                      {t(`experience.items.${experience.id}.role`)}
                    </span>
                  </Button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
