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

export type RevealDirection = "up" | "down" | "left" | "right"

const revealHiddenClassNames: Record<RevealDirection, string> = {
  up: "translate-y-8 opacity-0 ease-in",
  down: "-translate-y-8 opacity-0 ease-in",
  left: "translate-x-8 opacity-0 ease-in",
  right: "-translate-x-8 opacity-0 ease-in"
}

/**
 * Returns the position, opacity and easing classes of an element sliding into place.
 *
 * @param entered - Whether the element has entered.
 * @param direction - Direction the element travels toward, `"up"` (from below) by default.
 * @returns The classes of the settled state when entered, of the hidden state otherwise.
 */
export function revealClassName(
  entered: boolean,
  direction: RevealDirection = "up"
): string {
  return entered
    ? "translate-x-0 translate-y-0 opacity-100 ease-out"
    : revealHiddenClassNames[direction]
}

/**
 * Returns the scale, opacity and easing classes of an element popping in from its center.
 *
 * @param entered - Whether the element has entered.
 * @returns The classes of the settled state when entered, of the hidden state otherwise.
 */
export function revealScaleClassName(entered: boolean): string {
  return entered
    ? "scale-100 opacity-100 ease-out"
    : "scale-0 opacity-0 ease-in"
}
