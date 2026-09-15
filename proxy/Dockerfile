# syntax=docker/dockerfile:1

ARG NGINX_VERSION=1.30.4-alpine3.24

#================================#
FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS base

COPY default.conf /etc/nginx/conf.d/default.conf
