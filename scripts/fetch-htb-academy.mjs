// Refreshes the HTB Academy data hardcoded in src/constants/skills/hackthebox.ts.
//
// The Academy API has no stable app token like the Labs API (see
// fetch-htb-lab.mjs) — it only accepts a browser session cookie, which
// expires after a few days. Run this script whenever you want to pull fresh
// numbers from your real HTB Academy session:
//
//   npm run htb:academy
//
// It needs HTB_ACADEMY_SESSION_COOKIE, read from (in order): the
// environment, ../.env.local, or ../.env. To get it:
// log into academy.hackthebox.com, open DevTools > Application > Cookies,
// and copy these as one "; "-joined Cookie header string:
//   htb_academy_session, XSRF-TOKEN, cf_clearance, __cf_bm,
//   global_device_cookie_...
//
// Per-module completion dates aren't exposed anywhere in the progress API.
// The only place HTB records them is each earned badge's sharing_url, whose
// UUID is a UUIDv1 — which encodes the exact award timestamp in its bits.
// Decoding that locally (see decodeUuidV1Date) avoids fetching each badge's
// public share page just to read its `article:published_time` meta tag.

import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

import * as prettier from "prettier"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const constantsPath = path.join(
  scriptDir,
  "../src/constants/skills/hackthebox.ts"
)

const apiBase = "https://academy.hackthebox.com/api/v2"
const modulesPerPage = 100
const userAgent =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"

function readCookie() {
  if (process.env.HTB_ACADEMY_SESSION_COOKIE)
    return process.env.HTB_ACADEMY_SESSION_COOKIE

  const candidates = [
    path.join(scriptDir, "../.env.local"),
    path.join(scriptDir, "../.env")
  ]

  for (const candidate of candidates) {
    try {
      const content = readFileSync(candidate, "utf8")
      const match = content
        .split("\n")
        .find((line) => line.startsWith("HTB_ACADEMY_SESSION_COOKIE="))
      if (match) return match.slice("HTB_ACADEMY_SESSION_COOKIE=".length).trim()
    } catch {
      // try the next candidate
    }
  }

  return undefined
}

async function htbAcademyGet(cookie, path) {
  const response = await fetch(`${apiBase}${path}`, {
    headers: {
      "Cookie": cookie,
      "Accept": "application/json",
      "Referer": "https://academy.hackthebox.com/app/dashboard",
      "Origin": "https://academy.hackthebox.com",
      "User-Agent": userAgent
    }
  })
  if (!response.ok) {
    throw new Error(`${path} -> ${response.status} ${response.statusText}`)
  }
  return response.json()
}

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

// UUIDv1 packs a 60-bit count of 100ns intervals since 1582-10-15 across its
// time_low/time_mid/time_hi fields. HTB mints badge share-link UUIDs at the
// moment the badge is awarded, so decoding this gives the exact award date.
function decodeUuidV1Date(uuid) {
  const hex = uuid.replace(/-/g, "")
  if (hex.length !== 32) return null

  const timeLow = hex.slice(0, 8)
  const timeMid = hex.slice(8, 12)
  const timeHi = hex.slice(12, 16).replace(/^1/, "") // drop the version nibble

  const timestamp = BigInt(`0x${timeHi}${timeMid}${timeLow}`)
  const gregorianOffset = 0x01b21dd213814000n
  const hundredNsIntervals = timestamp - gregorianOffset
  if (hundredNsIntervals < 0n) return null

  const millisSinceEpoch = hundredNsIntervals / 10000n
  return new Date(Number(millisSinceEpoch))
}

async function fetchCompletedModuleDates(cookie) {
  console.error("Fetching badges...")
  const data = await htbAcademyGet(cookie, "/badges")
  const group = (data?.data ?? []).find(
    (g) => g.title === "Module Completion Badges"
  )
  const awarded = (group?.badges ?? []).filter((badge) => badge.awarded)

  const dates = new Map()
  for (const badge of awarded) {
    const uuid = badge.sharing_url?.split("/").pop()
    const date = uuid ? decodeUuidV1Date(uuid) : null
    if (!date) continue

    for (const mod of badge.requisites?.modules ?? []) {
      dates.set(mod.id, date.toISOString().slice(0, 10))
    }
  }

  return dates
}

function computeCategories(modules) {
  const totals = new Map()
  for (const mod of modules) {
    const name = mod.category?.title
    if (!name) continue

    const entry = totals.get(name) ?? { solved: 0, total: 0 }
    entry.total += 1
    totals.set(name, entry)
  }
  return totals
}

// JSON.stringify drops undefined fields and escapes strings safely; Prettier
// then turns it into idiomatic TS in spliceIntoConstants.
function buildGeneratedBlock(data) {
  return [
    "// --- HTB Academy data (generated) ---",
    `export const hackTheBoxAcademyData: HtbAcademyData = ${JSON.stringify(data, null, 2)}`,
    "// --- end HTB Academy data ---"
  ].join("\n")
}

async function spliceIntoConstants(generatedBlock) {
  const startMarker = "// --- HTB Academy data (generated) ---"
  const endMarker = "// --- end HTB Academy data ---"

  const content = readFileSync(constantsPath, "utf8")
  const startIndex = content.indexOf(startMarker)
  const endIndex = content.indexOf(endMarker)
  if (startIndex === -1 || endIndex === -1) {
    throw new Error(
      `Could not find generated-block markers in ${constantsPath}`
    )
  }

  const updated =
    content.slice(0, startIndex) +
    generatedBlock +
    content.slice(endIndex + endMarker.length)

  const prettierConfig = await prettier.resolveConfig(constantsPath)
  const formatted = await prettier.format(updated, {
    ...prettierConfig,
    filepath: constantsPath
  })
  writeFileSync(constantsPath, formatted)
}

async function main() {
  const cookie = readCookie()
  if (!cookie) {
    console.error(
      "HTB_ACADEMY_SESSION_COOKIE not found (checked env, .env.local, .env, ../.env)"
    )
    process.exit(1)
  }

  const allModules = await fetchAllModules(cookie)
  const completedDates = await fetchCompletedModuleDates(cookie)
  const categoryTotals = computeCategories(allModules)

  const modulesById = new Map(allModules.map((mod) => [mod.id, mod]))
  const completedModules = [...completedDates.entries()]
    .map(([id, date]) => {
      const mod = modulesById.get(id)
      if (!mod) return null
      return {
        name: mod.name ?? "",
        url: mod.url?.absolute,
        category: mod.category?.title ?? "",
        date
      }
    })
    .filter((mod) => mod !== null && mod.name.length > 0)
    .sort((a, b) => b.date.localeCompare(a.date))

  for (const mod of completedModules) {
    const category = mod.category
    const entry = categoryTotals.get(category)
    if (entry) entry.solved += 1
  }

  const categories = [...categoryTotals.entries()]
    .map(([name, { solved, total }]) => ({ name, solved, total }))
    .sort((a, b) => b.solved - a.solved)

  const data = {
    lastUpdated: new Date().toISOString().slice(0, 10),
    categories,
    modules: completedModules
  }

  await spliceIntoConstants(buildGeneratedBlock(data))

  console.error(
    `Done: ${completedModules.length} completed modules across ${categories.length} categories.`
  )
  console.error(`Updated ${constantsPath}`)
}

main().catch((error) => {
  console.error("FAILED:", error)
  process.exit(1)
})
