import { githubUsername } from "@/constants/github/projects"

import { getProjectCreations } from "./_lib/getProjectCreations"
import { HomeView } from "./_components/HomeView"

/**
 * Fetches the project creation dates and renders the home view; `loading.tsx` is shown meanwhile.
 *
 * @returns The home page content.
 */
export default async function Home() {
  const projects = await getProjectCreations()
  return (
    <HomeView
      projects={projects}
      githubProfileUrl={`https://github.com/${githubUsername}`}
    />
  )
}
