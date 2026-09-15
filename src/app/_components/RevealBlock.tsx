import { useEntranceReveal } from "@/lib/hooks/useEntranceReveal"
import { cn, revealClassName } from "@/lib/utils/style"

import { revealCascadeStepMs, revealDurationMs } from "@/constants/animation"

import type { ReactNode } from "react"
import type { RevealDirection } from "@/lib/utils/style"

export interface RevealBlockProps {
  step: number
  stepMs?: number
  direction?: RevealDirection
  className?: string
  children: ReactNode
  durationMs?: number
}

/**
 * Block sliding into place on load, after the blocks of the previous steps.
 *
 * @param props - Component props.
 * @param props.step - Position in the entrance cascade, 0 entering first.
 * @param props.stepMs - Delay between two steps, in milliseconds, `revealCascadeStepMs` by default.
 * @param props.direction - Direction the block travels toward, `"up"` (from below) by default.
 * @param props.className - Extra classes.
 * @param props.children - Block content.
 * @returns The animated block.
 */
export function RevealBlock({
  step,
  stepMs = revealCascadeStepMs,
  direction,
  className,
  children,
  durationMs = revealDurationMs
}: RevealBlockProps) {
  const { entered, transitionDelay } = useEntranceReveal({
    delayMs: step * stepMs,
    durationMs
  })

  return (
    <div
      className={cn(
        "transition-[opacity,translate] duration-400",
        revealClassName(entered, direction),
        className
      )}
      style={{ transitionDelay }}>
      {children}
    </div>
  )
}
