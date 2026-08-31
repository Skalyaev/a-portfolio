# syntax=docker/dockerfile:1

ARG ALPINE_VERSION=3.24.1

#================================#
FROM alpine:${ALPINE_VERSION} AS base

RUN addgroup -g 1000 -S alpine && \
  adduser -S -u 1000 -G alpine alpine

USER alpine
WORKDIR /home/alpine/workdir

#================================#
FROM base AS dev

CMD ["tail", "-f", "/dev/null"]

#================================#
FROM base AS prod

CMD ["tail", "-f", "/dev/null"]
