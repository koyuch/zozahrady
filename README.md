# zozahrady 🌸

**Flower Farm e-shop and wedding inquiry platform** — built with Next.js App Router and Payload CMS v3.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| CMS / Backend | Payload CMS v3.x |
| Database | PostgreSQL (Neon.tech serverless) |
| Styling | Tailwind CSS + shadcn/ui |
| Package Manager | pnpm |
| Runtime | Node.js 26 |

## Getting Started

### Prerequisites

- [Nix](https://nixos.org/) with flakes enabled, **or** Node.js 26 + pnpm installed manually
- A [Neon.tech](https://neon.tech) PostgreSQL database

### 1. Enter the dev shell (NixOS / Nix)

```bash
nix develop
```

This gives you Node 26 and pnpm automatically.

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment

```bash
cp .env.example .env
# Fill in your DATABASE_URI, PAYLOAD_SECRET, and Cloudinary credentials
```

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — the storefront.  
Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

### 5. Seed sample data (optional)

```bash
pnpm seed
```

Populates: 1 page, 3 bouquets, 3 reviews, 1 SiteSettings document.

## Environment Variables

See [`.env.example`](.env.example) for all required variables.

| Variable | Description |
|---|---|
| `DATABASE_URI` | Neon.tech PostgreSQL connection string |
| `PAYLOAD_SECRET` | Long random secret for Payload JWT signing |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for media uploads |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of the app (e.g. `http://localhost:3000`) |

## Localization

The app supports **Slovak (SK / EUR)** and **Czech (CZ / CZK)** via a cookie-based locale toggle in the Navbar.

## License

MIT — see [LICENSE](LICENSE).
