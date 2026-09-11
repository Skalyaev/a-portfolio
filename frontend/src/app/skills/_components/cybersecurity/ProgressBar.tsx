import { cn } from "@/lib/utils/style"

export interface ProgressBarProps {
  name: string
  solved: number
  total: number
  percent: number
  url?: string
  dimmed?: boolean
  onToggle?: () => void
}
export function ProgressBar({
  name,
  solved,
  total,
  percent,
  url,
  dimmed = false,
  onToggle
}: ProgressBarProps) {
  return (
    <div
      role={onToggle ? "button" : undefined}
      tabIndex={onToggle ? 0 : undefined}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (!onToggle) return
        if (event.key !== "Enter" && event.key !== " ") return
        event.preventDefault()
        onToggle()
      }}
      className={cn(
        "flex flex-col gap-1 transition-opacity",
        onToggle && "cursor-pointer select-none",
        dimmed && "opacity-40"
      )}>
      <div className="flex items-center justify-between gap-2">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="truncate text-xs text-muted hover:text-foreground hover:underline">
            {name}
          </a>
        ) : (
          <span className="truncate text-xs text-muted">{name}</span>
        )}
        <span className="text-2xs text-muted shrink-0">
          {solved}/{total} · {Math.round(percent)}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden bg-accent">
        <div
          className="h-full bg-foreground"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
