/**
 * @file Refreshes the HTB Academy snapshot in `src/constants/skills/hackTheBoxAcademy.json`.
 *
 * The Academy API has no stable app token like the Labs API: it only accepts
 * a browser session cookie, which expires after a few days. Refresh with
 * `npm run htb:academy`.
 *
 * Requires `HTB_ACADEMY_SESSION_COOKIE`: log into academy.hackthebox.com, open
 * DevTools > Application > Cookies, and join these as one `; `-separated
 * Cookie header: htb_academy_session, XSRF-TOKEN, cf_clearance, __cf_bm,
 * global_device_cookie_...
 */

import {
  fetchJson,
  requireEnv,
  run,
  todayIsoDate,
  writeConstantsJson
} from "./lib/htb.mjs"

const apiBase = "https://academy.hackthebox.com/api/v2"
const modulesPerPage = 100
const userAgent =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
const gregorianToUnixOffset = 0x01b21dd213814000n

/**
 * Calls an HTB Academy API endpoint with the browser session cookie.
 *
 * @param cookie - Academy session Cookie header.
 * @param endpoint - API path, starting with `/`.
 * @returns The parsed response body.
 * @throws When the request fails.
 */
function htbAcademyGet(cookie, endpoint) {
  return fetchJson(`${apiBase}${endpoint}`, {
    "Cookie": cookie,
    "Referer": "https://academy.hackthebox.com/app/dashboard",
    "Origin": "https://academy.hackthebox.com",
    "User-Agent": userAgent
  })
}

/**
 * Fetches every Academy module across all result pages.
 *
 * @param cookie - Academy session Cookie header.
 * @returns The raw module entries.
 */
async function fetchAllModules(cookie) {
  const modules = []
  let page = 1
  let lastPage = 1

  do {
    console.error(
      `Fetching modules page ${page}${lastPage > 1 ? `/${lastPage}` : ""}...`
    )
    const data = await htbAcademyGet(
      cookie,
      `/modules?per_page=${modulesPerPage}&page=${page}`
    )
    if (!Array.isArray(data?.data)) break

    modules.push(...data.data)
    lastPage = data.meta?.last_page ?? 1
    page += 1
  } while (page <= lastPage)

  return modules
}

/**
 * Decodes the creation date embedded in a version 1 UUID.
 *
 * A UUIDv1 packs a 60-bit count of 100ns intervals since 1582-10-15 across its
 * time_low, time_mid and time_hi fields. HTB mints badge share-link UUIDs when
 * the badge is awarded, so this yields the module completion date, which the
 * progress API does not expose.
 *
 * @param uuid - UUID string, with or without dashes.
 * @returns The encoded date, or `null` when the UUID is not a valid version 1 UUID.
 */
function decodeUuidV1Date(uuid) {
  const hex = uuid.replace(/-/g, "").toLowerCase()
  if (!/^[0-9a-f]{32}$/.test(hex) || hex[12] !== "1") return null

  const timeLow = hex.slice(0, 8)
  const timeMid = hex.slice(8, 12)
  const timeHi = hex.slice(13, 16)

  const intervals =
    BigInt(`0x${timeHi}${timeMid}${timeLow}`) - gregorianToUnixOffset
  if (intervals < 0n) return null

  return new Date(Number(intervals / 10000n))
}

/**
 * Maps each completed module id to its completion date, from earned badges.
 *
 * @param cookie - Academy session Cookie header.
 * @returns Completion ISO dates keyed by module id.
 */
async function fetchCompletedModuleDates(cookie) {
  console.error("Fetching badges...")
  const data = await htbAcademyGet(cookie, "/badges")
  const group = (data?.data ?? []).find(
    (entry) => entry.title === "Module Completion Badges"
  )

  const dates = new Map()
  for (const badge of group?.badges ?? []) {
    if (!badge.awarded) continue
    const uuid = badge.sharing_url?.split("/").pop()
    const date = uuid ? decodeUuidV1Date(uuid) : null
    if (!date) continue

    for (const mod of badge.requisites?.modules ?? []) {
      dates.set(mod.id, date.toISOString().slice(0, 10))
    }
  }

  return dates
}

/**
 * Fetches the Academy progress and writes the snapshot file.
 */
async function main() {
  const cookie = requireEnv("HTB_ACADEMY_SESSION_COOKIE")

  const [allModules, completedDates] = await Promise.all([
    fetchAllModules(cookie),
    fetchCompletedModuleDates(cookie)
  ])

  const categoryTotals = new Map()
  for (const mod of allModules) {
    const name = mod.category?.title
    if (!name) continue
    const entry = categoryTotals.get(name) ?? { solved: 0, total: 0 }
    entry.total += 1
    categoryTotals.set(name, entry)
  }

  const modulesById = new Map(allModules.map((mod) => [mod.id, mod]))
  const completedModules = [...completedDates.entries()]
    .map(([id, date]) => {
      const mod = modulesById.get(id)
      if (!mod?.name) return null
      return {
        name: mod.name,
        url: mod.url?.absolute,
        category: mod.category?.title ?? "",
        date
      }
    })
    .filter((mod) => mod !== null)
    .sort((a, b) => b.date.localeCompare(a.date))

  for (const mod of completedModules) {
    const entry = categoryTotals.get(mod.category)
    if (entry) entry.solved += 1
  }

  const categories = [...categoryTotals.entries()]
    .map(([name, { solved, total }]) => ({ name, solved, total }))
    .sort((a, b) => b.solved - a.solved)

  const filePath = await writeConstantsJson("hackTheBoxAcademy.json", {
    lastUpdated: todayIsoDate(),
    categories,
    modules: completedModules
  })

  console.error(
    `Done: ${completedModules.length} completed modules across ${categories.length} categories.`
  )
  console.error(`Updated ${filePath}`)
}

run(main)
