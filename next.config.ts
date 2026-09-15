import { maxTotalSizeBytes, megabyte } from "./src/constants/contact"

import type { NextConfig } from "next"

const isDev = process.env.NODE_ENV !== "production"

// 'unsafe-eval' and the WebSocket connection are only needed by the dev server's hot reload.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'"
].join("; ")

const securityHeaders: { key: string; value: string }[] = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()"
  }
]

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  devIndicators: { position: "bottom-right" },
  experimental: {
    serverActions: { bodySizeLimit: maxTotalSizeBytes + megabyte }
  },
  /**
   * Applies the security headers to every route.
   *
   * @returns The header rules.
   */
  headers() {
    return Promise.resolve([{ source: "/:path*", headers: securityHeaders }])
  }
}
export default nextConfig
