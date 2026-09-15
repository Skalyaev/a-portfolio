import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react"

import type { CSSProperties, RefCallback } from "react"

export interface MasonryItemProps {
  ref: RefCallback<HTMLElement>
  style: CSSProperties
}

export interface UseMasonryLayoutResult {
  containerRef: RefCallback<HTMLElement>
  containerHeight: number | undefined
  getItemProps: (index: number) => MasonryItemProps
}

interface MasonryPosition {
  top: number
  left: number
  width: number
}

/**
 * Computes an absolutely positioned masonry layout, items filling columns in order.
 *
 * Recomputes when the container, an item or the window is resized.
 *
 * @param itemCount - Number of items to lay out.
 * @param getColumnCount - Returns the column count for a viewport width.
 * @param gapPx - Gap between items, in pixels.
 * @returns A container ref, the container height and a getter of per-item ref and style.
 */
export function useMasonryLayout(
  itemCount: number,
  getColumnCount: (viewportWidth: number) => number,
  gapPx: number
): UseMasonryLayoutResult {
  const containerElementRef = useRef<HTMLElement | null>(null)
  const itemElementsRef = useRef<Array<HTMLElement | null>>([])
  const observerRef = useRef<ResizeObserver | null>(null)
  const previousPositionsRef = useRef<MasonryPosition[]>([])
  const previousContainerHeightRef = useRef<number | undefined>(undefined)

  const [positions, setPositions] = useState<MasonryPosition[]>([])
  const [containerHeight, setContainerHeight] = useState<number | undefined>(
    undefined
  )

  const recompute = useCallback(() => {
    const container = containerElementRef.current
    if (!container) return

    const containerWidth = container.clientWidth
    const columnCount = Math.max(1, getColumnCount(window.innerWidth))
    const columnWidth =
      (containerWidth - gapPx * (columnCount - 1)) / columnCount

    const columnHeights = new Array<number>(columnCount).fill(0)
    const nextPositions: MasonryPosition[] = []

    for (let index = 0; index < itemCount; index++) {
      const height = itemElementsRef.current[index]?.offsetHeight ?? 0
      const columnIndex = index % columnCount
      const top = columnHeights[columnIndex]
      const left = columnIndex * (columnWidth + gapPx)

      nextPositions.push({ top, left, width: columnWidth })
      columnHeights[columnIndex] = top + height + gapPx
    }

    const nextContainerHeight = Math.max(0, Math.max(...columnHeights) - gapPx)

    const epsilonPx = 1
    const previousPositions = previousPositionsRef.current
    const positionsChanged =
      nextPositions.length !== previousPositions.length ||
      nextPositions.some((position, index) => {
        const previous = previousPositions[index]
        return (
          !previous ||
          Math.abs(position.top - previous.top) >= epsilonPx ||
          Math.abs(position.left - previous.left) >= epsilonPx ||
          Math.abs(position.width - previous.width) >= epsilonPx
        )
      })
    const heightChanged =
      previousContainerHeightRef.current === undefined ||
      Math.abs(nextContainerHeight - previousContainerHeightRef.current) >=
        epsilonPx

    if (!positionsChanged && !heightChanged) return

    previousPositionsRef.current = nextPositions
    previousContainerHeightRef.current = nextContainerHeight

    setPositions(nextPositions)
    setContainerHeight(nextContainerHeight)
  }, [itemCount, getColumnCount, gapPx])

  useLayoutEffect(() => {
    recompute()

    const container = containerElementRef.current
    if (!container) return

    const observer = new ResizeObserver(recompute)
    observer.observe(container)
    itemElementsRef.current.forEach((element) => {
      if (element) observer.observe(element)
    })
    observerRef.current = observer

    window.addEventListener("resize", recompute)
    return () => {
      observer.disconnect()
      observerRef.current = null
      window.removeEventListener("resize", recompute)
    }
  }, [recompute])

  const containerRef = useCallback((element: HTMLElement | null) => {
    containerElementRef.current = element
  }, [])

  const itemRefs = useMemo<Array<RefCallback<HTMLElement>>>(
    () =>
      Array.from(
        { length: itemCount },
        (_, index) => (element: HTMLElement | null) => {
          const previous = itemElementsRef.current[index]
          if (previous === element) return

          if (previous) observerRef.current?.unobserve(previous)
          if (element) observerRef.current?.observe(element)
          itemElementsRef.current[index] = element
        }
      ),
    [itemCount]
  )

  const getItemProps = useCallback(
    (index: number): MasonryItemProps => {
      const position = positions[index]
      return {
        ref: itemRefs[index],
        style: position
          ? {
              position: "absolute",
              top: position.top,
              left: position.left,
              width: position.width
            }
          : {}
      }
    },
    [positions, itemRefs]
  )

  return { containerRef, containerHeight, getItemProps }
}
