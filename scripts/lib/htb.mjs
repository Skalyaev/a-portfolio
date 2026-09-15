/**
 * @file Helpers shared by the HackTheBox data refresh scripts.
 */

import { writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

import * as prettier from "prettier"

const requestTimeoutMs = 30_000

const constantsDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../src/constants/skills"
)

/**
 * Returns a required environment variable, exiting the process when unset.
 *
 * @param name - Variable name.
 * @returns The variable value.
 */
export function requireEnv(name) {
  const value = process.env[name]
  if (!value) {
    console.error(`${name} is not set (checked env and .env)`)
    process.exit(1)
  }
  return value
}

/**
 * Fetches and parses a JSON document.
 *
 * @param url - Absolute URL to fetch.
 * @param headers - Extra request headers.
 * @returns The parsed response body.
 * @throws When the request times out or answers with a non-2xx status.
 */
export async function fetchJson(url, headers) {
  const response = await fetch(url, {
    headers: { Accept: "application/json", ...headers },
    signal: AbortSignal.timeout(requestTimeoutMs)
  })
  if (!response.ok) {
    throw new Error(`${url} -> ${response.status} ${response.statusText}`)
  }
  return response.json()
}

/**
 * Returns the current UTC date as a `YYYY-MM-DD` string.
 *
 * @returns Today's ISO date.
 */
export function todayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

/**
 * Writes data as a Prettier-formatted JSON file into `src/constants/skills`.
 *
 * `JSON.stringify` drops undefined fields, so optional entries stay absent.
 *
 * @param fileName - Target file name, e.g. `hackTheBoxLab.json`.
 * @param data - Serializable data to write.
 * @returns The absolute path of the written file.
 */
export async function writeConstantsJson(fileName, data) {
  const filePath = path.join(constantsDir, fileName)
  const config = await prettier.resolveConfig(filePath)
  const formatted = await prettier.format(JSON.stringify(data), {
    ...config,
    filepath: filePath
  })
  writeFileSync(filePath, formatted)
  return filePath
}

/**
 * Runs a script entry point and exits with a failure code if it rejects.
 *
 * @param main - Async entry point.
 */
export function run(main) {
  main().catch((error) => {
    console.error("FAILED:", error)
    process.exit(1)
  })
}
