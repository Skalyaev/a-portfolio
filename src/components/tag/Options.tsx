import { cn } from "@/lib/utils/style"

export type OptionsFrom = "top" | "bottom" | "left" | "right"

const positionClasses: Record<OptionsFrom, string> = {
  top: "bottom-[calc(100%+1rem)]",
  bottom: "top-[calc(100%+1rem)]",
  left: "right-[calc(100%+1rem)]",
  right: "left-[calc(100%+1rem)]"
}

const hiddenTranslateClasses: Record<OptionsFrom, string> = {
  top: "-translate-y-4",
  bottom: "translate-y-4",
  left: "-translate-x-4",
  right: "translate-x-4"
}

export interface OptionsProps {
  children?: React.ReactNode
  open: boolean
  from: OptionsFrom
  className?: string
}

/**
 * Absolutely positioned dropdown panel that slides in from the given side when open.
 * While closed it is `inert`, so its content is neither focusable nor exposed to assistive tech.
 *
 * @param props - Content, open state, opening side and extra classes.
 * @returns The dropdown panel.
 */
export function Options({ children, open, from, className }: OptionsProps) {
  return (
    <div
      className={cn(
        "absolute z-50 flex flex-col border-2 border-border bg-background transition p-2 shadow-xs",
        positionClasses[from],
        open
          ? "translate-x-0 translate-y-0 opacity-100 ease-out"
          : cn(
              "pointer-events-none opacity-0 ease-in",
              hiddenTranslateClasses[from]
            ),
        className
      )}
      inert={!open}>
      {children}
    </div>
  )
}
