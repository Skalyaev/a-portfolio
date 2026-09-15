"use client"

import { ActivityFeed } from "./ActivityFeed"
import { Hero } from "./Hero"

import type { ProjectCreation } from "../_lib/getProjectCreations"

export interface HomeViewProps {
  projects: ProjectCreation[]
  githubProfileUrl: string
}

/**
 * Renders the home page body: introduction on the left, recent activity on the right.
 *
 * From `sm` upward, the two columns share the full available height and only the activity list
 * scrolls; below `sm` they stack and the page scrolls.
 *
 * @param props - Component props.
 * @param props.projects - Projects with their creation timestamp.
 * @param props.githubProfileUrl - URL of the GitHub profile, resolved on the server.
 * @returns The home view.
 */
export function HomeView({ projects, githubProfileUrl }: HomeViewProps) {
  return (
    <div className="flex flex-col gap-12 pb-6 sm:h-full sm:flex-row sm:gap-16 md:py-7">
      <div className="flex flex-col sm:w-2/5">
        <Hero githubProfileUrl={githubProfileUrl} />
      </div>
      <div className="flex min-h-0 flex-col sm:w-3/5">
        <ActivityFeed projects={projects} />
      </div>
    </div>
  )
}
