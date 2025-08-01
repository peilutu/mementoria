{
  description = "A Nix-flake-based Node.js development environment";

  inputs.nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.1";

  outputs =
    inputs:
    let
      supportedSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forEachSupportedSystem =
        f:
        inputs.nixpkgs.lib.genAttrs supportedSystems (
          system:
          f {
            pkgs = import inputs.nixpkgs {
              inherit system;
              overlays = [ inputs.self.overlays.default ];
            };
          }
        );
    in
    {
      overlays.default = final: prev: {
        nodejs = prev.nodejs;
      };

      devShells = forEachSupportedSystem (
        { pkgs }:
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              # node runtime & package manager
              node2nix
              nodejs
              nodePackages.pnpm

              # typescript compiler
              typescript

              # monorepo build system
              turbo

              # typescript orm
              prisma
              prisma-engines

              # json processor
              jq
            ];

            env = {
              PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine";
            };
          };
        }
      );
    };
}
