import { cn } from "@/lib/utils/style"

import { labelClassName } from "@/constants/style"

export interface StatTileProps {
  label: string
  value: string
}

/**
 * Displays a small labeled statistic.
 *
 * @param props - Component props.
 * @param props.label - Statistic label.
 * @param props.value - Statistic value, also shown as tooltip when truncated.
 * @returns The stat tile.
 */
export function StatTile({ label, value }: StatTileProps) {
  return (
    <div className="flex w-28 shrink-0 flex-col justify-between border-2 border-border px-3 py-2 gap-1">
      <span className={cn(labelClassName, "self-start font-light")}>
        {label}
      </span>
      <span
        title={value}
        className="self-end text-sm font-semibold truncate">
        {value}
      </span>
    </div>
  )
}
