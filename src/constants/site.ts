export const siteUrl: string = process.env.DOMAIN
  ? `https://${process.env.DOMAIN}`
  : "http://localhost"
