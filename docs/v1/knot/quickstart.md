# Quickstart

This page gets the Lab running on your machine. First in mock mode, which needs no wallet and no network. Then, if you want, against the Dusk testnet.

**Status:** testnet only, not audited yet. Don't use keys or funds you care about.

There is also a hosted mock at [knot.nocturne-standards.org](https://knot.nocturne-standards.org). Same rule: mock, testnet only, not audited yet.

## What you need

- Git.
- Rust 1.94 or newer. The workspace sets `rust-version = "1.94"`.
- For the testnet part only: `rusk-wallet` on your path with a funded testnet wallet (writes pay gas), and a clone of [nocturne-deployments](https://github.com/Nocturne-Standards/nocturne-deployments) next to the Knot clone.

## Part 1: run the Lab in mock mode

```bash
git clone https://github.com/Nocturne-Standards/knot.git
cd knot
cargo run -p knot-tool -- init --name alice
DEMO_MODE=mock cargo run -p knot-tool -- serve --bind 127.0.0.1:8877
```

What happens:

1. `init` creates a local keystore. It asks you to choose a password, twice. With `--name alice` it also creates a first identity. Run it again later and it only unlocks and prints a summary; it never wipes anything.
2. `serve` needs `DEMO_MODE` set to `mock` or `testnet`. If it is missing, `serve` refuses to start.
3. `serve` prints a link that looks like `http://127.0.0.1:8877/?code=...`. Open it once. The code is used up on first visit and sets a session cookie. The page never receives a secret key.

The Lab listens on your own machine only (port 8877). It refuses any other address.

In the Lab, press **Start walkthrough**. It creates three people (alice, bob, carol), then goes through five steps: cast the people, form a council, look it up, propose and give the first approval, then reach the threshold and finalize. In mock mode the signatures are real BLS signatures made on your machine. Only the chain part is skipped: nothing is sent anywhere.

The default proposal deadline is the current block plus the smaller of the contract's `proposal_ttl` and 100 blocks. The Lab shows that block and an approximate wait before it proposes.

A few Lab panels need the real chain and return "not implemented" in mock mode: Aggregate, Rotate, Unsafe UTF-8, and Party finder.

## Part 2: try a group on testnet

The same binary talks to the testnet when you use the command line, or when you start `serve` with `DEMO_MODE=testnet`. Writes cost gas and go through `rusk-wallet`.

```bash
export RUSK_WALLET_PWD=...        # your rusk-wallet password, testnet wallet
# Below, knot-tool means: cargo run -p knot-tool --

knot-tool identity new alice
knot-tool identity new bob
knot-tool identity new carol

knot-tool account create --member alice --member bob --member carol --threshold 2
knot-tool account query <id>
```

`account create` returns the id of your new group. Use that id, not a number you guessed: anyone can create a group at any time, so ids move. The commands find the contract ids in a `testnet.json` pin file. Put your clone of `nocturne-deployments` next to the Knot clone, or set `NOCTURNE_DEPLOYMENTS` to the path of a `testnet.json`.

To see a quorum check on chain:

```bash
knot-tool quorum submit --account <id> --msg "hello" --signer alice --signer bob            # preview, nothing sent
knot-tool quorum submit --account <id> --msg "hello" --signer alice --signer bob --confirm  # signs and sends
```

This sends a plain text message and is only a demo. A real contract puts its own label, an action and a counter into the bytes. [Integrate](./integrate) shows how, including `knot-tool sign-digest`.

Two limits on testnet to know about:

- **Proposing on the shared Proposals contract isn't possible yet.** That contract has no group set up to propose, so a proposal is refused whichever tool you use. You can still create groups and check quorums for any group. A proposal's deadline must be after the current block and no more than the contract's `proposal_ttl` blocks away (1000 on the shared deployment). The Lab's default is the current block plus the smaller of that limit and 100 blocks.
- **Don't use a free read of the quorum check as your test.** The query path can answer `false` for a secure signature that a real transaction accepts, because the node's query VM still uses the pre-hardfork verify policy. Send the transaction and read the account back.

## Next

- [How it works](./how-it-works): groups, proposals, delays.
- [Integrate](./integrate): ask Knot from your own contract.
- The full command list, the keystore details and the two-machine runbook are in the [knot-tool README](https://github.com/Nocturne-Standards/knot/blob/main/crates/knot-tool/README.md).
- To pass proposal files between people, see [Collector](./collector).
