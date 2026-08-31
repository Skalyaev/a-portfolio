SHELL := /bin/bash

DEV_CONTAINER := frontend-dev
PROD_CONTAINER := frontend-prod

.PHONY: dev prod build down code fmt lint typecheck

dev:
	docker compose up --build ${DEV_CONTAINER}

prod:
	docker compose up --build ${PROD_CONTAINER}

build:
	docker compose build ${PROD_CONTAINER}

down:
	docker compose down \
		${DEV_CONTAINER} ${PROD_CONTAINER}

code: fmt lint typecheck

fmt:
	npm run fmt

lint:
	npm run lint

typecheck:
	npm run typecheck
