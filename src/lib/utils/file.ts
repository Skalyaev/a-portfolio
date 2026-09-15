const byteUnits = ["byte", "kilobyte", "megabyte", "gigabyte"] as const

type ByteUnit = (typeof byteUnits)[number]

const byteFormatters = new Map<string, Intl.NumberFormat>()

/**
 * Extracts the lowercase extension of a file name.
 *
 * Trailing dots and spaces are ignored, as Windows strips them: `"run.exe. "` opens as `"run.exe"`.
 *
 * @param fileName - File name, e.g. `"Report.PDF"`.
 * @returns The extension without the dot, e.g. `"pdf"`, or an empty string when there is none.
 */
export function getFileExtension(fileName: string): string {
  const trimmedName = fileName.replace(/[.\s]+$/, "")
  const dotIndex = trimmedName.lastIndexOf(".")
  return dotIndex > 0 ? trimmedName.slice(dotIndex + 1).toLowerCase() : ""
}

/**
 * Returns a cached byte formatter, since building an `Intl.NumberFormat` is costly.
 *
 * @param locale - BCP 47 locale used for the number and unit.
 * @param unit - Unit to display.
 * @returns The formatter for this locale and unit.
 */
function getByteFormatter(locale: string, unit: ByteUnit): Intl.NumberFormat {
  const key = `${locale}|${unit}`
  const cached = byteFormatters.get(key)
  if (cached) return cached

  const formatter = new Intl.NumberFormat(locale, {
    style: "unit",
    unit,
    unitDisplay: "short",
    maximumFractionDigits: 1
  })
  byteFormatters.set(key, formatter)
  return formatter
}

/**
 * Formats a byte count with the most readable unit, localized (e.g. `"1.5 MB"`, `"1,5 Mo"`).
 *
 * @param bytes - Size in bytes.
 * @param locale - BCP 47 locale used for the number and unit.
 * @returns The formatted size.
 */
export function formatBytes(bytes: number, locale: string): string {
  let value = bytes
  let unitIndex = 0

  while (value >= 1024 && unitIndex < byteUnits.length - 1) {
    value /= 1024
    unitIndex++
  }

  return getByteFormatter(locale, byteUnits[unitIndex]).format(value)
}
