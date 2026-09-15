import { createContext, useContext } from "react"

import type { NotifyVariant } from "@/components/status/notify/Notify"

interface NotifyContextValue {
  pushNotification: (variant: NotifyVariant, message: string) => void
}

export const NotifyContext = createContext<NotifyContextValue | null>(null)

/**
 * Returns the function to push a notification into the layout's global notification stack.
 *
 * @returns The notify context value.
 * @throws If called outside a `NotifyProvider`.
 */
export function useNotify(): NotifyContextValue {
  const ctx = useContext(NotifyContext)
  if (!ctx) throw new Error("useNotify must be used within a NotifyProvider")
  return ctx
}
