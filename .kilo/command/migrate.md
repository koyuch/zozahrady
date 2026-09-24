---
description: Create, review, and apply a Payload schema migration
---

# Migrate

$ARGUMENTS = migration name (required, snake_case, e.g. `add_bouquet_category`).

Workflow — follow strictly, in order:

1. Make the collections/globals/fields config change in code first.
2. Generate the migration:

   ```bash
   pnpm payload migrate:create $ARGUMENTS
   ```

3. **Review the generated SQL** in `src/migrations/<timestamp>_$ARGUMENTS.ts` before applying —
   verify it matches the intended config change and won't drop data.
4. Apply:

   ```bash
   pnpm payload migrate
   ```

5. Commit the migration file(s) together with the config change they were generated from.

Hard rules:

- NEVER use `payload push` against a shared or production database — it bypasses review and
  history and can drop data.
- `pnpm build` runs `payload migrate` automatically (deploys apply pending migrations); never
  run `pnpm build` purely to test a migration.
- `pnpm payload migrate:status` lists applied/pending migrations if state is unclear.
