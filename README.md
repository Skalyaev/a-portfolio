# a-portfolio

Personal portfolio built with Next.js, served in production behind a shared Traefik reverse proxy.

## Stack

- **Next.js 16** (App Router, standalone output) / **React 19**
- **Tailwind CSS 4**
- **nodemailer** for the contact form
- **Docker** / **Docker Compose** (multi-stage build, non-root, nginx front proxy)

## Requirements

- Node.js 24
- Docker with the Compose plugin

## Environment

Create a `.env` file at the repository root:

| Variable                      | Required | Description                                                          |
| ----------------------------- | -------- | -------------------------------------------------------------------- |
| `DOMAIN`                      | prod     | Public host, e.g. `portfolio.skalyaev.com`                           |
| `PROXY_PORT`                  | prod     | Loopback port the nginx proxy binds to (`8081` prod, `8082` staging) |
| `GITHUB_USERNAME`             | yes      | GitHub login whose public repositories are listed                    |
| `GITHUB_TOKEN`                | yes      | GitHub token (read-only) to raise the API rate limit                 |
| `NEXT_PUBLIC_HTB_PROFILE_ID`  | yes      | Hack The Box public profile id                                       |
| `NEXT_PUBLIC_ROOTME_USERNAME` | yes      | Root-Me username                                                     |
| `HTB_APP_TOKEN`               | scripts  | Hack The Box API token, used by the `htb:*` scripts                  |
| `SMTP_HOST`                   | yes      | SMTP server host                                                     |
| `SMTP_PORT`                   | no       | SMTP port (default `587`; `465` enables implicit TLS)                |
| `SMTP_USER`                   | yes      | SMTP username                                                        |
| `SMTP_PASS`                   | yes      | SMTP password                                                        |
| `SMTP_FROM`                   | no       | From address (defaults to `SMTP_USER`)                               |
