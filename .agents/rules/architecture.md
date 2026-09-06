---
trigger: always_on
---

# Architecture & Tech Stack Rules

## Tech Stack & Environment
- **Framework:** Next.js (App Router) - Always install using `@latest`
- **CMS / Backend:** Payload CMS v3.x (running natively inside Next.js)
- **Database:** PostgreSQL (via Neon.tech serverless)
- **Styling:** Tailwind CSS + shadcn/ui (centralized CSS variables)
- **Package Manager:** `pnpm` (Enforced via corepack and package.json)
- **Runtime Version:** Node.js v26 (Configured via `.nvmrc` and supported in Nix environment)
- **Local Dev Environment:** Universal support via `.nvmrc` + NixOS `flake.nix` (for local laptop setup)
- **Pre-commit Tooling:** Husky + lint-staged (ESLint, Prettier, TypeScript type-checking `tsc --noEmit`)

## Dependency Management & AI Rules
- **Rule:** NEVER use hardcoded or outdated npm package versions from training data.
- **Rule:** Always append `@latest` when installing packages (e.g., `pnpm add package@latest`).

## Theme & Styling (Centralized CSS Variables)
- All design tokens MUST be defined as CSS variables in `app/globals.css` (shadcn/ui convention).
- NEVER hardcode hex colors directly in component utility classes.
- **Initial Theme (Botanical):**
  - `--background`: Off-white (`#FAF9F6`)
  - `--primary`: Sage Green (`#4A5D23`)
  - `--foreground`: Charcoal (`#1F2937`)
  - Fonts: `Playfair Display` (headings), `Inter` (body/UI)

## Localization Strategy
- **Default:** Slovak (SK) / EUR (€)
- **Alternative:** Czech (CZ) / CZK (Kč)
- **Implementation:** Cookie-based toggle in the UI (`sk_eur` vs `cz_czk`).

## Database Schema (Payload Collections)

**1. Pages**
- Fields: `title`, `slug`, `heroImage`, `content` (richText)

**2. Bouquets (E-Shop)**
- Fields: `title`, `description`, `images` (array), `isAvailable` (boolean)
- `variants` (Array field):
  - `size` (select: Small, Medium, Large)
  - `priceEUR` (number)
  - `priceCZK` (number)

**3. SiteAlerts (Vyskakujúci banner)**
- Fields: `message`, `isActive` (boolean), `type` (info/warning)

**4. WeddingInquiries**
- Fields: `customerName`, `email`, `phone`, `weddingDate`, `venue`, `budget`, `notes`, `status` (New, Contacted, Closed)

**5. Reviews**
- Fields: `customerName` (text), `rating` (select: 1-5), `comment` (textarea), `status` (select: Pending, Approved, Rejected. Default: Pending). 
- *Note:* Public frontend API must only query items where `status === 'Approved'`.

**6. SiteSettings (Global Document)**
- Fields: `contactEmail`, `contactPhone`, `instagramUrl`, `facebookUrl`, `showVykvetBadge`, `showBeskydyBadge`
