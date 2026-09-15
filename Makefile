SHELL := /bin/bash

COMPOSE := docker compose

.PHONY: dev prod build down code fmt lint typecheck htb

dev:
	$(COMPOSE) --profile dev up --build

prod: build
	$(COMPOSE) --profile prod up

build:
	$(COMPOSE) --profile prod build

down:
	-$(COMPOSE) --profile dev --profile prod down

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
