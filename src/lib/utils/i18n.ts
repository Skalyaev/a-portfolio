/**
 * Converts a string to a lowercase ASCII slug, stripping accents.
 *
 * @param value - String to convert, e.g. `"Écoles & Formations"`.
 * @returns The slug, e.g. `"ecoles-formations"`.
 */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
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
