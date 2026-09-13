import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/tag/Button"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { cn } from "@/lib/utils/style"
import { useClickOutside } from "@/lib/hooks/useClickOutside"

import type { FocusEvent, ReactNode } from "react"
import type { LanguageProject } from "../_lib/getSkills"

const edgeMargin = 16
const sideMinSpace = 212

export interface HoverProjectsProps {
  projects: LanguageProject[]
  placement?: "bottom" | "side"
  children: ReactNode
  onHoverChange?: (hovering: boolean) => void
}

/**
 * Wraps content with a popover listing related projects, opened on hover, focus or click.
 *
 * The popover opens on the side with the most room and is height-capped to the viewport.
 *
 * @param props - Projects, trigger content, placement and hover handler.
 * @returns The trigger with its popover.
 */
export function HoverProjects({
  projects,
  placement = "bottom",
  children,
  onHoverChange
}: HoverProjectsProps) {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)
  const [fromLeft, setFromLeft] = useState(true)
  const [effectivePlacement, setEffectivePlacement] = useState(placement)
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visible) return
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [visible])

  /** Picks the popover side, placement and max height from the trigger position in the viewport. */
  function computePosition() {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    const spaceLeft = rect.left
    const spaceRight = window.innerWidth - rect.right
    setFromLeft(spaceRight >= spaceLeft)

    const canFitSide =
      placement === "side" && Math.max(spaceLeft, spaceRight) >= sideMinSpace
    const nextPlacement = canFitSide ? "side" : "bottom"
    setEffectivePlacement(nextPlacement)

    const anchorBottom = nextPlacement === "side" ? rect.top : rect.bottom
    setMaxHeight(Math.max(window.innerHeight - anchorBottom - edgeMargin, 0))
  }

  /** Notifies the hover start and opens the popover when there are projects. */
  function handleEnter() {
    onHoverChange?.(true)
    if (projects.length === 0) return
    computePosition()
    setVisible(true)
  }

  /** Notifies the hover end and closes the popover. */
  function handleLeave() {
    onHoverChange?.(false)
    setVisible(false)
    setEntered(false)
  }

  /**
   * Closes the popover when focus leaves the trigger and its popover.
   *
   * @param event - Blur event of the wrapper.
   */
  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return
    }
    handleLeave()
  }

  /** Opens the popover on click, for touch devices without hover. */
  function handleClick() {
    if (projects.length === 0) return
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
      {visible && projects.length > 0 && (
        <div
          className={cn(
            "absolute z-20",
            effectivePlacement === "side"
              ? cn("top-0", fromLeft ? "left-full pl-1" : "right-full pr-1")
              : cn("top-full pt-1", fromLeft ? "left-0" : "right-0")
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
            <span className="px-1 pb-1 text-2xs text-muted uppercase tracking-wide">
              {t("skills.relatedProject")}
            </span>
            {projects.map((project) => (
              <Button
                key={project.htmlUrl}
                href={project.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 flex-col px-2 py-1 hover:bg-accent group transition-colors items-start">
                <span className="text-xs font-medium text-foreground">
                  {project.name}
                </span>
                <span className="text-2xs text-muted group-hover:text-foreground">
                  {t(project.descriptionKey)}
                </span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
