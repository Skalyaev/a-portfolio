import { useInView } from "@/lib/hooks/useInView"
import { useTransitionDelay } from "@/lib/hooks/useTransitionDelay"

import type { RefCallback } from "react"

export interface UseRevealOptions {
  enabled: boolean
  delayMs: number
  durationMs: number
  rootMargin: string
}

export interface UseRevealResult<T extends Element> {
  ref: RefCallback<T>
  entered: boolean
  transitionDelay: string
}

/**
 * Drives a delayed entrance transition started the first time an element enters the viewport.
 *
 * The delay is dropped once the entrance is over, or as soon as the entrance gets disabled.
 *
 * @param options - Whether the entrance is animated, its delay, its duration and the viewport margin.
 * @returns A ref to attach, whether the element has entered and the transition delay to apply.
 */
export function useReveal<T extends Element>({
  enabled,
  delayMs,
  durationMs,
  rootMargin
}: UseRevealOptions): UseRevealResult<T> {
  const { ref, inView } = useInView<T>({ rootMargin })
  const transitionDelay = useTransitionDelay(
    enabled && inView,
    delayMs,
    durationMs
  )

  return { ref, entered: !enabled || inView, transitionDelay }
}
