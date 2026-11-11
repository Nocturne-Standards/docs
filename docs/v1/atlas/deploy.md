# Deploy

Deploy one Atlas directory, then register one name on it. The guardian in this walk is a key, so `set_service` applies in the same call. A warden, which makes that change wait, is [Guardian](./guardian).

## Build the wasm

In the [Atlas repository](https://github.com/Nocturne-Standards/atlas), `make release-wasm` writes `atlas.wasm` and prints its hash. A macOS build does not reproduce the Linux hash. The repository's `docs/versioning.md` records which builders do.

## Deploy it

The wallet that sends the deploy is the owner. Its BLS public key is the only key that can call `init_guardian`. Atlas reads that key back from the deploy record with `self_owner()`. If those bytes are not a valid BLS public key, `init_guardian` cannot run.

That owner key has one power. It calls `init_guardian` once, directly. After that call it has no special standing. The method is not named `init`, because the chain reserves `init` for the deploy constructor and would call it during deploy.

`init_guardian` sets two things: the guardian, and `timelock_blocks`, the wait before a later guardian change or a delay change applies. Pass the delay you mean to keep. A deployment left at `0` has no wait on those changes until a `set_timelock` is executed, and that change itself waits out the current value. The cap is 777,600 blocks.

The arguments are `InitArgs` from [`nocturne-atlas-encoding`](https://crates.io/crates/nocturne-atlas-encoding) 0.5.0. The guardian in this walk is that same key. A contract guardian is [Guardian](./guardian).

```toml
atlas-encoding = { package = "nocturne-atlas-encoding", version = "0.5" }
```

```rust
use atlas_encoding::call_types::{Account, InitArgs};
use dusk_core::signatures::bls::PublicKey as BlsPublicKey;

let guardian = BlsPublicKey::from_bytes(&key_bytes).expect("guardian key");
let init = InitArgs {
    guardian: Account::External(guardian),
    timelock_blocks: 30,
};
```

`key_bytes` is the 96-byte BLS public key of the deploy owner. Encode `init` with rkyv 0.7 using the `size_32` layout. That is the byte layout a contract uses when it calls another contract. Pass those bytes as the argument of `init_guardian`.

## Register one name

Deploy the contract the name should point at, and keep its id. The guardian then calls `set_service` with the name and that id.

```rust
use atlas_encoding::call_types::SetServiceArgs;
use dusk_core::abi::ContractId;

let register = SetServiceArgs {
    name: String::from("counter"),
    id: ContractId::from_bytes(counter_id),
};
```

A name is 1 to 64 bytes, compared as raw bytes, so `Vault` and `vault` are different names. `set_service` refuses an empty name, a name longer than 64 bytes, and the all-zero id. From atlas 0.6.0 it also refuses to write an id that is already stored under that name.

`resolve(name)` then returns that id. Anyone can call it.

The id of this directory is what each caller bakes in at build time. [Integrate](./integrate) is that caller. The directory's own id does not appear on [Deployments](/v1/deployments/). That page does not keep a list of contract ids.
