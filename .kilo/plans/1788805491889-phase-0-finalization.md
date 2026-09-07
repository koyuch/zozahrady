# Phase 0 Finalization — Fix locale module, verify build, final commit

## Goal

Close out the three remaining Phase 0 items from the work status:

1. Fix the Next.js build error caused by `'use server'` in `src/lib/locale.ts`.
2. Verify `pnpm build` exits with code 0.
3. Create the final commit: `chore: initial Phase 0 scaffold`.

## Root Cause

`src/lib/locale.ts` has `'use server'` at the top but exports non-async values
(`LOCALES`, `DEFAULT_LOCALE`, `LOCALE_COOKIE_NAME`, types `Locale`,
`LocaleConfig`). In Next.js App Router, a `'use server'` module may **only
export async functions**, so Turbopack reports
`Export LOCALES doesn't exist in target module`.

**Additional constraint (not in the work status):**
`src/components/navbar/LocaleSwitcher.tsx` is a **client component**
(`'use client'`) that imports `LOCALES` and `setLocaleAction` from
`@/lib/locale`. Simply deleting `'use server'` is **not sufficient** — a module
that imports `next/headers` (needed by `getLocale`) cannot be pulled into the
client bundle. Therefore the fix must be a three-way module split, not a
one-line deletion.

## Current Import Sites (4 files)

| File                                       | Type             | Imports from `@/lib/locale`            |
| ------------------------------------------ | ---------------- | -------------------------------------- |
| `src/components/navbar/Navbar.tsx`         | Server component | `Locale`, `getLocale`                  |
| `src/components/navbar/LocaleSwitcher.tsx` | Client component | `Locale`, `LOCALES`, `setLocaleAction` |
| `src/app/(frontend)/page.tsx`              | Server component | `getLocale`, `LOCALES`                 |
| `src/app/(frontend)/layout.tsx`            | Server component | `getLocale`, `LOCALES`                 |

No other files import from `@/lib/locale` (verified via grep).

## Task List

### Task 1 — Split the locale module into three modules

**1a. [MODIFY] `src/lib/locale.ts`** — shared, framework-agnostic module.
Keep ONLY the pure type/constant exports; remove `'use server'`, remove the
`next/headers` import, and remove both functions:

- `export type Locale = 'sk_eur' | 'cz_czk'`
- `export interface LocaleConfig { ... }` (unchanged)
- `export const DEFAULT_LOCALE: Locale = 'sk_eur'`
- `export const LOCALE_COOKIE_NAME = 'zozahrady_locale'`
- `export const LOCALES: Record<Locale, LocaleConfig> = { ... }` (unchanged)

This file must transitively import nothing server-only, so it is safe in both
client and server bundles.

**1b. [NEW] `src/lib/locale-server.ts`** — server-only data read.

```ts
import { cookies } from 'next/headers'

import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE_NAME } from './locale'
import type { Locale } from './locale'

export async function getLocale(): Promise<Locale> {
  // body moved verbatim from the old locale.ts
}
```

Do NOT put `'use server'` here (it is not an action; it is a server-only
helper read by server components). Optional hardening: add
`import 'server-only'` at the top — requires `pnpm add server-only`; treat as
optional, not blocking.

**1c. [NEW] `src/lib/locale-actions.ts`** — server actions module.

```ts
'use server'

import { cookies } from 'next/headers'

import { LOCALES, LOCALE_COOKIE_NAME } from './locale'
import type { Locale } from './locale'

export async function setLocaleAction(locale: Locale): Promise<void> {
  // body moved verbatim from the old locale.ts
}
```

This file must export ONLY async functions (currently just
`setLocaleAction`), satisfying the `'use server'` constraint.

### Task 2 — Update the four import sites

- `src/components/navbar/Navbar.tsx`:
  `import type { Locale } from '@/lib/locale'` +
  `import { getLocale } from '@/lib/locale-server'`
- `src/components/navbar/LocaleSwitcher.tsx`:
  `import { LOCALES, type Locale } from '@/lib/locale'` +
  `import { setLocaleAction } from '@/lib/locale-actions'`
- `src/app/(frontend)/page.tsx`:
  `import { LOCALES } from '@/lib/locale'` +
  `import { getLocale } from '@/lib/locale-server'`
- `src/app/(frontend)/layout.tsx`: same split as `page.tsx`.

No logic changes anywhere — imports only. Do **not** create a barrel file that
re-exports all three modules: it would re-pull `next/headers` into the client
bundle through the shared entry point.

### Task 3 — Verification (must pass before committing)

Run from the repo root (direnv/`use flake` provides Node 26 + pnpm):

1. `pnpm type-check` (`tsc --noEmit`) — exit 0.
2. `pnpm lint` — exit 0.
3. `pnpm build` — **must exit 0**; this is the failing check being fixed.
   Confirm no `'use server'` export errors and no `next/headers`-in-client
   errors remain.

Optional manual smoke (can defer to post-Phase-0): `pnpm dev`, load
`http://localhost:3000`, click the SK/€ ↔ CZ/Kč toggle, confirm the
`zozahrady_locale` cookie is set and prices re-render.

### Task 4 — Final commit

```bash
git add -A
git commit -m "chore: initial Phase 0 scaffold"
```

Notes:

- The husky pre-commit hook runs lint-staged (eslint --fix, prettier --write,
  `tsc --noEmit`) — it should pass cleanly after Tasks 1–3; do not bypass it.
- The initial plan also listed `git push -u origin main`. Push is optional for
  Phase 0 closure and requires explicit user confirmation at execution time;
  the commit itself is the required deliverable.

## Files Touched

- Modify: `src/lib/locale.ts`, `src/components/navbar/Navbar.tsx`,
  `src/components/navbar/LocaleSwitcher.tsx`,
  `src/app/(frontend)/page.tsx`, `src/app/(frontend)/layout.tsx`
- Create: `src/lib/locale-server.ts`, `src/lib/locale-actions.ts`

## Risks / Rollback

- Risk: a missed `setLocaleAction` call site outside the four known files.
  Mitigation: `grep -rn "@/lib/locale" src` after editing must show only the
  new import shapes; `tsc --noEmit` catches any miss statically.
- Rollback: working tree is currently clean at `966c5e0`; if verification
  fails, `git checkout -- src` restores the pre-fix state.
