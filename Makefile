SHELL := /bin/bash

FRONTEND_DIR := frontend
BACKEND_DIR := backend

.PHONY: dev prod build down code fmt lint typecheck

dev:
	docker compose --profile dev up --build

prod:
	docker compose --profile prod up --build

build:
	docker compose --profile prod build

down:
	docker compose --profile '*' down

code: fmt lint typecheck

fmt:
	$(MAKE) -C $(FRONTEND_DIR) fmt
	$(MAKE) -C $(BACKEND_DIR) fmt

lint:
	$(MAKE) -C $(FRONTEND_DIR) lint
	$(MAKE) -C $(BACKEND_DIR) lint

typecheck:
	$(MAKE) -C $(FRONTEND_DIR) typecheck
	$(MAKE) -C $(BACKEND_DIR) typecheck
