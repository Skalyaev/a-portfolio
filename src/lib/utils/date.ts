/**
 * Formats a date as a localized long month and year in UTC, e.g. "March 2024".
 *
 * UTC keeps date-only ISO strings on their calendar day whatever the viewer's time zone,
 * so the server and client renders match.
 *
 * @param date - ISO string or `Date` to format.
 * @param locale - BCP 47 locale used for formatting.
 * @returns The formatted date.
 */
export function formatMonthYear(date: string | Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(date))
}

/**
 * Formats a date as a localized day, long month and year in UTC, e.g. "5 March 2024".
 *
 * @param date - ISO string or `Date` to format.
 * @param locale - BCP 47 locale used for formatting.
 * @returns The formatted date.
 */
export function formatFullDate(date: string | Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(date))
}

/**
 * Counts the full years elapsed since a date, in UTC.
 *
 * @param date - ISO string or `Date` to count from.
 * @returns The number of full years between `date` and now.
 */
export function fullYearsSince(date: string | Date): number {
  const parsed = new Date(date)
  const now = new Date()

  let years = now.getUTCFullYear() - parsed.getUTCFullYear()
  const monthDiff = now.getUTCMonth() - parsed.getUTCMonth()
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getUTCDate() < parsed.getUTCDate())
  ) {
    years -= 1
  }

  return years
}
