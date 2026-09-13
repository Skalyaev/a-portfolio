import { useCallback, useState } from "react"

export interface UseToggleListResult<T> {
  items: T[]
  toggle: (item: T) => void
  clear: () => void
}

/**
 * Manages a list of selected values that can be toggled on and off.
 *
 * @returns The selected values, a function toggling one value and a function clearing the selection.
 */
export function useToggleList<T>(): UseToggleListResult<T> {
  const [items, setItems] = useState<T[]>([])

  const toggle = useCallback((item: T) => {
    setItems((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item]
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  return { items, toggle, clear }
}
