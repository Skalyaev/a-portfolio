import type { HtbActivityItem } from "@/lib/hackthebox"

export interface ActivityListProps {
  label: string
  items: HtbActivityItem[]
}
export function ActivityList({ label, items }: ActivityListProps) {
  if (items.length === 0) return null

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-2xs text-muted uppercase tracking-wide">
        {label}
      </span>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between gap-2 text-xs">
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-muted hover:text-foreground hover:underline">
                {item.name}
              </a>
            ) : (
              <span className="truncate text-muted">{item.name}</span>
            )}
            {item.date && (
              <span className="text-2xs text-muted shrink-0">{item.date}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
