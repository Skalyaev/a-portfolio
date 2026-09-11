"use client"

import { Button } from "@/components/tag/Button"
import { X } from "@/components/svg/X"

import { cn } from "@/lib/utils/style"

export interface InputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  ariaLabel?: string
  className?: string
  icon?: React.ReactNode
  clearable?: boolean
  clearAriaLabel?: string
  clearTitle?: string
  id?: string
  name?: string
  disabled?: boolean
  autoFocus?: boolean
  type?: "text" | "search" | "email" | "password" | "number"
}
export function Input({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className,
  icon,
  clearable = true,
  clearAriaLabel,
  clearTitle,
  id,
  name,
  disabled,
  autoFocus,
  type = "text"
}: InputProps) {
  const showClear = clearable && value.length > 0

  return (
    <div
      className={cn(
        "flex items-center border-2 border-border bg-background transition-colors h-9 hover:border-foreground focus-within:border-foreground group",
        className
      )}>
      {icon && (
        <span className="text-muted group-hover:text-foreground group-focus-within:text-foreground pl-2">
          {icon}
        </span>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        disabled={disabled}
        autoFocus={autoFocus}
        className="grow h-full px-2 text-sm placeholder:text-muted focus:outline-none text-foreground"
      />
      {showClear && (
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
