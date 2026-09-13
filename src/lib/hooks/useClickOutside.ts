import { useEffect, useEffectEvent } from "react"

import type { RefObject } from "react"

/**
 * Calls a handler when a pointer press happens outside an element.
 *
 * @param ref - Element inside which presses are ignored.
 * @param onClickOutside - Handler called on a press outside `ref`.
 * @param enabled - Whether presses are currently listened to.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onClickOutside: () => void,
  enabled: boolean
): void {
  const handleClickOutside = useEffectEvent(onClickOutside)

  useEffect(() => {
    if (!enabled) return

    function handlePointerDown(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClickOutside()
      }
    }
    document.addEventListener("pointerdown", handlePointerDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [ref, enabled])
}
