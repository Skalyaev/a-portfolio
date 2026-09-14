import { useReveal } from "@/lib/hooks/useReveal"
import { cn } from "@/lib/utils/style"

import { revealRootMargin } from "@/constants/animation"

import type { ReactNode } from "react"

const transitionDurationMs = 400

export interface RevealSectionProps {
  children: ReactNode
}

/**
 * Page section sliding in the first time it enters the viewport.
 *
 * @param props - Component props.
 * @param props.children - Section content.
 * @returns The animated section.
 */
export function RevealSection({ children }: RevealSectionProps) {
  const { ref, entered, transitionDelay } = useReveal<HTMLElement>({
    enabled: true,
    delayMs: 0,
    durationMs: transitionDurationMs,
    rootMargin: revealRootMargin
  })

  return (
    <section
      ref={ref}
      className={cn(
        "flex flex-col gap-4 transition-[opacity,translate] duration-400",
        entered
          ? "translate-y-0 opacity-100 ease-out"
          : "translate-y-8 opacity-0 ease-in"
      )}
      style={{ transitionDelay }}>
      {children}
    </section>
  )
}
