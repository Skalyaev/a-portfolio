import { useEffect, useRef, useState } from "react"

import type { RefCallback } from "react"

export interface UseInfiniteScrollOptions {
  hasMore: boolean
  itemCount: number
  onLoadMore: () => void
}

export interface UseInfiniteScrollResult<T extends Element> {
  ref: RefCallback<T>
}

/**
 * Calls a handler while a sentinel element is visible, to load more items as a list is scrolled.
 *
 * The observer is re-armed every time the item count changes: its first notification tells
 * whether the sentinel is still visible, so loading goes on until it leaves the viewport. The
 * visibility accounts for clipping by scrollable ancestors, so a sentinel inside a scrollable box
 * only counts when visible in that box.
 *
 * @param options - Whether more items can be loaded, the loaded item count and the handler.
 * @returns A ref to attach to the sentinel element.
 */
export function useInfiniteScroll<T extends Element>({
  hasMore,
  itemCount,
  onLoadMore
}: UseInfiniteScrollOptions): UseInfiniteScrollResult<T> {
  const [element, setElement] = useState<T | null>(null)
  const onLoadMoreRef = useRef(onLoadMore)

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore
  }, [onLoadMore])

  useEffect(() => {
    if (!element || !hasMore) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onLoadMoreRef.current()
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [element, hasMore, itemCount])

  return { ref: setElement }
}
