{
  description = "zozahrady — Flower Farm dev shell (Node.js 26 + pnpm)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          name = "zozahrady";

          buildInputs = with pkgs; [
            nodejs_26   # Node.js 26.x (LTS)
            pnpm        # pnpm package manager
            git
          ];

          shellHook = ''
            export PNPM_HOME="$HOME/.local/share/pnpm"
            export PATH="$PNPM_HOME:$PATH"

            echo ""
            echo "🌸 zozahrady dev shell"
            echo "   node: $(node --version)"
            echo "   pnpm: $(pnpm --version)"
            echo ""
            echo "  Run 'pnpm install' to install dependencies."
            echo "  Run 'pnpm dev' to start the development server."
            echo ""
          '';
        };
      }
    );
}
