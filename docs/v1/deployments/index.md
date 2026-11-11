# Deployments

A deployment is either software you run yourself, or a service Nocturne runs. Those two are written down in different places.

## Software you deploy

Atlas and Knot are building blocks. The instance your contracts call is the one your project deployed, with the guardian and the delay you chose. A testnet copy that Nocturne happens to be running is a lab instance. It changes when the code changes, and it is not an address to pin.

For this software, follow the tagged source and the version notes:

| Software | Version |
|---|---|
| [Atlas](/v1/atlas/) | [Versions](/v1/atlas/reference). `nocturne-atlas-encoding` 0.5.0 and `nocturne-atlas-event-decoder` 0.3.1 are on crates.io. `atlas.wasm` comes from the repository. |
| [Knot](/v1/knot/) | [Releases](https://github.com/Nocturne-Standards/knot/releases) and [versioning.md](https://github.com/Nocturne-Standards/knot/blob/main/docs/versioning.md). |

When a crate is published, its crates.io page is the version to depend on. Until then, pin a git tag or a full commit.

## A product we run

Vigil is an application. The desktop app talks to one Vigil release on testnet, so that release is part of using the product. The version the app is built against is on [Versions](/v1/vigil/versions), and the notes for each release are on the [Vigil releases page](https://github.com/Nocturne-Standards/vigil/releases).

An address for a product we operate belongs next to that product's release. This page does not keep a second list of every contract Nocturne has deployed.
