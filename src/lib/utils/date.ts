type DateStyle = "monthYear" | "fullDate"

const dateFormatOptions: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  monthYear: { month: "long", year: "numeric", timeZone: "UTC" },
  fullDate: { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
}

const dateFormatters = new Map<string, Intl.DateTimeFormat>()
const monthCountFormatters = new Map<string, Intl.NumberFormat>()

/**
 * Returns a cached date formatter, since building an `Intl.DateTimeFormat` is costly.
 *
 * @param locale - BCP 47 locale used for formatting.
 * @param style - Parts of the date to display.
 * @returns The formatter for this locale and style.
 */
function getDateFormatter(
  locale: string,
  style: DateStyle
): Intl.DateTimeFormat {
  const key = `${locale}|${style}`
  const cached = dateFormatters.get(key)
  if (cached) return cached

  const formatter = new Intl.DateTimeFormat(locale, dateFormatOptions[style])
  dateFormatters.set(key, formatter)
  return formatter
}

/**
 * Returns a cached month count formatter, since building an `Intl.NumberFormat` is costly.
 *
 * @param locale - BCP 47 locale used for formatting.
 * @returns The formatter for this locale.
 */
function getMonthCountFormatter(locale: string): Intl.NumberFormat {
  const cached = monthCountFormatters.get(locale)
  if (cached) return cached

  const formatter = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "month",
    unitDisplay: "long"
  })
  monthCountFormatters.set(locale, formatter)
  return formatter
}

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
  return getDateFormatter(locale, "monthYear").format(new Date(date))
}

/**
 * Formats a date as a localized day, long month and year in UTC, e.g. "5 March 2024".
 *
 * @param date - ISO string or `Date` to format.
 * @param locale - BCP 47 locale used for formatting.
 * @returns The formatted date.
 */
export function formatFullDate(date: string | Date, locale: string): string {
  return getDateFormatter(locale, "fullDate").format(new Date(date))
}

/**
 * Formats a number of months as a localized duration, e.g. "6 months".
 *
 * @param months - Number of months.
 * @param locale - BCP 47 locale used for formatting.
 * @returns The formatted duration.
 */
export function formatMonthCount(months: number, locale: string): string {
  return getMonthCountFormatter(locale).format(months)
}

/**
 * Counts the months between the month of a start date and the month of an end date, in UTC.
 *
 * @param start - ISO string or `Date` marking the first month.
 * @param end - ISO string or `Date` marking the last month.
 * @returns The number of months from `start` to `end`, e.g. 1 from January to February.
 */
export function monthsBetween(
  start: string | Date,
  end: string | Date
): number {
  const from = new Date(start)
  const to = new Date(end)
  return (
    (to.getUTCFullYear() - from.getUTCFullYear()) * 12 +
    (to.getUTCMonth() - from.getUTCMonth())
  )
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
