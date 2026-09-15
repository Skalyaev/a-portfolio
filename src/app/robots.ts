import { siteUrl } from "@/constants/site"

import type { MetadataRoute } from "next"

/**
 * Generates robots.txt, allowing every crawler and pointing to the sitemap.
 *
 * @returns The robots rules.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`
  }
}
