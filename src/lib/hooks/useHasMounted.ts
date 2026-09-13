import { useSyncExternalStore } from "react"

/**
 * No-op subscription: the mounted state never changes after hydration.
 *
 * @returns A no-op unsubscribe function.
 */
function subscribe(): () => void {
  return () => {}
}

/**
 * Tells whether the component renders on the client after hydration.
 *
 * @returns `false` on the server and during hydration, `true` afterwards.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}
