# AGENTS.md

Shared rules for all AI agents working in this repo (Kilo, Claude Code via `CLAUDE.md` pointer, etc.).
Human setup detail lives in [README.md](README.md); on-demand deep docs live in `.agents/skills/*/SKILL.md` (Neon, Payload) and their `reference/` dirs — load them only when the task touches that topic.

## Tech Stack & Environment

- **Framework:** Next.js (App Router) — always install with `@latest`
- **CMS / Backend:** Payload CMS v3.x (running natively inside Next.js)
- **Database:** PostgreSQL (Neon.tech serverless for prod, local Postgres via Nix shell)
- **Styling:** Tailwind CSS + shadcn/ui (centralized CSS variables)
- **Package Manager:** `pnpm` (enforced via corepack and package.json)
- **Runtime:** Node.js v24 LTS (`.nvmrc` + NixOS `flake.nix`; matches Vercel's default runtime)
- **Pre-commit:** Husky + lint-staged (ESLint, Prettier, `tsc --noEmit`)
- **Pre-push:** Husky (`pnpm test:int`)

## Dependency Management

- NEVER use hardcoded or outdated npm package versions from training data — Next.js 16, Payload 3.x, and Tailwind 4 are all newer than training cutoffs; verify current APIs (Context7 MCP is configured for this).
- Always append `@latest` when installing packages (e.g., `pnpm add package@latest`).

## Workflow Commands

Shell tools (`pnpm`, `node`) come from the local Nix flake. If your shell doesn't have them,
load the dev environment first: `eval "$(direnv export bash)" && <command>` (with optional "prefix" `direnv allow &&` - if needed after .envrc change/ copying to new directory).

If a specific tool is missing from the flake, either add it to `flake.nix` (when it's useful
for future sessions too) or run it one-off via `nix shell nixpkgs#<tool> -c <command>`.

```bash
pnpm dev          # dev server (long-running, don't run without asking)
pnpm build        # payload migrate && next build (applies migrations!)
pnpm check        # canonical full check: lint + type-check + prettier --check (what CI runs)
pnpm lint         # ESLint
pnpm type-check   # tsc --noEmit
pnpm test         # test:int && test:e2e
pnpm test:int     # vitest integration tests
pnpm test:e2e     # Playwright e2e (also runs in CI on UI-path changes)
pnpm seed         # mock data — writes to whatever DATABASE_URI points at
pnpm payload migrate / migrate:status / migrate:create <name>
```

### Auto-triggered checks (don't re-run manually)

These run automatically on git events or in CI — do NOT run them again per-session:

| Trigger                                           | Runs                                                                 |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| `pre-commit` (lint-staged)                        | `eslint --fix`, `prettier --write`, `tsc --noEmit` (on staged files) |
| `pre-push`                                        | `pnpm test:int`                                                      |
| GH Actions CI (`main` push + every PR)            | `pnpm check`, `pnpm payload migrate`, `pnpm test:int`                |
| GH Actions e2e (`main` push + PRs, UI paths only) | `pnpm payload migrate`, `pnpm seed`, `pnpm test:e2e`                 |

Only run these manually when fixing a hook/CI failure in something you just changed.

## Database Migrations & Deploys

- Schema evolution MUST use Payload migrations: change collections/config in code, then
  `pnpm payload migrate:create <name>` → **review the generated SQL** in `src/migrations/` →
  `pnpm payload migrate`. Commit migration files together with the config changes.
- `src/payload-types.ts` is **generated** (`pnpm payload generate:types`; Payload also regenerates it on
  dev/test runs). Never hand-edit it; it's excluded from lint/format. When it changes, review the diff
  and commit it together with the schema/config change (or Payload version bump) that caused it.
- NEVER use `payload push` against a shared/production database — it bypasses review and history and can drop data.
- Keep `payload migrate` in the `build` script ahead of `next build` — Vercel applies pending
  migrations on every deploy, so schema changes roll out with the code.
- If `payload_migrations` contains a `dev` row (batch `-1`) from an earlier dev `push`,
  `payload migrate` prompts and skips in CI — delete that row before deploying new migrations.
- **Production DB:** Neon `production` branch of project `green-forest-59995045` (see `.neon`),
  database `zozahrady`; its connection string lives only in Vercel env vars.
- Fresh Neon branches start with an empty schema: rebuild with `pnpm payload migrate`
  (+ `pnpm seed` if mock data is wanted).

## Theme & Styling

- All design tokens MUST be defined as CSS variables in `src/app/globals.css` (shadcn/ui convention).
- NEVER hardcode hex colors in component utility classes.
- Initial theme (Botanical): `--background` off-white `#FAF9F6`, `--primary` sage green `#4A5D23`, `--foreground` charcoal `#1F2937`; fonts: Playfair Display (headings), Inter (body/UI).

## Localization

- Payload-native localization: `localization: { locales: ['sk', 'cs'], defaultLocale: 'sk' }` in `payload.config.ts` (fallback to `sk` for untranslated fields).
- Frontend cookie locale `sk_eur` / `cz_czk` maps to Payload locales `sk` / `cs` via `toPayloadLocale()` in `src/lib/pages.ts` (`LOCALES[].lang` is already the Payload code).
- Localized content: Pages (incl. block texts) and Bouquets (`title`, `description`). Reviews are NOT localized (user-generated). UI micro-labels keep `isSk` ternaries.

## Payload Collections (schema summary)

1. **Pages** — localized `title`, `menuLabel`, `seoTitle`, `seoDescription`; shared `slug` (unique, one URL per page), `heroImage`, `showInMenu`, `menuOrder`; `layout` blocks field (shared structure, localized inner texts) with blocks `Hero`, `BouquetsList`, `WeddingCta`, `ReviewsList`, `RichText`, `ContactInfo` (`src/blocks/`); `versions: { drafts: true }` — frontend queries filter `_status: 'published'`, `draft: false`.
2. **Bouquets** — localized `title`, `description`; shared `images` (array), `isAvailable`, `variants[]`
   (`size`: Small/Medium/Large, `priceEUR`, `priceCZK`)
3. **SiteAlerts** — `message`, `isActive`, `type` (info/warning)
4. **WeddingInquiries** — `customerName`, `email`, `phone`, `weddingDate`, `venue`, `budget`,
   `notes`, `status` (New, Contacted, Closed)
5. **Reviews** — `customerName`, `rating` (1–5), `comment`, `status` (Pending/Approved/Rejected,
   default Pending). Public frontend API must only query `status === 'Approved'`.
6. **SiteSettings** (global) — `contactEmail`, `contactPhone`, `instagramUrl`, `facebookUrl`,
   `showVykvetBadge`, `showBeskydyBadge`

## Frontend routing & menu

- `/` renders the published page with slug `home`; `/home` permanently redirects to `/`. Other pages render at real paths (`/kontakt`, `/o-nas`, …) via `src/app/(frontend)/[slug]/page.tsx`; unknown slugs 404.
- Pages are rendered by `src/components/blocks/RenderBlocks.tsx`; block components fetch their own data (bouquets, Approved reviews, SiteSettings) with the current Payload locale.
- The navbar menu is data-driven: root layout queries published pages with `showInMenu` ordered by `menuOrder`, label = `menuLabel ?? title`. The `home` page is excluded (logo links `/`). Admin is reachable only directly at `/admin`.

## Deep docs (load on demand)

- `.agents/skills/payload/` — Payload CMS 3.x deep reference
- `.agents/skills/neon*/` — Neon Postgres, Auth, Functions, Object Storage, AI Gateway
