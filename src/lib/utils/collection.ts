/**
 * Groups items under every key they list, so an item can belong to several groups.
 *
 * @param items - Items to group.
 * @param getKeys - Returns the keys of an item.
 * @returns The items by key; keys without any item are absent.
 */
export function groupByKeys<T, K extends string>(
  items: readonly T[],
  getKeys: (item: T) => readonly K[]
): Partial<Record<K, T[]>> {
  const groups: Partial<Record<K, T[]>> = {}
  for (const item of items) {
    for (const key of getKeys(item)) {
      const group = (groups[key] ??= [])
      group.push(item)
    }
  }
  return groups
}
