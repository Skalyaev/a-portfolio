import { useEffect, useState } from "react"

import { useInView } from "@/lib/hooks/useInView"

import type { RefCallback } from "react"

export interface UseRevealOptions {
  enabled: boolean
  delayMs: number
  durationMs: number
  rootMargin?: string
}

export interface UseRevealResult<T extends Element> {
  ref: RefCallback<T>
  entered: boolean
  transitionDelay: string
}

/**
 * Drives a delayed entrance transition started the first time an element enters the viewport.
 *
 * The delay is dropped once the entrance is over, so later transitions (hover, focus) start immediately.
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
  const entered = !enabled || inView
  const [settled, setSettled] = useState(!enabled)

  useEffect(() => {
    if (!enabled || !entered) return
    const timeout = setTimeout(() => setSettled(true), delayMs + durationMs)
    return () => clearTimeout(timeout)
  }, [enabled, entered, delayMs, durationMs])

  return {
    ref,
    entered,
    transitionDelay: entered && !settled ? `${delayMs}ms` : "0ms"
  }
}
