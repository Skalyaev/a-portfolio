// Refreshes the HTB Lab data hardcoded in src/constants/skills/hackthebox.ts.
//
// The live HTB API is too rate-limit-flaky to call from the site at request
// time (see git history), so that section is a static snapshot instead. Run
// this script whenever you want to pull fresh numbers from your real HTB
// profile:
//
//   npm run htb:lab
//
// It needs HTB_APP_TOKEN, read from (in order): the environment,
// ../.env.local, or ../.env.

import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

import * as prettier from "prettier"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const constantsPath = path.join(
  scriptDir,
  "../src/constants/skills/hackthebox.ts"
)

const apiId = "1772537"
const apiBase = "https://labs.hackthebox.com/api/v4"
const solveDateBatchSize = 5
const solveDateBatchDelayMs = 300

function readToken() {
  if (process.env.HTB_APP_TOKEN) return process.env.HTB_APP_TOKEN

  const candidates = [
    path.join(scriptDir, "../.env.local"),
    path.join(scriptDir, "../.env")
  ]

  for (const candidate of candidates) {
    try {
      const content = readFileSync(candidate, "utf8")
      const match = content
        .split("\n")
        .find((line) => line.startsWith("HTB_APP_TOKEN="))
      if (match) return match.slice("HTB_APP_TOKEN=".length).trim()
    } catch {
      // try the next candidate
    }
  }

  return undefined
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function htbGet(token, path) {
  const response = await fetch(`${apiBase}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
  })
  if (!response.ok) {
    throw new Error(`${path} -> ${response.status} ${response.statusText}`)
  }
  return response.json()
}

function normalizeBreakdown(entries) {
  if (!Array.isArray(entries)) return []
  return entries
    .map((entry) => ({
      name: entry.name ?? "",
      solved:
        entry.owned_flags ??
        entry.owned_machines ??
        entry.owned_challenges ??
        0,
      total:
        entry.total_flags ?? entry.total_machines ?? entry.total_challenges ?? 0
    }))
    .filter((entry) => entry.total > 0)
    .sort((a, b) => b.solved - a.solved)
}

// HTB reports how long after release a challenge was solved (e.g. "7M 24D
// 3H") rather than an absolute date, so the solve date is release_date plus
// that offset.
function addDurationOffset(releaseDate, duration) {
  const matches = [...duration.matchAll(/(\d+)\s*([YMDH])/gi)]
  if (matches.length === 0) return null

  const result = new Date(releaseDate)
  for (const [, amount, unit] of matches) {
    const value = Number(amount)
    switch (unit.toUpperCase()) {
      case "Y":
        result.setUTCFullYear(result.getUTCFullYear() + value)
        break
      case "M":
        result.setUTCMonth(result.getUTCMonth() + value)
        break
      case "D":
        result.setUTCDate(result.getUTCDate() + value)
        break
      case "H":
        result.setUTCHours(result.getUTCHours() + value)
        break
    }
  }
  return result
}

async function fetchSolvedChallenges(token) {
  const categoriesData = await htbGet(token, "/challenge/categories/list")
  const categoryNames = new Map()
  for (const entry of categoriesData?.info ?? []) {
    if (entry.id !== undefined && entry.name)
      categoryNames.set(entry.id, entry.name)
  }

  const [activeData, retiredData] = await Promise.all([
    htbGet(token, "/challenge/list"),
    htbGet(token, "/challenge/list/owns")
  ])
  const entries = [
    ...(activeData?.challenges ?? []),
    ...(retiredData?.challenges ?? [])
  ]
  const solved = entries.filter((challenge) => challenge.authUserSolve)

  console.error(`Fetching solve dates for ${solved.length} challenges...`)
  const solveDates = []
  for (let i = 0; i < solved.length; i += solveDateBatchSize) {
    const batch = solved.slice(i, i + solveDateBatchSize)
    const batchResults = await Promise.all(
      batch.map(async (challenge) => {
        if (challenge.id === undefined) return undefined
        try {
          const info = await htbGet(token, `/challenge/info/${challenge.id}`)
          const offset = info?.challenge?.authUserSolveTime
          if (!challenge.release_date || !offset) return undefined
          const released = new Date(challenge.release_date)
          if (Number.isNaN(released.getTime())) return undefined
          const solvedDate = addDurationOffset(released, offset)
          return solvedDate ? solvedDate.toISOString() : undefined
        } catch {
          // One failing lookup must not break the whole sync.
          return undefined
        }
      })
    )
    solveDates.push(...batchResults)
    if (i + solveDateBatchSize < solved.length)
      await delay(solveDateBatchDelayMs)
    console.error(
      `  ${Math.min(i + solveDateBatchSize, solved.length)}/${solved.length}`
    )
  }

  const today = new Date().toISOString().slice(0, 10)

  return solved
    .map((challenge, index) => {
      const isoDate = solveDates[index]
      const date = isoDate?.slice(0, 10)
      return {
        name: challenge.name ?? "",
        url: challenge.url_name
          ? `https://app.hackthebox.com/challenges/${challenge.url_name}`
          : undefined,
        category:
          (challenge.challenge_category_id !== undefined
            ? categoryNames.get(challenge.challenge_category_id)
            : undefined) ?? "",
        // HTB occasionally reports solve dates in the future; treat those as
        // unknown rather than show something impossible.
        date: date && date <= today ? date : undefined
      }
    })
    .filter((challenge) => challenge.name.length > 0)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
}

// JSON.stringify drops undefined fields and escapes strings safely; Prettier
// then turns it into idiomatic TS in spliceIntoConstants.
function buildGeneratedBlock(data) {
  return [
    "// --- HTB Lab data (generated) ---",
    `export const hackTheBoxLabData: HtbLabData = ${JSON.stringify(data, null, 2)}`,
    "// --- end HTB Lab data ---"
  ].join("\n")
}

async function spliceIntoConstants(generatedBlock) {
  const startMarker = "// --- HTB Lab data (generated) ---"
  const endMarker = "// --- end HTB Lab data ---"

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
  const token = readToken()
  if (!token) {
    console.error(
      "HTB_APP_TOKEN not found (checked env, .env.local, .env, ../.env)"
    )
    process.exit(1)
  }

  console.error("Fetching profile...")
  const profileData = await htbGet(token, `/user/profile/basic/${apiId}`)
  const profile = profileData?.profile

  console.error("Fetching challenge progress...")
  const challengesData = await htbGet(
    token,
    `/user/profile/progress/challenges/${apiId}`
  )
  const challengeProfile = challengesData?.profile

  console.error("Fetching machine progress...")
  const machinesData = await htbGet(
    token,
    `/user/profile/progress/machines/${apiId}`
  )
  const machineProfile = machinesData?.profile

  const solvedChallenges = await fetchSolvedChallenges(token)

  const data = {
    lastUpdated: new Date().toISOString().slice(0, 10),
    rank: profile?.ranking ?? null,
    challengesSolved: challengeProfile?.challenge_owns?.solved ?? 0,
    challengesTotal: challengeProfile?.challenge_owns?.total ?? 0,
    machinesSolved: machineProfile?.machine_owns?.solved ?? 0,
    machinesTotal: machineProfile?.machine_owns?.total ?? 0,
    challengeCategories: normalizeBreakdown(
      challengeProfile?.challenge_categories
    ),
    solvedChallenges
  }

  await spliceIntoConstants(buildGeneratedBlock(data))

  console.error(
    `Done: rank #${data.rank}, ${data.challengesSolved}/${data.challengesTotal} challenges, ` +
      `${data.machinesSolved}/${data.machinesTotal} machines, ${data.solvedChallenges.length} solved entries.`
  )
  console.error(`Updated ${constantsPath}`)
}

main().catch((error) => {
  console.error("FAILED:", error)
  process.exit(1)
})
