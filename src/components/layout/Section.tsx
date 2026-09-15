import { cn } from "@/lib/utils/style"

import type { ReactNode } from "react"

export interface SectionProps {
  title: string
  subtitle: string
  className?: string
  headerClassName?: string
  children: ReactNode
}

/**
 * Renders a page section with a title and subtitle.
 *
 * @param props - Section heading, extra classes, extra header classes and content.
 * @returns The section.
 */
export function Section({
  title,
  subtitle,
  className,
  headerClassName,
  children
}: SectionProps) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <div className={cn("flex flex-col gap-1", headerClassName)}>
        <h5>{title}</h5>
        <p className="text-xs text-muted">{subtitle}</p>
      </div>
      {children}
    </section>
  )
}
