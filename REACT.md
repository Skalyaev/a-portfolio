# React rules

## Structure

- `src/lib/` — portable logic, copy-pastable as is. No project data.
- `src/lib/hooks/` — one hook `useFooBar` per file.
- `src/constants/` — project constants, portable with modification.
- `src/components/` — UI used (or soon used) by several routes.
- `src/app/<route>/_components/`, `src/app/<route>/_lib/` — code used by a single route.

## Naming

- Files: PascalCase for components, camelCase otherwise.
- Component `FooBar` types its props with a named `FooBarProps` interface.
- Constants: camelCase, module-level ones included.

## Imports

Groups in this order, separated by one blank line:

1. Node built-ins
2. `node_modules` packages
3. `@/components/`
4. `@/lib/`
5. `@/constants/`
6. Other value imports (relative, styles)
7. `import type` statements (split combined value/type imports)

## Server / client

- Pages and layouts stay server components: fetch data in the `async` page, `loading.tsx` shows meanwhile.
- `"use client"` only on the client entry imported by a server file; what it imports is client already.
- Client components import static constants directly; props only carry server-fetched data.

## Typing

- Explicitly type objects and arrays.
- No `as` cast to skip a check: narrow with a type guard or `find`.
- Props get the narrowest type actually passed; no optional prop or default that no caller uses.

## Code

- Logic repeated across files goes into a hook, a `_lib/` helper or a component.
- Format date-only ISO strings with `timeZone: "UTC"` (avoids shifted days and hydration mismatches).

## Comments

- JSDoc on every function — components, hooks, helpers, inner handlers: one-line summary; add a paragraph only for non-obvious behavior.
- Tags: `@param` per parameter (`props`, plus `props.foo` when useful), `@returns` unless `void`, `@throws` if it throws. No types in tags.
- English only.
- No non-JSDoc comments.

## HTML

- Wrap raw text in a text tag (`h1`-`h6`, `p`, `span`), never directly in `div`, `button`, `a`...
- Valid nesting: no block element (`div`, `p`) inside `span`, `p` or `button`.
