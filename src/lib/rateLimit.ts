export interface RateLimiter {
  consume: (key: string) => boolean
}

/**
 * Creates an in-memory sliding-window rate limiter.
 *
 * State lives in the process memory: it resets on restart and is not shared between instances.
 * Expired keys are swept at most once per window, so a request does not scan every key.
 *
 * @param maxRequests - Requests allowed per key within the window.
 * @param windowMs - Window length, in milliseconds.
 * @returns A limiter whose `consume` records a request and tells whether it is allowed.
 */
export function createRateLimiter(
  maxRequests: number,
  windowMs: number
): RateLimiter {
  const hits = new Map<string, number[]>()
  let lastSweep = Date.now()

  /**
   * Records a request for a key when it is still under the limit.
   *
   * @param key - Client identifier, e.g. an IP address.
   * @returns `true` when the request is allowed, `false` when the limit is reached.
   */
  function consume(key: string): boolean {
    const now = Date.now()

    if (now - lastSweep >= windowMs) {
      for (const [storedKey, timestamps] of hits) {
        if (timestamps.every((time) => now - time >= windowMs))
          hits.delete(storedKey)
      }
      lastSweep = now
    }

    const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs)
    if (recent.length >= maxRequests) {
      hits.set(key, recent)
      return false
    }

    hits.set(key, [...recent, now])
    return true
  }

  return { consume }
}
