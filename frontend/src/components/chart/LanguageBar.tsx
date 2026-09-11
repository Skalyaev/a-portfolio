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
}
export function LanguageBar({
  languages,
  otherPercent = 0,
  otherLabel,
  className,
  highlightedName
}: LanguageBarProps) {
  function opacityFor(name: string) {
    if (!highlightedName) return fullOpacity
    return name === highlightedName ? fullOpacity : dimmedOpacity
  }

  return (
    <div
      className={cn("flex h-1.5 w-full overflow-hidden bg-accent", className)}>
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
