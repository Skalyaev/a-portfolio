import { useEffect, useState } from "react"

/**
 * Returns the delay of an entrance transition, dropped once the entrance is over.
 *
 * Later transitions (hover, focus) then start immediately.
 *
 * @param active - Whether the entrance transition is running.
 * @param delayMs - Delay before the entrance starts, in milliseconds.
 * @param durationMs - Duration of the entrance, in milliseconds.
 * @returns The CSS transition delay to apply.
 */
export function useTransitionDelay(
  active: boolean,
  delayMs: number,
  durationMs: number
): string {
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    if (!active) return
    const timeout = setTimeout(() => setSettled(true), delayMs + durationMs)
    return () => clearTimeout(timeout)
  }, [active, delayMs, durationMs])

  return active && !settled ? `${delayMs}ms` : "0ms"
}
