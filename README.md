# zozahrady 🌸

**Flower Farm e-shop and wedding inquiry platform** — built with Next.js App Router and Payload CMS v3.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| CMS / Backend | Payload CMS v3.x |
| Database | PostgreSQL (Local via Nix shell / Neon.tech serverless for prod) |
| Styling | Tailwind CSS + shadcn/ui |
| Package Manager | pnpm |
| Runtime | Node.js 26 |

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

### 5. Seed sample data

```bash
pnpm seed
```

Populates: 1 page ("Hlavná stránka"), 3 bouquets (Small/Medium/Large variants with EUR/CZK), 3 reviews (2 approved, 1 pending), and 1 SiteSettings document.

## Environment Variables

See [`.env.example`](.env.example) for all required variables.

| Variable | Description |
|---|---|
| `DATABASE_URI` | PostgreSQL connection string (Local or Neon.tech) |
| `PAYLOAD_SECRET` | Long random secret for Payload JWT signing |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for media uploads |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of the app (e.g. `http://localhost:3000`) |

## Localization

The app supports **Slovak (SK / EUR)** and **Czech (CZ / CZK)** via a cookie-based locale toggle (`sk_eur` vs `cz_czk`) in the Navbar.

## License

MIT — see [LICENSE](LICENSE).
