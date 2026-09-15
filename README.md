# a-portfolio

Personal portfolio built with Next.js, served in production behind a shared
[Traefik](https://github.com/Skalyaev/some-private-files) reverse proxy.

## Stack

- **Next.js 16** (App Router, standalone output) / **React 19**
- **Tailwind CSS 4**
- **nodemailer** for the contact form
- **Docker** / **Docker Compose** (multi-stage build, non-root, nginx front proxy)

## Requirements

- Node.js 24
- Docker with the Compose plugin

## Environment

Create a `.env` file at the repository root (never committed):

| Variable | Required | Description |
| --- | --- | --- |
| `DOMAIN` | prod | Public host, e.g. `portfolio.skalyaev.com` |
| `PROXY_PORT` | prod | Loopback port the nginx proxy binds to (`8081` prod, `8082` staging) |
| `GITHUB_USERNAME` | yes | GitHub login whose public repositories are listed |
| `GITHUB_TOKEN` | yes | GitHub token (read-only) to raise the API rate limit |
| `NEXT_PUBLIC_HTB_PROFILE_ID` | yes | Hack The Box public profile id |
| `NEXT_PUBLIC_ROOTME_USERNAME` | yes | Root-Me username |
| `HTB_APP_TOKEN` | scripts | Hack The Box API token, used by the `htb:*` scripts |
| `SMTP_HOST` | yes | SMTP server host |
| `SMTP_PORT` | no | SMTP port (default `587`; `465` enables implicit TLS) |
| `SMTP_USER` | yes | SMTP username |
| `SMTP_PASS` | yes | SMTP password |
| `SMTP_FROM` | no | From address (defaults to `SMTP_USER`) |
| `CONTACT_EMAIL` | yes | Where contact messages are delivered |

## Commands

| Command | Description |
| --- | --- |
| `make dev` | Development stack with hot reload, reachable on `http://localhost` |
| `make prod` | Build and start the production stack in the background |
| `make down` | Stop every stack |
| `make logs` | Follow the production logs |
| `make code` | Format, lint and type-check |
| `make htb` | Refresh the Hack The Box data files |

## Production architecture

```
Internet ─► Traefik (:443, TLS) ─► nginx (127.0.0.1:PROXY_PORT) ─► Next.js (:3000)
```

- The production proxy binds to the loopback only; the host Traefik is the sole
  entry point and terminates TLS.
- nginx trusts the client IP forwarded by Traefik and passes it to the contact
  form rate limiter.

## Deployment (CI/CD)

Three branches, deployed to a single VPS:

- `dev` — default branch, integration work (no deployment).
- `staging` — deployed to `staging.portfolio.skalyaev.com` (IP-restricted).
- `prod` — deployed to `portfolio.skalyaev.com`.

Workflows:

- **CI** (`.github/workflows/ci.yml`) runs on every pull request to `dev`,
  `staging` and `prod`: format check, lint, type-check and a production image build.
- **Deploy** (`.github/workflows/deploy.yml`) runs on push to `staging` and `prod`.
  It connects over SSH to the matching VPS user, whose key is restricted to a
  forced command that pulls the branch and rebuilds.

Flow: `dev` → PR → `staging` → PR → `prod`.
