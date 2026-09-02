# React rules

## Project structure

- `src/lib/` — logic portable across projects, copy-pastable without modification. No project-specific data/content.

- `src/constants/` — constants used across the project, ideally portable across projects with modification.

- `src/components/` — shared UI components. Create one only if used (or will be) by more than one page.

## Naming conventions

- File name: PascalCase in `components/`, camelCase everywhere else.

- Hooks: `useFooBar`, own file under `src/lib/hooks/`.

- Components: every component `FooBar` must type its props via a named `FooBarProps` interface.

## Import order

Group imports in this order, one blank line between each group:

1. Native libraries (Node built-ins: `fs`, `path`, ...)
2. `node_modules` packages
3. `@/components/`
4. `@/lib/`
5. `@/constants/`
6. Other non-type imports (relative imports, styles, ...)
7. Type imports (`import type ...`)

Split a combined value/type import (`import { foo, type Bar } from "..."`) into its own statement in group 7.

## Typing

- Objects and arrays must always be explicitly typed. `as const` suffices as typing.

## HTML

- Never render raw text as a direct child of a non-text element (`div`, `button`, `a`, ...). Always wrap it in a text tag (`h1`-`h6`, `p`, `span`, ...).
