import { useEffect, useEffectEvent } from "react"

import { cn } from "@/lib/utils/style"

export type NotifyVariant = "success" | "error"

export interface NotifyProps {
  variant: NotifyVariant
  message: string
  onDismiss: () => void
}

const autoDismissDelayMs = 10_000

const variantClassNames: Record<NotifyVariant, string> = {
  success:
    "border-green-600 bg-green-100/85 text-green-700 dark:text-green-400",
  error: "border-red-600 bg-red-100/85 text-red-700 dark:text-red-400"
}

/**
 * Displays a status box that fades and slides in from the right, dismissed on click or after a fixed delay.
 *
 * It replays its entrance animation whenever remounted, so the caller passes a `key` that changes
 * with each new notification.
 *
 * @param props - Variant, message and dismiss handler.
 * @returns The notification box.
 */
export function Notify({ variant, message, onDismiss }: NotifyProps) {
  const dismiss = useEffectEvent(onDismiss)

  useEffect(() => {
    const timeoutId = setTimeout(() => dismiss(), autoDismissDelayMs)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <button
      type="button"
      onClick={onDismiss}
      className={cn(
        "border-2 px-3 py-2 text-left text-xs w-max shadow-xs max-w-[max(18rem,calc(100vw_-_2rem))] sm:max-w-xl cursor-pointer animate-notify-from-right",
        variantClassNames[variant]
      )}>
      <span
        role={variant === "error" ? "alert" : "status"}
        className="min-w-0 break-words">
        {message}
      </span>
    </button>
  )
}
