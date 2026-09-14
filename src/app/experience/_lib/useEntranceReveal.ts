import { useEffect, useState } from "react"

export interface UseEntranceRevealOptions {
  delayMs: number
  durationMs: number
}

export interface UseEntranceRevealResult {
  entered: boolean
  transitionDelay: string
}

/**
 * Drives a delayed entrance transition started once, right after the component mounts.
 *
 * Unlike a scroll-triggered reveal, this fires on load regardless of viewport position. The delay
 * is dropped once the entrance is over, so later transitions (hover, focus) start immediately.
 *
 * @param options - The entrance delay and duration.
 * @returns Whether the element has entered and the transition delay to apply.
 */
export function useEntranceReveal({
  delayMs,
  durationMs
}: UseEntranceRevealOptions): UseEntranceRevealResult {
  const [entered, setEntered] = useState(false)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!entered) return
    const timeout = setTimeout(() => setSettled(true), delayMs + durationMs)
    return () => clearTimeout(timeout)
  }, [entered, delayMs, durationMs])

  return {
    entered,
    transitionDelay: entered && !settled ? `${delayMs}ms` : "0ms"
  }
}
