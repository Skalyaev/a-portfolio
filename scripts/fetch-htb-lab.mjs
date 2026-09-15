/**
 * @file Refreshes the HTB Lab snapshot in `src/constants/skills/hackTheBoxLab.json`.
 *
 * The live HTB API is too rate-limit-flaky to call from the site at request
 * time, so the site reads a static snapshot refreshed with `npm run htb:lab`.
 *
 * Requires `HTB_APP_TOKEN`; `HTB_USER_ID` optionally overrides the account.
 */

import {
  fetchJson,
  requireEnv,
  run,
  todayIsoDate,
  writeConstantsJson
} from "./lib/htb.mjs"

const apiBase = "https://labs.hackthebox.com/api/v4"
const userId = process.env.HTB_USER_ID ?? "1772537"
const solveDateBatchSize = 5
const solveDateBatchDelayMs = 300

/**
 * Resolves after the given delay.
 *
 * @param ms - Delay in milliseconds.
 * @returns A promise resolved once the delay has elapsed.
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Calls an authenticated HTB Labs API endpoint.
 *
 * @param token - HTB app token.
 * @param endpoint - API path, starting with `/`.
 * @returns The parsed response body.
 * @throws When the request fails.
 */
function htbGet(token, endpoint) {
  return fetchJson(`${apiBase}${endpoint}`, {
    Authorization: `Bearer ${token}`
  })
}

/**
 * Normalizes a per-category progress breakdown, most solved first.
 *
 * @param entries - Raw category entries from the API.
 * @returns Categories with at least one item.
 */
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

/**
 * Adds an HTB duration such as `7M 24D 3H` (years, months, days, hours) to a date.
 *
 * HTB reports how long after release a challenge was solved rather than an
 * absolute date, so the solve date is the release date plus that offset.
 *
 * @param releaseDate - Challenge release date.
 * @param duration - HTB duration string.
 * @returns The shifted date, or `null` when the duration has no known unit.
 */
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

/**
 * Looks up the solve date of one challenge.
 *
 * A failing lookup resolves to `undefined` so it cannot break the whole sync.
 *
 * @param token - HTB app token.
 * @param challenge - Raw challenge entry from the list endpoints.
 * @returns The ISO solve date, or `undefined` when unknown.
 */
async function fetchSolveDate(token, challenge) {
  if (challenge.id === undefined || !challenge.release_date) return undefined
  try {
    const info = await htbGet(token, `/challenge/info/${challenge.id}`)
    const offset = info?.challenge?.authUserSolveTime
    const released = new Date(challenge.release_date)
    if (!offset || Number.isNaN(released.getTime())) return undefined
    return addDurationOffset(released, offset)?.toISOString().slice(0, 10)
  } catch {
    return undefined
  }
}

/**
 * Fetches every challenge solved by the user, most recent first.
 *
 * Solve dates reported in the future are treated as unknown.
 *
 * @param token - HTB app token.
 * @returns The solved challenges.
 */
async function fetchSolvedChallenges(token) {
  const [categoriesData, activeData, retiredData] = await Promise.all([
    htbGet(token, "/challenge/categories/list"),
    htbGet(token, "/challenge/list"),
    htbGet(token, "/challenge/list/owns")
  ])

  const categoryNames = new Map()
  for (const entry of categoriesData?.info ?? []) {
    if (entry.id !== undefined && entry.name) {
      categoryNames.set(entry.id, entry.name)
    }
  }

  const solved = [
    ...(activeData?.challenges ?? []),
    ...(retiredData?.challenges ?? [])
  ].filter((challenge) => challenge.authUserSolve)

  console.error(`Fetching solve dates for ${solved.length} challenges...`)
  const solveDates = []
  for (let i = 0; i < solved.length; i += solveDateBatchSize) {
    const batch = solved.slice(i, i + solveDateBatchSize)
    solveDates.push(
      ...(await Promise.all(
        batch.map((challenge) => fetchSolveDate(token, challenge))
      ))
    )
    console.error(
      `  ${Math.min(i + solveDateBatchSize, solved.length)}/${solved.length}`
    )
    if (i + solveDateBatchSize < solved.length) {
      await delay(solveDateBatchDelayMs)
    }
  }

  const today = todayIsoDate()

  return solved
    .map((challenge, index) => {
      const date = solveDates[index]
      return {
        name: challenge.name ?? "",
        url: challenge.url_name
          ? `https://app.hackthebox.com/challenges/${challenge.url_name}`
          : undefined,
        category: categoryNames.get(challenge.challenge_category_id) ?? "",
        date: date && date <= today ? date : undefined
      }
    })
    .filter((challenge) => challenge.name.length > 0)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
}

/**
 * Fetches the HTB Lab profile and writes the snapshot file.
 */
async function main() {
  const token = requireEnv("HTB_APP_TOKEN")

  console.error("Fetching profile and progress...")
  const [profileData, challengesData, machinesData] = await Promise.all([
    htbGet(token, `/user/profile/basic/${userId}`),
    htbGet(token, `/user/profile/progress/challenges/${userId}`),
    htbGet(token, `/user/profile/progress/machines/${userId}`)
  ])
  const challengeProfile = challengesData?.profile
  const machineProfile = machinesData?.profile

  const data = {
    lastUpdated: todayIsoDate(),
    rank: profileData?.profile?.ranking ?? null,
    challengesSolved: challengeProfile?.challenge_owns?.solved ?? 0,
    challengesTotal: challengeProfile?.challenge_owns?.total ?? 0,
    machinesSolved: machineProfile?.machine_owns?.solved ?? 0,
    machinesTotal: machineProfile?.machine_owns?.total ?? 0,
    challengeCategories: normalizeBreakdown(
      challengeProfile?.challenge_categories
    ),
    solvedChallenges: await fetchSolvedChallenges(token)
  }

  const filePath = await writeConstantsJson("hackTheBoxLab.json", data)

  console.error(
    `Done: rank #${data.rank ?? "?"}, ${data.challengesSolved}/${data.challengesTotal} challenges, ` +
      `${data.machinesSolved}/${data.machinesTotal} machines, ${data.solvedChallenges.length} solved entries.`
  )
  console.error(`Updated ${filePath}`)
}

run(main)
