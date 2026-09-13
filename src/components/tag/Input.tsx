"use client"

import { Button } from "@/components/tag/Button"
import { X } from "@/components/svg/X"

export interface InputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  ariaLabel?: string
  icon?: React.ReactNode
  clearAriaLabel?: string
  clearTitle?: string
}

/**
 * Controlled text input with an optional leading icon and a clear button shown when not empty.
 *
 * @param props - Value, change handler, placeholder, icon and clear button labels.
 * @returns The input field.
 */
export function Input({
  value,
  onChange,
  placeholder,
  ariaLabel,
  icon,
  clearAriaLabel,
  clearTitle
}: InputProps) {
  return (
    <div className="flex items-center border-2 border-border bg-background transition-colors h-9 hover:border-foreground focus-within:border-foreground group">
      {icon && (
        <span className="text-muted group-hover:text-foreground group-focus-within:text-foreground pl-2">
          {icon}
        </span>
      )}
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="grow h-full px-2 text-sm placeholder:text-muted focus:outline-none text-foreground"
      />
      {value.length > 0 && (
        <div className="h-full aspect-square py-1 pr-1 flex items-center justify-center">
          <Button
            onClick={() => onChange("")}
            ariaLabel={clearAriaLabel}
            title={clearTitle}
            className="p-0 h-full w-full">
            <X
              width="66%"
              height="66%"
            />
          </Button>
        </div>
      )}
    </div>
  )
}
