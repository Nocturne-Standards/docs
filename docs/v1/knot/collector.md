# Collector

**Status:** testnet only, not audited yet.

The collector is an optional **shared mailbox** for proposal files and partial
signatures - like a Safe Transaction Service for this suite.

It is **untrusted** on purpose:

- it never holds secret keys
- it never signs
- it never submits chain transactions

License: **AGPL-3.0-only** (or commercial - see
[`LICENSING.md`](https://github.com/Nocturne-Standards/knot/blob/main/crates/knot-collector/LICENSING.md)).
The Lab stays Apache and separate.

## What fails

Assume the collector can lie, drop data, reorder partials, or keep junk.
Same signer key: last write wins, so a real signer can overwrite junk. Honest
signers still recompute the digest after pull (`gate_blob_for_signing`). The
chain still rejects bad signatures.

If other people use your collector, put TLS and login on a reverse proxy in front. The binary itself
is an open relay by design. Bind to loopback unless you set
`KNOT_COLLECTOR_ALLOW_NON_LOOPBACK=1`.

The party-finder list is only for discovery ("here is my name and public key").
It does not authorize anything on-chain.

## HTTP API

Default listen address: `127.0.0.1:8899`.

| Method | Path | What it does |
|---|---|---|
| `GET` | `/v1/health` | Alive check + version |
| `POST` | `/v1/proposals` | Store a new proposal blob |
| `GET` | `/v1/proposals` | List summaries (paging) |
| `GET` | `/v1/proposals/:id` | Fetch one blob (`:id` is 64 hex chars) |
| `POST` | `/v1/proposals/:id/partials` | Add or replace one verified partial signature |
| `GET` | `/v1/party` | List party-finder entries |
| `POST` | `/v1/party` | Sign up / refresh (signature proves key possession) |

There is no public delete for party rows - upsert only. Proposal ids are the
digest in lowercase hex (content-addressed).

Env vars, size caps, and run notes:
[`knot-collector` README](https://github.com/Nocturne-Standards/knot/blob/main/crates/knot-collector/README.md).
