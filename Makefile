SHELL := /bin/bash

COMPOSE := docker compose

.PHONY: dev prod build down logs code fmt lint typecheck htb

dev:
	$(COMPOSE) --profile dev up --build

prod: build
	$(COMPOSE) --profile prod up -d

build:
	@grep -q '^DOMAIN=.' .env || { echo "DOMAIN must be set in .env"; exit 1; }
	@grep -q '^PROXY_PORT=.' .env || { echo "PROXY_PORT must be set in .env"; exit 1; }
	$(COMPOSE) --profile prod build

down:
	-$(COMPOSE) --profile dev --profile prod down --remove-orphans

logs:
	$(COMPOSE) --profile prod logs -f

code: fmt lint typecheck

fmt:
	npm run fmt

lint:
	npm run lint

typecheck:
	npm run typecheck

htb:
	npm run htb:academy
	npm run htb:lab
