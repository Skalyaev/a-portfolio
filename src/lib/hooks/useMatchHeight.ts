import { useLayoutEffect, useState } from "react"

import type { RefCallback } from "react"

export interface UseMatchHeightResult<T extends HTMLElement> {
  ref: RefCallback<T>
  height: number | undefined
}

/**
 * Tracks the height of an element while a media query matches.
 *
 * @param query - Media query enabling the tracking, e.g. `"(min-width: 1024px)"`.
 * @returns A ref to attach to the element and its height in pixels, or `undefined` when the query does not match.
 */
export function useMatchHeight<T extends HTMLElement>(
  query: string
): UseMatchHeightResult<T> {
  const [element, setElement] = useState<T | null>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia(query)

    /**
     * Stores the element height while the query matches, `undefined` otherwise.
     */
    function updateHeight(): void {
      setHeight(
        mediaQuery.matches && element
          ? element.getBoundingClientRect().height
          : undefined
      )
    }

    updateHeight()
    mediaQuery.addEventListener("change", updateHeight)

    const observer = new ResizeObserver(updateHeight)
    if (element) observer.observe(element)

    return () => {
      mediaQuery.removeEventListener("change", updateHeight)
      observer.disconnect()
    }
  }, [element, query])

  return { ref: setElement, height }
}
