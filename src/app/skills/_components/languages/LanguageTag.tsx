import { useCountUp } from "@/lib/hooks/useCountUp"

import type { CssVariablesStyle } from "@/lib/utils/style"

const percentAnimationDurationMs = 600

export interface LanguageTagProps {
  name: string
  color: string
  percent: number
  highlighted: boolean
}

/**
 * Displays a focusable language tag with its color and a percentage counting up on mount.
 *
 * @param props - Language name, color, percentage and highlight state.
 * @returns The language tag.
 */
export function LanguageTag({
  name,
  color,
  percent,
  highlighted
}: LanguageTagProps) {
  const animatedPercent = useCountUp(percent, true, percentAnimationDurationMs)
  const style: CssVariablesStyle = {
    "--tag-color": color,
    "borderColor": highlighted ? color : undefined
  }

  return (
    <div
      tabIndex={0}
      className="flex items-center gap-2 border-2 border-border px-3 py-1.5 transition-colors cursor-default focus:outline-none focus:border-[var(--tag-color)]"
      style={style}>
      <span
        className="h-2 w-2 shrink-0"
        style={{ backgroundColor: color }}
      />
      <span className="flex-1 truncate text-xs">{name}</span>
      <span className="text-2xs text-muted">{animatedPercent.toFixed(1)}%</span>
    </div>
  )
}
