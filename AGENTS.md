# AGENTS.md

Shared rules for all AI agents working in this repo (Kilo, Claude Code via `CLAUDE.md` pointer, etc.).
Human setup detail lives in [README.md](README.md); on-demand deep docs live in `.agents/skills/*/SKILL.md` (Neon, Payload) and their `reference/` dirs — load them only when the task touches that topic.

## Tech Stack & Environment

- **Framework:** Next.js (App Router) — always install with `@latest`
- **CMS / Backend:** Payload CMS v3.x (running natively inside Next.js)
- **Database:** PostgreSQL (Neon.tech serverless for prod, local Postgres via Nix shell)
- **Styling:** Tailwind CSS + shadcn/ui (centralized CSS variables)
- **Package Manager:** `pnpm` (enforced via corepack and package.json)
- **Runtime:** Node.js v26 (`.nvmrc` + NixOS `flake.nix`)
- **Pre-commit:** Husky + lint-staged (ESLint, Prettier, `tsc --noEmit`)

## Dependency Management

- NEVER use hardcoded or outdated npm package versions from training data — Next.js 16, Payload 3.x, and Tailwind 4 are all newer than training cutoffs; verify current APIs (Context7 MCP is configured for this).
- Always append `@latest` when installing packages (e.g., `pnpm add package@latest`).

## Workflow Commands

Shell tools (`pnpm`, `node`) come from the local Nix flake. If your shell doesn't have them,
load the dev environment first: `direnv allow && direnv allow && eval "$(direnv export bash)"`,
or wrap commands with `nix develop -c <command>` / `direnv exec . <command>`.

If a specific tool is missing from the flake, either add it to `flake.nix` (when it's useful
for future sessions too) or run it one-off via `nix shell nixpkgs#<tool> -c <command>`.

```bash
pnpm dev          # dev server (long-running, don't run without asking)
pnpm build        # payload migrate && next build (applies migrations!)
pnpm lint         # ESLint
pnpm type-check   # tsc --noEmit
pnpm test         # test:int && test:e2e
pnpm test:int     # vitest integration tests
pnpm test:e2e     # Playwright e2e (only when UI flows changed)
pnpm seed         # mock data — writes to whatever DATABASE_URI points at
pnpm payload migrate / migrate:status / migrate:create <name>
```

## Database Migrations & Deploys

- Schema evolution MUST use Payload migrations: change collections/config in code, then
  `pnpm payload migrate:create <name>` → **review the generated SQL** in `src/migrations/` →
  `pnpm payload migrate`. Commit migration files together with the config changes.
- NEVER use `payload push` against a shared/production database — it bypasses review and history and can drop data.
- Keep `payload migrate` in the `build` script ahead of `next build` — Vercel applies pending
  migrations on every deploy, so schema changes roll out with the code.
- **Production DB:** Neon `production` branch of project `green-forest-59995045` (see `.neon`),
  database `zozahrady`; its connection string lives only in Vercel env vars.
- Fresh Neon branches start with an empty schema: rebuild with `pnpm payload migrate`
  (+ `pnpm seed` if mock data is wanted).

## Theme & Styling

- All design tokens MUST be defined as CSS variables in `app/globals.css` (shadcn/ui convention).
- NEVER hardcode hex colors in component utility classes.
- Initial theme (Botanical): `--background` off-white `#FAF9F6`, `--primary` sage green `#4A5D23`, `--foreground` charcoal `#1F2937`; fonts: Playfair Display (headings), Inter (body/UI).

## Localization

- Default: Slovak (SK) / EUR (€); alternative: Czech (CZ) / CZK (Kč).
- Cookie-based toggle in the UI (`sk_eur` vs `cz_czk`).

## Payload Collections (schema summary)

1. **Pages** — `title`, `slug`, `heroImage`, `content` (richText)
2. **Bouquets** — `title`, `description`, `images` (array), `isAvailable`, `variants[]`
   (`size`: Small/Medium/Large, `priceEUR`, `priceCZK`)
3. **SiteAlerts** — `message`, `isActive`, `type` (info/warning)
4. **WeddingInquiries** — `customerName`, `email`, `phone`, `weddingDate`, `venue`, `budget`,
   `notes`, `status` (New, Contacted, Closed)
5. **Reviews** — `customerName`, `rating` (1–5), `comment`, `status` (Pending/Approved/Rejected,
   default Pending). Public frontend API must only query `status === 'Approved'`.
6. **SiteSettings** (global) — `contactEmail`, `contactPhone`, `instagramUrl`, `facebookUrl`,
   `showVykvetBadge`, `showBeskydyBadge`

## Deep docs (load on demand)

- `.agents/skills/payload/` — Payload CMS 3.x deep reference
- `.agents/skills/neon*/` — Neon Postgres, Auth, Functions, Object Storage, AI Gateway
