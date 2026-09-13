import { useEffect, useRef, useState } from "react"

/**
 * Cubic ease-out curve.
 *
 * @param progress - Linear progress between 0 and 1.
 * @returns The eased progress between 0 and 1.
 */
function easeOutCubic(progress: number): number {
  return 1 - (1 - progress) ** 3
}

/**
 * Animates a number from 0 to a target once triggered.
 *
 * @param target - Final value of the animation.
 * @param trigger - Starts the animation when it becomes true.
 * @param durationMs - Duration of the animation, in milliseconds.
 * @returns The current, unrounded animated value.
 */
export function useCountUp(
  target: number,
  trigger: boolean,
  durationMs: number = 800
): number {
  const [value, setValue] = useState(0)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!trigger) return

    const startTime = performance.now()

    function tick(now: number) {
      const progress = Math.min(1, (now - startTime) / durationMs)
      setValue(target * easeOutCubic(progress))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [trigger, target, durationMs])

  return value
}
