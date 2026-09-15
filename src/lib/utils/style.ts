import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import type { ClassValue } from "clsx"
import type { CSSProperties } from "react"

export type CssVariablesStyle = CSSProperties & Record<`--${string}`, string>

/**
 * Joins class names conditionally and resolves conflicting Tailwind classes.
 *
 * @param inputs - Class values accepted by `clsx`.
 * @returns The merged class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Returns the position, opacity and easing classes of an element sliding up into place.
 *
 * @param entered - Whether the element has entered.
 * @returns The classes of the settled state when entered, of the hidden state otherwise.
 */
export function revealClassName(entered: boolean): string {
  return entered
    ? "translate-y-0 opacity-100 ease-out"
    : "translate-y-8 opacity-0 ease-in"
}
