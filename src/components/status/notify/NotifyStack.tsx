import { Notify } from "@/components/status/notify/Notify"

import type { NotifyVariant } from "@/components/status/notify/Notify"

export interface NotifyStackItem {
  id: number
  variant: NotifyVariant
  message: string
}

export interface NotifyStackProps {
  notifications: NotifyStackItem[]
  onDismiss: (id: number) => void
}

/**
 * Renders the active notifications in the bottom-left corner, next to the sidebar on desktop, the
 * most recent one closest to the bottom edge.
 *
 * @param props - The notifications to show and the dismiss handler.
 * @returns The notification stack, or nothing when it is empty.
 */
export function NotifyStack({ notifications, onDismiss }: NotifyStackProps) {
  if (notifications.length === 0) return null

  return (
    <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-2 md:left-64">
      {notifications.map((item) => (
        <Notify
          key={item.id}
          variant={item.variant}
          message={item.message}
          onDismiss={() => onDismiss(item.id)}
        />
      ))}
    </div>
  )
}
