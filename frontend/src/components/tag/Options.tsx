"use client"

import { cn } from "@/lib/utils"

export type OptionsFrom = "top" | "bottom" | "left" | "right"

export interface OptionsProps {
  children?: React.ReactNode
  open: boolean
  from: OptionsFrom
  className?: string
}
export function Options({ children, open, from, className }: OptionsProps) {
  const position: Record<OptionsFrom, string> = {
    top: "bottom-[calc(100%+1rem)]",
    bottom: "top-[calc(100%+1rem)]",
    left: "right-[calc(100%+1rem)]",
    right: "left-[calc(100%+1rem)]"
  }

  const translate: Record<OptionsFrom, string> = {
    top: "-translate-y-4",
    bottom: "translate-y-4",
    left: "-translate-x-4",
    right: "translate-x-4"
  }

  return (
    <div
      className={cn(
        "absolute z-50 flex flex-col border-2 border-border bg-background transition py-1 shadow-xs",
        position[from],
        open
          ? "translate-x-0 translate-y-0 opacity-100 ease-out"
          : cn("pointer-events-none opacity-0 ease-in", translate[from]),
        className
      )}
      aria-hidden={!open}>
      {children}
    </div>
  )
}
