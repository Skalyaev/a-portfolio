import { groupByKeys } from "@/lib/utils/collection"

import { diploma } from "@/constants/education/diploma"
import { experiences } from "@/constants/experience/experiences"
import {
  hackTheBoxAcademyData,
  hackTheBoxLabData
} from "@/constants/skills/hackthebox"
import { rootMeSolvedChallenges } from "@/constants/skills/rootme"

import type { ProjectCreation } from "./getProjectCreations"
import type { Experience } from "@/constants/experience/experiences"
import type { ActivityEntry } from "@/constants/skills/profile"

export type ActivityFilter = "projects" | "career" | "cybersecurity"

export const activityFilters: ActivityFilter[] = [
  "projects",
  "career",
  "cybersecurity"
]

export type CyberPlatform = "hackTheBoxLab" | "hackTheBoxAcademy" | "rootMe"

type DatePrecision = "day" | "month"

interface ActivityBase {
  id: string
  date: string
  datePrecision: DatePrecision
  upcoming: boolean
  href: string
  external: boolean
}

interface ProjectActivity extends ActivityBase {
  kind: "projectCreated"
  names: string[]
}

interface ExperienceActivity extends ActivityBase {
  kind: "experienceStarted" | "experienceEnded"
  experience: Experience
}

interface DiplomaActivity extends ActivityBase {
  kind: "diplomaAwarded"
}

interface CyberActivity extends ActivityBase {
  kind: "challengeSolved" | "moduleCompleted"
  platform: CyberPlatform
  names: string[]
}

export type Activity =
  ProjectActivity | ExperienceActivity | DiplomaActivity | CyberActivity

/**
 * Tells whether a date is still to come.
 *
 * @param date - ISO date to check.
 * @param now - Current timestamp, in milliseconds.
 * @returns Whether `date` is after `now`.
 */
function isUpcoming(date: string, now: number): boolean {
  return new Date(date).getTime() > now
}

/**
 * Builds one activity per project creation day, grouping the projects created the same day.
 *
 * @param projects - Projects with their creation timestamp.
 * @param now - Current timestamp, in milliseconds.
 * @returns The project activities; a group links to the projects page, a single project to its repository.
 */
function toProjectActivities(
  projects: ProjectCreation[],
  now: number
): ProjectActivity[] {
  const groups = groupByKeys(projects, (project) => [
    project.createdAt.slice(0, 10)
  ])

  return Object.entries(groups).flatMap(([date, group]): ProjectActivity[] => {
    if (!group) return []
    const single = group.length === 1 ? group[0] : null
    return [
      {
        id: `project-${date}`,
        kind: "projectCreated",
        date,
        datePrecision: "day",
        upcoming: isUpcoming(date, now),
        names: group.map((project) => project.name),
        href: single ? single.htmlUrl : "/projects",
        external: single !== null
      }
    ]
  })
}

/**
 * Builds the start of every experience and the end of those already over.
 *
 * Starts come first so that, on a shared month, a new position is listed above the previous one's end.
 *
 * @param now - Current timestamp, in milliseconds.
 * @returns The experience activities, each linking to its card.
 */
function toExperienceActivities(now: number): ExperienceActivity[] {
  const starts = experiences.map((experience): ExperienceActivity => ({
    id: `experience-start-${experience.id}`,
    kind: "experienceStarted",
    experience,
    date: experience.startDate,
    datePrecision: "month",
    upcoming: isUpcoming(experience.startDate, now),
    href: `/experience#${experience.id}`,
    external: false
  }))
  const ends = experiences
    .filter((experience) => !isUpcoming(experience.endDate, now))
    .map((experience): ExperienceActivity => ({
      id: `experience-end-${experience.id}`,
      kind: "experienceEnded",
      experience,
      date: experience.endDate,
      datePrecision: "month",
      upcoming: false,
      href: `/experience#${experience.id}`,
      external: false
    }))

  return [...starts, ...ends]
}

/**
 * Builds one activity per date for a cybersecurity platform, grouping the entries of the same date.
 *
 * Undated entries are skipped.
 *
 * @param entries - Solved challenges or completed modules.
 * @param platform - Platform the entries come from.
 * @param kind - Kind of the built activities.
 * @param datePrecision - Precision of the entry dates.
 * @param now - Current timestamp, in milliseconds.
 * @returns The activities; a group links to the skills page, a single entry to its own page.
 */
function toCyberActivities(
  entries: ActivityEntry[],
  platform: CyberPlatform,
  kind: CyberActivity["kind"],
  datePrecision: DatePrecision,
  now: number
): CyberActivity[] {
  const groups = groupByKeys(entries, (entry) =>
    entry.date ? [entry.date] : []
  )

  return Object.entries(groups).flatMap(([date, group]): CyberActivity[] => {
    if (!group) return []
    const singleUrl = group.length === 1 ? group[0].url : undefined
    return [
      {
        id: `${platform}-${date}`,
        kind,
        platform,
        date,
        datePrecision,
        upcoming: isUpcoming(date, now),
        names: group.map((entry) => entry.name),
        href: singleUrl ?? "/skills",
        external: singleUrl !== undefined
      }
    ]
  })
}

/**
 * Gathers projects, career milestones and cybersecurity progress into a single timeline.
 *
 * @param projects - Projects with their creation timestamp.
 * @returns The activities, most recent first, upcoming ones on top.
 */
export function buildActivities(projects: ProjectCreation[]): Activity[] {
  const now = Date.now()

  const activities: Activity[] = [
    ...toExperienceActivities(now),
    {
      id: "diploma",
      kind: "diplomaAwarded",
      date: diploma.awardDate,
      datePrecision: "day",
      upcoming: isUpcoming(diploma.awardDate, now),
      href: "/education",
      external: false
    },
    ...toProjectActivities(projects, now),
    ...toCyberActivities(
      hackTheBoxLabData.solvedChallenges,
      "hackTheBoxLab",
      "challengeSolved",
      "day",
      now
    ),
    ...toCyberActivities(
      hackTheBoxAcademyData.modules,
      "hackTheBoxAcademy",
      "moduleCompleted",
      "day",
      now
    ),
    ...toCyberActivities(
      rootMeSolvedChallenges,
      "rootMe",
      "challengeSolved",
      "month",
      now
    )
  ]

  return activities.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/**
 * Returns the filter an activity belongs to.
 *
 * @param activity - Activity to classify.
 * @returns The matching filter.
 */
export function getActivityFilter(activity: Activity): ActivityFilter {
  switch (activity.kind) {
    case "projectCreated":
      return "projects"
    case "experienceStarted":
    case "experienceEnded":
    case "diplomaAwarded":
      return "career"
    case "challengeSolved":
    case "moduleCompleted":
      return "cybersecurity"
  }
}
