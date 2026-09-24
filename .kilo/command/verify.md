---
description: Lint, type-check, and run integration tests
---

# Verify

Run the full verification pipeline and fix any failures:

```bash
pnpm lint
pnpm type-check
pnpm test:int
```

- Fix lint/type errors and test failures before considering the work done.
- Pre-commit (husky + lint-staged) already runs ESLint, Prettier, and `tsc --noEmit` on
  staged files at commit time — this command's job is full-project lint plus the
  integration tests, which are too slow for pre-commit.
- Run `pnpm test:e2e` only if UI flows changed in this work ($ARGUMENTS may scope or exclude it).
- Do not run `pnpm build` — it applies database migrations and is reserved for deploys.
