# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.19.0-alpine3.24

#================================#
FROM node:${NODE_VERSION} AS base

USER node
WORKDIR /home/node/workdir

#================================#
FROM base AS deps

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

#================================#
FROM deps AS dev

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]

#================================#
FROM deps AS builder

ENV NODE_ENV=production

COPY postcss.config.mjs ./
COPY next.config.ts ./
COPY tsconfig.json ./

COPY public ./public
COPY src ./src

RUN --mount=type=secret,id=env,target=/home/node/workdir/.env,uid=1000 \
  npm run build

#================================#
FROM base AS prod

ENV NODE_ENV=production
# Docker sets HOSTNAME to the container ID, which server.js would otherwise listen on.
ENV HOSTNAME=0.0.0.0

COPY --from=builder \
  /home/node/workdir/public ./public

COPY --from=builder \
  /home/node/workdir/.next/static ./.next/static

COPY --from=builder \
  /home/node/workdir/.next/standalone ./

CMD ["node", "server.js"]
