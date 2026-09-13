import { Button } from "@/components/tag/Button"

import { useCountUp } from "@/lib/hooks/useCountUp"
import { useInView } from "@/lib/hooks/useInView"
import { cn } from "@/lib/utils/style"

import { revealRootMargin } from "@/constants/animation"

export interface ProgressBarProps {
  name: string
  solved: number
  total: number
  percent: number
  selected: boolean
  dimmed: boolean
  onToggle: () => void
}

/**
 * Displays a toggleable category progress bar, counting up when it enters the viewport.
 *
 * @param props - Category progress, selection state and toggle handler.
 * @returns The progress bar button.
 */
export function ProgressBar({
  name,
  solved,
  total,
  percent,
  selected,
  dimmed,
  onToggle
}: ProgressBarProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin: revealRootMargin
  })
  const animatedPercent = useCountUp(percent, inView)
  const animatedSolved = useCountUp(solved, inView)

  return (
    <div
      ref={ref}
      className="w-full">
      <Button
        onClick={onToggle}
        ariaPressed={selected}
        className={cn(
          "group w-full flex-col select-text items-stretch justify-start gap-1 bg-transparent px-2 py-1.5 text-left font-normal",
          selected && "bg-accent text-foreground"
        )}>
        <span className="flex items-center justify-between gap-2 text-xs">
          <span
            className={cn(
              "truncate transition-opacity",
              dimmed &&
                "opacity-40 group-hover:opacity-100 group-focus-visible:opacity-100"
            )}>
            {name}
          </span>
          <span
            className={cn(
              "flex shrink-0 items-center gap-1 text-2xs transition-opacity",
              dimmed &&
                "opacity-40 group-hover:opacity-100 group-focus-visible:opacity-100"
            )}>
            <span className="text-muted font-light">
              ({Math.round(animatedSolved)}/{total})
            </span>
            <span>{Math.round(animatedPercent)}%</span>
          </span>
        </span>
        <span
          className={cn(
            "block h-1.5 w-full overflow-hidden bg-accent transition-colors group-hover:bg-background group-focus-visible:bg-background",
            selected && "bg-background"
          )}>
          <span
            className={cn(
              "block h-full bg-foreground transition-opacity",
              dimmed &&
                "opacity-40 group-hover:opacity-100 group-focus-visible:opacity-100"
            )}
            style={{ width: `${animatedPercent}%` }}
          />
        </span>
      </Button>
    </div>
  )
}
