import { Button } from "@/components/tag/Button"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { useInView } from "@/lib/hooks/useInView"
import { cn, revealClassName } from "@/lib/utils/style"

import { revealRootMargin } from "@/constants/animation"
import { labelClassName } from "@/constants/style"

import { translateCategory } from "../../_lib/cyberSecurity"

import type { ActivityEntry } from "@/constants/skills/profile"

const itemCascadeStepMs = 60
const itemCascadeMaxSteps = 8

export interface ActivityListProps {
  items: ActivityEntry[]
}

/**
 * Displays a scrollable list of recent activity entries, cascading in when visible.
 *
 * @param props - Component props.
 * @param props.items - Entries to display, dates already formatted.
 * @returns The activity list, or an empty-state message.
 */
export function ActivityList({ items }: ActivityListProps) {
  const { t } = useLanguage()
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin: revealRootMargin
  })

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <span className={cn(labelClassName, "border-b border-border px-2 py-1")}>
        {t("skills.cybersecurity.recentActivity")}
      </span>
      {items.length === 0 ? (
        <p className="flex flex-1 items-center justify-center whitespace-pre-line px-3 py-2 text-center text-xs font-light text-muted">
          {t("skills.cybersecurity.noActivity")}
        </p>
      ) : (
        <div
          ref={ref}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto divide-y divide-border px-4 py-2">
          {items.map((item, index) => (
            <div
              key={item.name}
              className={cn(
                "shrink-0 transition-[opacity,translate] duration-400",
                revealClassName(inView)
              )}
              style={{
                transitionDelay: `${Math.min(index, itemCascadeMaxSteps) * itemCascadeStepMs}ms`
              }}>
              <Button
                href={item.url}
                target={item.url ? "_blank" : undefined}
                rel={item.url ? "noopener noreferrer" : undefined}
                disabled={!item.url}
                className="group flex w-full min-w-0 select-text items-center justify-between gap-2 bg-transparent text-xs text-muted hover:bg-transparent focus-visible:bg-transparent py-1.5">
                <span className="flex min-w-0 flex-col items-start">
                  <span className="min-w-0 truncate text-foreground group-hover:underline group-focus-visible:underline">
                    {item.name}
                  </span>
                  <span className="text-2xs min-w-0 truncate font-light text-muted">
                    {translateCategory(t, item.category)}
                  </span>
                </span>
                {item.date && (
                  <span className="text-2xs shrink-0 font-light">
                    {item.date}
                  </span>
                )}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
