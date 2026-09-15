import hackTheBoxAcademyJson from "@/constants/skills/hackTheBoxAcademy.json"
import hackTheBoxLabJson from "@/constants/skills/hackTheBoxLab.json"

import type {
  ActivityEntry,
  CategoryProgress,
  PlatformProfile
} from "@/constants/skills/profile"

interface HtbAcademyData {
  lastUpdated: string
  categories: CategoryProgress[]
  modules: ActivityEntry[]
}

interface HtbLabData {
  lastUpdated: string
  rank: number | null
  challengesSolved: number
  challengesTotal: number
  machinesSolved: number
  machinesTotal: number
  challengeCategories: CategoryProgress[]
  solvedChallenges: ActivityEntry[]
}

const hackTheBoxProfileId =
  process.env.NEXT_PUBLIC_HTB_PROFILE_ID ??
  "01a089e9-5e12-7172-88bd-af8834d82d69"

const hackTheBoxProfileUrl = `https://profile.hackthebox.com/profile/${hackTheBoxProfileId}`

export const hackTheBoxLab: PlatformProfile = {
  name: "HackTheBox - Lab",
  profileUrl: hackTheBoxProfileUrl
}

export const hackTheBoxAcademy: PlatformProfile = {
  name: "HackTheBox - Academy",
  profileUrl: hackTheBoxProfileUrl
}

export const hackTheBoxAcademyData: HtbAcademyData = hackTheBoxAcademyJson

export const hackTheBoxLabData: HtbLabData = hackTheBoxLabJson
