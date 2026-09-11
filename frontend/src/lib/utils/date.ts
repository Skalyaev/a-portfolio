export function formatShortDate(date: string | Date): string {
  const parsed = typeof date === "string" ? new Date(date) : date

  const day = String(parsed.getUTCDate()).padStart(2, "0")
  const month = String(parsed.getUTCMonth() + 1).padStart(2, "0")
  const year = String(parsed.getUTCFullYear()).slice(-2)

  return `${day}/${month}/${year}`
}
