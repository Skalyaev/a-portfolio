SHELL := /bin/bash

IMAGE := portfolio-frontend
CONTAINER := portfolio-frontend

.PHONY: dev prod build down code fmt lint typecheck data htb

dev:
	docker build --target dev -t $(IMAGE):dev .
	docker run --rm -it \
		--init \
		--name $(CONTAINER) \
		-p 3000:3000 \
		--env-file .env \
		-v $(CURDIR)/postcss.config.mjs:/home/node/workdir/postcss.config.mjs \
		-v $(CURDIR)/next-env.d.ts:/home/node/workdir/next-env.d.ts \
		-v $(CURDIR)/next.config.ts:/home/node/workdir/next.config.ts \
		-v $(CURDIR)/tsconfig.json:/home/node/workdir/tsconfig.json \
		-v $(CURDIR)/eslint.config.mjs:/home/node/workdir/eslint.config.mjs \
		-v $(CURDIR)/public:/home/node/workdir/public \
		-v $(CURDIR)/src:/home/node/workdir/src \
		$(IMAGE):dev

prod:
	docker build --target prod -t $(IMAGE):prod .
	docker run --rm -it \
		--init \
		--name $(CONTAINER) \
		-p 3000:3000 \
		--env-file .env \
		$(IMAGE):prod

build:
	docker build --target prod -t $(IMAGE):prod .

down:
	-docker stop $(CONTAINER)

code: fmt lint typecheck

fmt:
	npm run fmt

lint:
	npm run lint

typecheck:
	npm run typecheck

data: htb

htb:
	npm run htb:academy
	npm run htb:lab
