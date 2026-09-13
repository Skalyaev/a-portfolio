"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils/style"

import {
  otherLanguageColor,
  otherLanguageKey
} from "@/constants/github/languages"

const dimmedOpacity = "opacity-20"
const fullOpacity = "opacity-100"

export interface LanguageBarSegment {
  name: string
  percent: number
  color: string
}

export interface LanguageBarProps {
  languages: LanguageBarSegment[]
  otherPercent?: number
  otherLabel?: string
  className?: string
  highlightedName?: string | null
  animate?: boolean
}

/**
 * Horizontal stacked bar showing the share of each language, with an optional "other" segment.
 *
 * @param props - Segments, optional "other" share, highlighted language and entry animation flag.
 * @returns The rendered language bar.
 */
export function LanguageBar({
  languages,
  otherPercent = 0,
  otherLabel,
  className,
  highlightedName,
  animate = false
}: LanguageBarProps) {
  const [entered, setEntered] = useState(!animate)

  useEffect(() => {
    if (!animate) return
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [animate])

  /**
   * Returns the opacity class of a segment depending on the highlighted language.
   *
   * @param name - Language name of the segment.
   * @returns Full opacity when nothing or this segment is highlighted, dimmed otherwise.
   */
  function opacityFor(name: string) {
    if (!highlightedName) return fullOpacity
    return name === highlightedName ? fullOpacity : dimmedOpacity
  }

  return (
    <div
      className={cn(
        "flex h-1.5 overflow-hidden bg-accent",
        animate
          ? cn(
              "transition-[width,opacity] duration-600 ease-out",
              entered ? "w-full opacity-100" : "w-0 opacity-0"
            )
          : "w-full",
        className
      )}>
      {languages.map((language) => (
        <span
          key={language.name}
          title={`${language.name} · ${language.percent.toFixed(1)}%`}
          className={cn(
            "transition-opacity duration-200",
            opacityFor(language.name)
          )}
          style={{
            width: `${language.percent}%`,
            backgroundColor: language.color
          }}
        />
      ))}
      {otherPercent > 0 && (
        <span
          title={
            otherLabel
              ? `${otherLabel} · ${otherPercent.toFixed(1)}%`
              : `${otherPercent.toFixed(1)}%`
          }
          className={cn(
            "transition-opacity duration-200",
            opacityFor(otherLanguageKey)
          )}
          style={{
            width: `${otherPercent}%`,
            backgroundColor: otherLanguageColor
          }}
        />
      )}
    </div>
  )
}
