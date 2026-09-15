/**
 * Converts a string to a lowercase ASCII slug, stripping accents.
 *
 * @param value - String to convert, e.g. `"Écoles & Formations"`.
 * @returns The slug, e.g. `"ecoles-formations"`.
 */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export interface SplitTitle {
  title: string
  subtitle: string | undefined
}

/**
 * Splits a `"Title - Subtitle"` string on its first `" - "` separator.
 *
 * @param value - String to split, e.g. `"Anthony - Software Engineer"`.
 * @returns The title, and the subtitle when the separator is present.
 */
export function splitTitle(value: string): SplitTitle {
  const separator = " - "
  const index = value.indexOf(separator)
  if (index === -1) return { title: value, subtitle: undefined }
  return {
    title: value.slice(0, index),
    subtitle: value.slice(index + separator.length)
  }
}

/**
 * Translates a key, falling back to a default when no translation exists.
 *
 * @param t - Translation function returning the key itself when missing.
 * @param key - Translation key.
 * @param fallback - Value returned when `key` has no translation.
 * @returns The translation, or `fallback`.
 */
export function translateWithFallback(
  t: (key: string) => string,
  key: string,
  fallback: string
): string {
  const translated = t(key)
  return translated === key ? fallback : translated
}
