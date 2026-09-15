"use client"

import { useCallback, useMemo, useRef, useState } from "react"

import { NotifyStack } from "@/components/status/notify/NotifyStack"
import { NotifyContext } from "@/components/status/notify/NotifyContext"

import type { ReactNode } from "react"
import type { NotifyVariant } from "@/components/status/notify/Notify"
import type { NotifyStackItem } from "@/components/status/notify/NotifyStack"

export interface NotifyProviderProps {
  children: ReactNode
}

/**
 * Exposes a `pushNotification` function to its whole subtree through context, and renders the
 * resulting notifications in a single stack.
 *
 * Living once in the root layout instead of in each route keeps a single stack: two routes
 * triggering notifications never end up with two competing, independently timed stacks.
 *
 * @param props - Children to provide the notify function to.
 * @returns The notification context provider and its stack.
 */
export function NotifyProvider({ children }: NotifyProviderProps) {
  const [notifications, setNotifications] = useState<NotifyStackItem[]>([])
  const nextIdRef = useRef(0)

  /**
   * Appends a notification to the stack.
   *
   * @param variant - Visual style of the notification.
   * @param message - Text to display.
   */
  const pushNotification = useCallback(
    (variant: NotifyVariant, message: string) => {
      setNotifications((current) => [
        ...current,
        { id: nextIdRef.current++, variant, message }
      ])
    },
    []
  )

  /**
   * Removes a single notification from the stack.
   *
   * @param id - Identifier of the notification to remove.
   */
  const dismissNotification = useCallback((id: number) => {
    setNotifications((current) => current.filter((item) => item.id !== id))
  }, [])

  const value = useMemo(() => ({ pushNotification }), [pushNotification])

  return (
    <NotifyContext.Provider value={value}>
      {children}
      <NotifyStack
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </NotifyContext.Provider>
  )
}
