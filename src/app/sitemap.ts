import { navItems } from "@/constants/nav"
import { siteUrl } from "@/constants/site"

import type { MetadataRoute } from "next"

/**
 * Generates sitemap.xml from the navigation routes.
 *
 * @returns One absolute URL per route.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return navItems.map(({ href }) => ({
    url: new URL(href, siteUrl).toString()
  }))
}
