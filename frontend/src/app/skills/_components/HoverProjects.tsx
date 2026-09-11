"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils/style"
import { useClickOutside } from "@/lib/hooks/useClickOutside"
import { useLanguage } from "@/lib/hooks/useLanguage"

import type { ReactNode } from "react"
import type { LanguageProject } from "../_lib/getSkills"

const edgeMargin = 16
const sideMinSpace = 212

export interface HoverProjectsProps {
  projects: LanguageProject[]
  label?: string
  className?: string
  placement?: "bottom" | "side"
  children: ReactNode
  onHoverChange?: (hovering: boolean) => void
}
export function HoverProjects({
  projects,
  label,
  className,
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
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!visible) return
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [visible])

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
  function handleEnter() {
    onHoverChange?.(true)
    if (projects.length === 0) return
    computePosition()
    setVisible(true)
  }
  function handleLeave() {
    onHoverChange?.(false)
    setVisible(false)
    setEntered(false)
  }
  function handleClick() {
    if (projects.length === 0) return
    if (visible) {
      handleLeave()
      return
    }
    onHoverChange?.(true)
    computePosition()
    setVisible(true)
  }

  useClickOutside(ref, handleLeave, visible)

  return (
    <span
      ref={ref}
      className={cn("relative", className)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}>
      {children}
      {visible && projects.length > 0 && (
        <span
          className={cn(
            "absolute z-20",
            effectivePlacement === "side"
              ? cn("top-0", fromLeft ? "left-full pl-1" : "right-full pr-1")
              : cn("top-full pt-1", fromLeft ? "left-0" : "right-0")
          )}>
          <span
            style={{ maxHeight }}
            className={cn(
              "flex w-max min-w-48 max-w-72 flex-col overflow-y-auto border-2 border-border bg-background p-2 shadow-xs transition-[opacity,translate] duration-200",
              entered
                ? "translate-x-0 opacity-100 ease-out"
                : cn(
                    "opacity-0 ease-in",
                    fromLeft ? "translate-x-2" : "-translate-x-2"
                  )
            )}>
            <span className="px-1 pb-1 text-2xs text-muted uppercase tracking-wide">
              {label ?? t("skills.relatedProject")}
            </span>
            {projects.map((project) => (
              <a
                key={project.htmlUrl}
                href={project.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col px-2 py-1 hover:bg-accent group transition-colors">
                <span className="text-xs font-medium text-foreground">
                  {project.name}
                </span>
                {project.descriptionKey && (
                  <span className="text-2xs text-muted group-hover:text-foreground">
                    {t(project.descriptionKey)}
                  </span>
                )}
              </a>
            ))}
          </span>
        </span>
      )}
    </span>
  )
}
