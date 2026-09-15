import { formatMonthYear } from "@/lib/utils/date"
import { slugify, translateWithFallback } from "@/lib/utils/i18n"

import type { ActivityEntry } from "@/constants/skills/profile"

/**
 * Returns the timestamp used to sort an activity entry.
 *
 * @param date - ISO date of the entry, if known.
 * @returns The timestamp, or 0 so undated entries sort last.
 */
function getSortTime(date: string | undefined): number {
  return date ? new Date(date).getTime() : 0
}

/**
 * Filters activity entries by category, sorts them newest first and formats their dates.
 *
 * @param entries - Activity entries with ISO dates.
 * @param selectedCategories - Categories to keep; every entry is kept when empty.
 * @param locale - Locale used to format dates.
 * @param undatedLabel - Label shown instead of the date of undated entries.
 * @returns The entries ready to display.
 */
export function toActivityItems(
  entries: ActivityEntry[],
  selectedCategories: string[],
  locale: string,
  undatedLabel?: string
): ActivityEntry[] {
  return entries
    .filter(
      (entry) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(entry.category)
    )
    .sort((a, b) => getSortTime(b.date) - getSortTime(a.date))
    .map((entry) => ({
      ...entry,
      date: entry.date ? formatMonthYear(entry.date, locale) : undatedLabel
    }))
}

/**
 * Translates a platform category name, keeping the raw name when no translation exists.
 *
 * @param t - Translation function.
 * @param name - Category name as provided by the platform.
 * @returns The translated category name.
 */
export function translateCategory(
  t: (key: string) => string,
  name: string
): string {
  return translateWithFallback(
    t,
    `skills.cybersecurity.categories.${slugify(name)}`,
    name
  )
}
