import { getProjects } from "./_lib/getProjects"
import { ProjectsBrowser } from "./_components/ProjectsBrowser"

/**
 * Fetches the projects and renders the projects browser; `loading.tsx` is shown meanwhile.
 *
 * @returns The projects page content.
 */
export default async function ProjectsPage() {
  const projects = await getProjects()
  return <ProjectsBrowser projects={projects} />
}
