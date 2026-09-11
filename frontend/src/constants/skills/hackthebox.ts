export interface HtbEntry {
  name: string
  url?: string
  date?: string
}

export const hackTheBoxProfileId = "01a089e9-5e12-7172-88bd-af8834d82d69"

export const hackTheBoxApiId = "1772537"

export const hackTheBoxProfile = {
  name: "HackTheBox Lab",
  profileUrl: `https://profile.hackthebox.com/profile/${hackTheBoxProfileId}`
}

export const hackTheBoxLabMachines: HtbEntry[] = []

export const hackTheBoxAcademyModules: HtbEntry[] = []
