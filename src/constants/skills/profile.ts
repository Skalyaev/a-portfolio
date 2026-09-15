export interface PlatformProfile {
  name: string
  profileUrl: string
}

export interface ActivityEntry {
  name: string
  url?: string
  category: string
  date?: string
}

export interface CategoryProgress {
  name: string
  solved: number
  total: number
}
