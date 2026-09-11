import {
  fetchHtbChallenges,
  fetchHtbCompletedMachines,
  fetchHtbMachines,
  fetchHtbProfile,
  fetchHtbSolvedChallenges
} from "@/lib/hackthebox"

import {
  hackTheBoxAcademyModules,
  hackTheBoxApiId,
  hackTheBoxLabMachines
} from "@/constants/skills/hackthebox"
import { rootMeData } from "@/constants/skills/rootme"

import type {
  HtbActivityItem,
  HtbChallengeProgress,
  HtbMachineProgress,
  HtbProfile
} from "@/lib/hackthebox"
import type { RootMeData } from "@/constants/skills/rootme"

const revalidateSeconds = 3600

export interface HtbData {
  profile: HtbProfile | null
  challengeStats: HtbChallengeProgress
  machineStats: HtbMachineProgress
  solvedChallenges: HtbActivityItem[]
  completedMachines: HtbActivityItem[]
  academyModules: HtbActivityItem[]
}

export interface CyberSecurityData {
  htb: HtbData
  rootMe: RootMeData
}

export async function getCyberSecurity(): Promise<CyberSecurityData> {
  const [profile, challengeStats, machineStats, solvedChallenges, apiMachines] =
    await Promise.all([
      fetchHtbProfile(hackTheBoxApiId, revalidateSeconds),
      fetchHtbChallenges(hackTheBoxApiId, revalidateSeconds),
      fetchHtbMachines(hackTheBoxApiId, revalidateSeconds),
      fetchHtbSolvedChallenges(revalidateSeconds),
      fetchHtbCompletedMachines(revalidateSeconds)
    ])

  return {
    htb: {
      profile,
      challengeStats,
      machineStats,
      solvedChallenges,
      completedMachines: [...apiMachines, ...hackTheBoxLabMachines],
      academyModules: hackTheBoxAcademyModules
    },
    rootMe: rootMeData
  }
}
