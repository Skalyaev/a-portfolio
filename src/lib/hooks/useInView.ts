import { useCallback, useRef, useState } from "react"

import type { RefCallback } from "react"

export interface UseInViewOptions {
  rootMargin?: string
  threshold?: number
}

export interface UseInViewResult<T extends Element> {
  ref: RefCallback<T>
  inView: boolean
}

/**
 * Detects the first time an element enters the viewport.
 *
 * `inView` stays true once reached and the observer is disconnected.
 *
 * @param options - `IntersectionObserver` root margin and threshold.
 * @returns A ref to attach to the element and whether it has been seen.
 */
export function useInView<T extends Element>(
  options: UseInViewOptions = {}
): UseInViewResult<T> {
  const { rootMargin = "0px", threshold = 0 } = options
  const [inView, setInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const triggeredRef = useRef(false)

  const ref = useCallback<RefCallback<T>>(
    (element) => {
      observerRef.current?.disconnect()
      observerRef.current = null

      if (!element || triggeredRef.current) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          triggeredRef.current = true
          setInView(true)
          observer.disconnect()
        },
        { rootMargin, threshold }
      )
      observer.observe(element)
      observerRef.current = observer
    },
    [rootMargin, threshold]
  )

  return { ref, inView }
}
