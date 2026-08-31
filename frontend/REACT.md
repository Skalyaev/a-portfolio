# React rules

## Project structure

- `src/lib/` — logic portable across projects, copy-pastable without modification. No project-specific data/content.

- `src/constants/` — constants used across the project, ideally portable across projects with modification.

- `src/components/` — shared UI components. Create one only if used (or will be) by more than one page.

## Naming conventions

- File name: PascalCase in `components/`, camelCase everywhere else.

- Hooks: `useFooBar`, own file under `src/lib/hooks/`.
