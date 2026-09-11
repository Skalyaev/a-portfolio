export interface HtbProfile {
  name: string
  rankName: string
  globalRank: number | null
  points: number
  userOwns: number
  systemOwns: number
  avatarUrl: string | null
}

export interface HtbBreakdown {
  name: string
  solved: number
  total: number
  percent: number
}

export interface HtbChallengeProgress {
  solved: number
  total: number
  percent: number
  categories: HtbBreakdown[]
  difficulties: HtbBreakdown[]
}

export interface HtbMachineProgress {
  solved: number
  total: number
  percent: number
  difficulties: HtbBreakdown[]
  operatingSystems: HtbBreakdown[]
}

export interface HtbActivityItem {
  name: string
  url?: string
  date?: string
  category?: string
}

interface RawHtbProfileResponse {
  profile?: {
    name?: string
    rank?: string
    ranking?: number
    points?: number
    user_owns?: number
    system_owns?: number
    avatar?: string
  }
}

interface RawHtbBreakdownEntry {
  name?: string
  owned_flags?: number
  total_flags?: number
  owned_machines?: number
  total_machines?: number
  owned_challenges?: number
  total_challenges?: number
  completion_percentage?: number
}

interface RawHtbChallengesResponse {
  profile?: {
    challenge_owns?: { solved?: number; total?: number; percentage?: number }
    challenge_categories?: RawHtbBreakdownEntry[]
    challenge_difficulties?: RawHtbBreakdownEntry[]
  }
}

interface RawHtbMachinesResponse {
  profile?: {
    machine_owns?: {
      solved?: number
      total?: number
      completion_percentage?: number
    }
    machine_difficulties?: RawHtbBreakdownEntry[]
    machine_os?: RawHtbBreakdownEntry[]
  }
}

interface RawHtbMachineListEntry {
  id?: number
  name?: string
  authUserInUserOwns?: boolean
  authUserInRootOwns?: boolean
}

interface RawHtbMachineListResponse {
  data?: RawHtbMachineListEntry[]
}

interface RawHtbChallengeListEntry {
  name?: string
  url_name?: string
  authUserSolve?: boolean
  category_name?: string
}

interface RawHtbChallengeListResponse {
  challenges?: RawHtbChallengeListEntry[]
}

const htbApiBase = "https://labs.hackthebox.com/api/v4"

async function htbGet<T>(
  path: string,
  revalidateSeconds: number
): Promise<T | null> {
  const token = process.env.HTB_APP_TOKEN
  if (!token) return null

  try {
    const response = await fetch(`${htbApiBase}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      },
      next: { revalidate: revalidateSeconds }
    })
    if (!response.ok) return null

    return (await response.json()) as T
  } catch {
    return null
  }
}

function normalizeBreakdown(
  entries: RawHtbBreakdownEntry[] | undefined
): HtbBreakdown[] {
  if (!Array.isArray(entries)) return []

  return entries.map((entry) => ({
    name: entry.name ?? "",
    solved: entry.owned_flags ?? entry.owned_machines ?? entry.owned_challenges ?? 0,
    total: entry.total_flags ?? entry.total_machines ?? entry.total_challenges ?? 0,
    percent: entry.completion_percentage ?? 0
  }))
}

export async function fetchHtbProfile(
  id: string,
  revalidateSeconds: number
): Promise<HtbProfile | null> {
  const data = await htbGet<RawHtbProfileResponse>(
    `/user/profile/basic/${id}`,
    revalidateSeconds
  )
  const profile = data?.profile
  if (!profile) return null

  return {
    name: profile.name ?? "",
    rankName: profile.rank ?? "",
    globalRank: profile.ranking ?? null,
    points: profile.points ?? 0,
    userOwns: profile.user_owns ?? 0,
    systemOwns: profile.system_owns ?? 0,
    avatarUrl: profile.avatar ?? null
  }
}

export async function fetchHtbChallenges(
  id: string,
  revalidateSeconds: number
): Promise<HtbChallengeProgress> {
  const data = await htbGet<RawHtbChallengesResponse>(
    `/user/profile/progress/challenges/${id}`,
    revalidateSeconds
  )
  const profile = data?.profile

  return {
    solved: profile?.challenge_owns?.solved ?? 0,
    total: profile?.challenge_owns?.total ?? 0,
    percent: profile?.challenge_owns?.percentage ?? 0,
    categories: normalizeBreakdown(profile?.challenge_categories),
    difficulties: normalizeBreakdown(profile?.challenge_difficulties)
  }
}

export async function fetchHtbMachines(
  id: string,
  revalidateSeconds: number
): Promise<HtbMachineProgress> {
  const data = await htbGet<RawHtbMachinesResponse>(
    `/user/profile/progress/machines/${id}`,
    revalidateSeconds
  )
  const profile = data?.profile

  return {
    solved: profile?.machine_owns?.solved ?? 0,
    total: profile?.machine_owns?.total ?? 0,
    percent: profile?.machine_owns?.completion_percentage ?? 0,
    difficulties: normalizeBreakdown(profile?.machine_difficulties),
    operatingSystems: normalizeBreakdown(profile?.machine_os)
  }
}

export async function fetchHtbCompletedMachines(
  revalidateSeconds: number
): Promise<HtbActivityItem[]> {
  const data = await htbGet<RawHtbMachineListResponse>(
    "/machine/paginated?retired=0&per_page=50",
    revalidateSeconds
  )
  if (!Array.isArray(data?.data)) return []

  return data.data
    .filter((machine) => machine.authUserInUserOwns || machine.authUserInRootOwns)
    .map((machine) => ({
      name: machine.name ?? "",
      url: `https://app.hackthebox.com/machines/profile/${machine.id}`
    }))
    .filter((machine) => machine.name.length > 0)
}

export async function fetchHtbSolvedChallenges(
  revalidateSeconds: number
): Promise<HtbActivityItem[]> {
  const data = await htbGet<RawHtbChallengeListResponse>(
    "/challenge/list/owns",
    revalidateSeconds
  )
  if (!Array.isArray(data?.challenges)) return []

  return data.challenges
    .filter((challenge) => challenge.authUserSolve)
    .map((challenge) => ({
      name: challenge.name ?? "",
      url: challenge.url_name
        ? `https://app.hackthebox.com/challenges/${challenge.url_name}`
        : undefined,
      category: challenge.category_name ?? undefined
    }))
    .filter((challenge) => challenge.name.length > 0)
}
