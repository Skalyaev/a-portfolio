"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"

export interface ButtonProps {
  children?: React.ReactNode
  selected?: boolean
  loading?: boolean
  onClick?: () => void
  href?: string
  type?: "button" | "submit" | "reset"
  className?: string
  disabled?: boolean
  suppressHydrationWarning?: boolean
  autoFocus?: boolean
  tabIndex?: number
  form?: string
  name?: string
  value?: string | number | readonly string[]
  id?: string
  title?: string
  ariaLabel?: string
  ariaExpanded?: boolean
  ariaPressed?: boolean
  ariaDisabled?: boolean
}
export function Button({
  children,
  selected,
  loading,
  onClick,
  href,
  type = "button",
  className,
  disabled,
  suppressHydrationWarning,
  autoFocus,
  tabIndex = 0,
  form,
  name,
  value,
  id,
  title,
  ariaLabel,
  ariaExpanded,
  ariaPressed,
  ariaDisabled
}: ButtonProps) {
  const styles = cn(
    "cursor-pointer bg-background text-muted text-sm font-medium inline-flex gap-2 items-center justify-center focus-visible:outline-none px-3 py-2 hover:text-foreground focus-visible:text-foreground transition hover:bg-accent focus-visible:bg-accent overflow-hidden",
    disabled &&
      "cursor-not-allowed opacity-50 hover:text-muted focus-visible:text-muted",
    loading &&
      "cursor-wait opacity-50 hover:text-muted focus-visible:text-muted",
    selected &&
      "bg-foreground text-background hover:text-background focus-visible:text-background hover:bg-foreground focus-visible:bg-foreground",
    className
  )
  const isActive = !disabled && !loading

  if (href) {
    return (
      <Link
        href={isActive ? href : "#"}
        onClick={isActive ? onClick : undefined}
        className={styles}
        tabIndex={tabIndex}
        id={id}
        title={title}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-pressed={ariaPressed}
        aria-disabled={ariaDisabled}
        suppressHydrationWarning={suppressHydrationWarning}>
        {children}
      </Link>
    )
  } else {
    return (
      <button
        type={type}
        onClick={isActive ? onClick : undefined}
        className={styles}
        disabled={disabled}
        suppressHydrationWarning={suppressHydrationWarning}
        autoFocus={autoFocus}
        tabIndex={tabIndex}
        form={form}
        name={name}
        value={value}
        id={id}
        title={title}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-pressed={ariaPressed}
        aria-disabled={ariaDisabled}>
        {children}
      </button>
    )
  }
}
