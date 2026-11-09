# Run locally

This page moved to [Quickstart](./quickstart). The steps below still work.

Start the Lab on your machine. Env tables, full CLI list, and maintainer notes
stay on GitHub - this page is only the cold start.

## Quick start

```bash
git clone https://github.com/Nocturne-Standards/knot.git
cd knot
cargo run -p knot-tool -- init
DEMO_MODE=mock cargo run -p knot-tool -- serve --bind 127.0.0.1:8877
# open the printed http://127.0.0.1:8877/?code=... URL
```

Lab port: **8877**, loopback only. `DEMO_MODE` must be `mock` (demo ledger) or
`testnet` (live chain).

A fresh clone builds without live contract pins. For testnet IDs, clone
[nocturne-deployments](https://github.com/Nocturne-Standards/nocturne-deployments)
next to this repo, or point `NOCTURNE_DEPLOYMENTS` at a `testnet.json` file.

## Full setup

Passwords, keystore, gas wallet, CLI, and Lab walkthrough:
[`knot-tool` README](https://github.com/Nocturne-Standards/knot/blob/main/crates/knot-tool/README.md)
· [repo overview](https://github.com/Nocturne-Standards/knot/blob/main/README.md).

Self-host the mailbox:
[`knot-collector` README](https://github.com/Nocturne-Standards/knot/blob/main/crates/knot-collector/README.md).

Contract IDs: [Deployments](/v1/deployments/).
