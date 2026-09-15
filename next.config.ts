import { maxTotalSizeBytes, megabyte } from "./src/constants/contact"

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: { position: "bottom-right" },
  experimental: {
    serverActions: { bodySizeLimit: maxTotalSizeBytes + megabyte }
  }
}
export default nextConfig
