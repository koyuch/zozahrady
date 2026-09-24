# zozahrady 🌸

**Flower Farm e-shop and wedding inquiry platform** — built with Next.js App Router and Payload CMS v3.

## Tech Stack

| Layer           | Technology                                                       |
| --------------- | ---------------------------------------------------------------- |
| Framework       | Next.js (App Router)                                             |
| CMS / Backend   | Payload CMS v3.x                                                 |
| Database        | PostgreSQL (Local via Nix shell / Neon.tech serverless for prod) |
| Styling         | Tailwind CSS + shadcn/ui                                         |
| Package Manager | pnpm                                                             |
| Runtime         | Node.js 26                                                       |

## Getting Started

### Prerequisites

- [Nix](https://nixos.org/) with flakes and `direnv` enabled, **or** Node.js 26 + pnpm installed manually
- A local PostgreSQL database (auto-managed in `flake.nix`) or [Neon.tech](https://neon.tech) PostgreSQL database

### 1. Dev Shell (NixOS / Nix + direnv)

```bash
cd zozahrady
direnv allow
```

This automatically starts a local PostgreSQL instance (`.pgdata/`) and provides Node 26 + pnpm.

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment

```bash
cp .env.example .env
# DATABASE_URI and PAYLOAD_SECRET are preconfigured for local dev
```

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — the storefront.  
Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

### 5. Apply database migrations

```bash
pnpm payload migrate
```

Creates the Payload schema (tables for all collections, globals, and relations) in the database that `DATABASE_URI` points at. Required once on a fresh database (and after any schema change) — see [Migrations](#migrations).

### 6. Seed sample data

```bash
pnpm seed
```

Populates: 1 page ("Hlavná stránka"), 3 bouquets (Small/Medium/Large variants with EUR/CZK), 3 reviews (2 approved, 1 pending), and 1 SiteSettings document.

## Migrations

Schema changes are versioned as Payload migrations in `src/migrations/` (drizzle-generated SQL from the Payload config). Workflow:

```bash
# After changing collections, globals, or fields in the Payload config:
pnpm payload migrate:create <name>  # generates src/migrations/<timestamp>_<name>.ts — review the SQL before committing

pnpm payload migrate                # apply pending migrations to the DB in DATABASE_URI
pnpm payload migrate:status         # list applied / pending migrations
pnpm payload migrate:down            # roll back the most recently applied migration
```

Rules of thumb:

- **Never use `payload push` against production.** It syncs the schema directly with no review and no history, so a bad diff can silently drop data. It is only acceptable for throwaway local experiments.
- Migrations run automatically on deploy: `pnpm build` executes `payload migrate` before `next build` (see [Deployment](#deployment-vercel)).
- Applied migrations are recorded in the target database (`payload_migrations` table), so re-running `pnpm payload migrate` is safe.
- A fresh database (new Neon branch, new local cluster) is brought up with `pnpm payload migrate`, optionally followed by `pnpm seed` for mock data.
- Commit migration files together with the collection/config changes they were generated from.

## Environment Variables

See [`.env.example`](.env.example) for all required variables.

| Variable                 | Description                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `DATABASE_URI`           | PostgreSQL connection string (Local or Neon.tech). Payload falls back to `DATABASE_URL` if `DATABASE_URI` is unset |
| `PAYLOAD_SECRET`         | Long random secret for Payload JWT signing                                                                         |
| `CLOUDINARY_CLOUD_NAME`  | Cloudinary cloud name for media uploads                                                                            |
| `CLOUDINARY_API_KEY`     | Cloudinary API key                                                                                                 |
| `CLOUDINARY_API_SECRET`  | Cloudinary API secret                                                                                              |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of the app (e.g. `http://localhost:3000`)                                                               |

## Deployment (Vercel)

Production runs on Vercel (Next.js auto-detected) against the Neon Postgres **`production`** branch of project `green-forest-59995045` (`.neon` file), database `zozahrady`.

- **Build command:** the default `pnpm build` — it applies pending Payload migrations (`payload migrate`) and then runs `next build`. Schema changes ship in the same deploy as the code that uses them; already-applied migrations are skipped.
- **Environment variables** (`DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, Cloudinary keys) are set in the Vercel project settings — `.env` is gitignored and never deployed. `DATABASE_URI` must be available at build time for the migration step.
- **First admin user:** on a fresh database, open `/admin` and use the first-run screen to create the initial admin account.
- **Seeding production is optional:** `pnpm seed` writes mock data into whatever `DATABASE_URI` points at — never point it at production unintentionally (the dev shell exports a local `DATABASE_URI`, but processes that read `.env` directly without the nix shell use whatever is written there).

## Localization

The app supports **Slovak (SK / EUR)** and **Czech (CZ / CZK)** via a cookie-based locale toggle (`sk_eur` vs `cz_czk`) in the Navbar.

## License

MIT — see [LICENSE](LICENSE).
