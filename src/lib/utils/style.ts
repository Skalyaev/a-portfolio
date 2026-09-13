import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import type { ClassValue } from "clsx"

/**
 * Joins class names conditionally and resolves conflicting Tailwind classes.
 *
 * @param inputs - Class values accepted by `clsx`.
 * @returns The merged class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
