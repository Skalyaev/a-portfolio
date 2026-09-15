import { useCallback, useRef, useState } from "react"

import type { RefCallback } from "react"

export interface UseInViewOptions {
  rootMargin: string
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
 * @param options - `IntersectionObserver` root margin.
 * @returns A ref to attach to the element and whether it has been seen.
 */
export function useInView<T extends Element>({
  rootMargin
}: UseInViewOptions): UseInViewResult<T> {
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
        { rootMargin }
      )
      observer.observe(element)
      observerRef.current = observer
    },
    [rootMargin]
  )

  return { ref, inView }
}
