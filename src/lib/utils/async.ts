/**
 * Maps items through an async function, running a limited number of calls at once.
 *
 * @param items - Items to map.
 * @param limit - Maximum number of concurrent calls, at least 1.
 * @param fn - Async function applied to each item.
 * @returns The results, in the same order as `items`.
 */
export async function mapWithConcurrency<T, R>(
  items: readonly T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let cursor = 0

  /**
   * Takes the next pending item and maps it, until none is left.
   */
  async function worker(): Promise<void> {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await fn(items[index])
    }
  }

  const workerCount = Math.min(Math.max(1, limit), items.length)
  await Promise.all(Array.from({ length: workerCount }, worker))
  return results
}
