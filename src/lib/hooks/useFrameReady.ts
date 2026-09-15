import { useEffect, useState } from "react"

/**
 * Tells whether an animation frame has passed since the component mounted.
 *
 * Rendering the hidden state first, then the settled one once this turns true, lets entrance
 * transitions run for elements mounted at any time, not only on page load.
 *
 * @returns `false` on mount, `true` from the next animation frame.
 */
export function useFrameReady(): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return ready
}
