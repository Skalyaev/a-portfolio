"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils/style"

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
  animateBackground?: "fromLeft" | "fromRight" | "fromTop" | "fromBottom"
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
  ariaDisabled,
  animateBackground
}: ButtonProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const backgroundGrown = isMounted && selected
  const isHorizontalAnimation =
    animateBackground === "fromLeft" || animateBackground === "fromRight"

  const styles = cn(
    "relative cursor-pointer bg-background text-muted text-sm font-medium inline-flex gap-1 items-center justify-center focus-visible:outline-none px-3 py-2 hover:text-foreground focus-visible:text-foreground transition hover:bg-accent focus-visible:bg-accent overflow-hidden select-none",
    disabled &&
      "cursor-not-allowed opacity-50 hover:text-muted focus-visible:text-muted",
    loading &&
      "cursor-wait opacity-50 hover:text-muted focus-visible:text-muted",
    selected &&
      (animateBackground
        ? "text-background hover:text-background focus-visible:text-background"
        : "bg-foreground text-background hover:text-background focus-visible:text-background hover:bg-foreground focus-visible:bg-foreground"),
    className
  )
  const isActive = !disabled && !loading

  const backgroundLayer = animateBackground && (
    <div
      aria-hidden="true"
      className={cn(
        "absolute bg-foreground pointer-events-none",
        isHorizontalAnimation
          ? "top-0 h-full transition-[width] duration-300 ease-out"
          : "left-0 w-full transition-[height] duration-300 ease-out",
        animateBackground === "fromLeft" && "left-0",
        animateBackground === "fromRight" && "right-0",
        animateBackground === "fromTop" && "top-0",
        animateBackground === "fromBottom" && "bottom-0",
        isHorizontalAnimation
          ? backgroundGrown
            ? "w-full"
            : "w-0"
          : backgroundGrown
            ? "h-full"
            : "h-0"
      )}
    />
  )

  const content = animateBackground ? (
    <span className="relative z-10 inline-flex gap-1 items-center">
      {children}
    </span>
  ) : (
    children
  )

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
        {backgroundLayer}
        {content}
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
        {backgroundLayer}
        {content}
      </button>
    )
  }
}
