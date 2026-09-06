{
  description = "zozahrady — Flower Farm dev shell (Node.js 26 + pnpm + PostgreSQL)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        # Local Postgres data directory (gitignored)
        pgDataDir = "./.pgdata";
        pgPort    = "5432";
        pgUser    = "zozahrady";
        pgDb      = "zozahrady_dev";
      in
      {
        devShells.default = pkgs.mkShell {
          name = "zozahrady";

          buildInputs = with pkgs; [
            nodejs_26        # Node.js 26.x (LTS)
            pnpm             # pnpm package manager
            git
            postgresql_16    # PostgreSQL for local dev
          ];

          shellHook = ''
            export PNPM_HOME="$HOME/.local/share/pnpm"
            export PATH="$PNPM_HOME:$PATH"

            # ── Local PostgreSQL setup ────────────────────────────────────────
            export PGDATA="${pgDataDir}"
            export PGPORT="${pgPort}"
            export PGUSER="${pgUser}"
            export PGDATABASE="${pgDb}"
            export DATABASE_URI="postgresql://${pgUser}@localhost:${pgPort}/${pgDb}"

            # Initialise the data directory on first run
            if [ ! -d "${pgDataDir}" ]; then
              echo "🗄  Initialising local PostgreSQL cluster in ${pgDataDir}..."
              initdb --username="${pgUser}" --auth=trust --no-instructions
              echo "unix_socket_directories = '$PWD/${pgDataDir}'" >> "${pgDataDir}/postgresql.conf"
            fi

            # Start Postgres if not already running
            if ! pg_ctl status -D "${pgDataDir}" > /dev/null 2>&1; then
              echo "🗄  Starting local PostgreSQL on port ${pgPort}..."
              pg_ctl start -D "${pgDataDir}" \
                -l "${pgDataDir}/postgres.log" \
                -o "-p ${pgPort} -k $PWD/${pgDataDir}" \
                --wait > /dev/null 2>&1

              # Create the app database if it doesn't exist yet
              createdb "${pgDb}" 2>/dev/null || true
            fi

            echo ""
            echo "🌸 zozahrady dev shell"
            echo "   node:     $(node --version)"
            echo "   pnpm:     $(pnpm --version)"
            echo "   postgres: $(pg_ctl status -D ${pgDataDir} 2>&1 | head -1)"
            echo ""
            echo "  DATABASE_URI=$DATABASE_URI"
            echo ""
            echo "  Run 'pnpm install' to install dependencies."
            echo "  Run 'pnpm dev'     to start the development server."
            echo "  Run 'pg_ctl stop'  to stop the local Postgres."
            echo ""
          '';
        };
      }
    );
}
