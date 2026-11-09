# Integrate

Your contract needs to know "did enough members of this group sign this?" You ask the Knot registry, and it answers true or false. That is the whole interface for checking a quorum. A vault contract in the Nocturne apps uses exactly this to authorize its actions.

**Status:** testnet only, not audited yet. Contract ids are on [Deployments](/v1/deployments/).

`x.y.z` below is a placeholder until the crate is on crates.io. The Knot repo lists what still changes at publish time in `RELEASE-PENDING.md`.

## The steps

1. A group exists. Someone calls the registry's `create_account` with the member keys and a threshold. It returns the group id.
2. You store the registry's contract id in your contract, once.
3. For each action, your contract builds the bytes the members must sign, and checks them with the registry.
4. Your contract remembers that this action has been used, so the same signatures can't be replayed.

### 1. Make the group, then read it back

A group has 1 to 16 distinct member keys and a threshold between 1 and the number of members. Anyone can create one, and listing someone's key doesn't give the creator any control over that key. Because other people create groups at the same time, always read the group back with `account(id)` and use the id that `create_account` returned. Don't assume it is "the next number".

### 2. Depend on the types

The call arguments are shared types in `knot-encoding`, behind the `call-types` feature.

```toml
knot-encoding = "x.y.z"
```

```toml
knot-encoding = { version = "x.y.z", features = ["call-types"] }
```

When the crates ship, the order is `knot-encoding` first, then `knot-registry` and `knot-proposals`, then the other libraries. `knot-warden` and `knot-warden-encoding` wait until Atlas is public.

The two types you need are:

```rust
pub struct SignatureEntry {
    pub signer: BlsPublicKey,
    pub signature: BlsSignature,
}

pub struct VerifyQuorumArgs {
    pub account_id: u64,
    pub msg: Vec<u8>,
    pub sigs: Vec<SignatureEntry>,
}
```

Pin a revision that matches the registry you are calling.

### 3. Ask the registry

The registry id is stored once by the deploy owner and has no setter, because every user's group lives behind it.

```rust
use dusk_core::abi;
use knot_encoding::call_types::{SignatureEntry, VerifyQuorumArgs};

fn require_quorum(&self, account_id: u64, digest: &[u8; 32], sigs: &[SignatureEntry]) {
    let registry = self
        .registry
        .unwrap_or_else(|| panic!("registry not configured"));
    let ok: bool = abi::call(
        registry,
        "verify_quorum",
        &VerifyQuorumArgs {
            account_id,
            msg: digest.to_vec(),
            sigs: sigs.to_vec(),
        },
    )
    .expect("knot registry verify_quorum call failed");
    if !ok {
        panic!("quorum not met by this group's current members");
    }
}
```

`verify_quorum` returns `false` if the group doesn't exist, and also if too few current members signed with valid signatures. Duplicate signers count once, and signers who are not members are ignored.

### 4. Build the bytes the members sign

The registry doesn't read the message and doesn't track replays. Both are your job. Put in the message: a label that belongs to your contract, the chain id, your contract's id, a counter, and the action itself. Then hash it.

```rust
fn action_digest(nonce: u64, payload: &[u8]) -> [u8; 32] {
    const DOMAIN: &[u8] = b"MYAPP/ACTION/v1";
    let mut m = alloc::vec::Vec::new();
    m.extend_from_slice(&(DOMAIN.len() as u32).to_be_bytes());
    m.extend_from_slice(DOMAIN);
    m.extend_from_slice(&u64::from(abi::chain_id()).to_be_bytes());
    m.extend_from_slice(&abi::self_id().to_bytes());
    m.extend_from_slice(&nonce.to_be_bytes());
    m.extend_from_slice(payload);
    abi::sha256(m)
}
```

Then record the nonce (or the digest) as used before you act, so the same signatures can't run twice.

Members sign exactly those 32 bytes. The Lab command prints the signer, the domain, and the digest, and it asks before it signs:

```bash
knot-tool sign-digest --signer alice --digest <64-hex-chars> --domain MYAPP/ACTION/v1 --confirm
```

It refuses an empty domain and any digest that is not 32 bytes. `quorum submit --msg` signs plain text and is only a demo.

### If Proposals calls you

If your contract is the target of an approved proposal, check who is calling. Use the caller, not the sender:

```rust
if abi::caller() != Some(PROPOSALS) {
    panic!("not the proposals contract");
}
```

Knot keeps no list of allowed targets. This check is the only thing standing between your function and the call, so make it the first line. Finalize refuses the proposals contract itself, and its book, as a target.

## What else you need to know

**Knot's data depends on Atlas.** Your call to `verify_quorum` doesn't touch Atlas. But the group it reads can only be written through the Registry book, and that book accepts writes only from the contract Atlas names for it. Whoever controls Atlas's guardian can point that name at a different contract, and that contract could then rewrite any group's members and threshold. A group's own delay (default 0) is the only thing that slows that down. Your contract keeps trusting the old registry id, so it would accept the rewritten group. [Who can change what](./who-can-change-what) has the full list.

If you deploy your own Knot, you need an Atlas, or a contract that answers `resolve(name)` the same way. The Atlas id is fixed when the books are built, through the `ATLAS_PIN_HEX` environment variable. If you leave it out, the build fails. The repo has a stand-in for tests, `knot-mock-atlas`; anyone can write to it, so don't use it for anything real.

**Member keys are BLS keys, and they aren't wallets.** A member is a BLS12-381 public key (96 bytes). The Lab keeps members' keys in its own encrypted keystore, which is a different format from `rusk-wallet`'s. Paying gas is a separate thing: whoever sends the transaction pays, and the Lab does that through `rusk-wallet`.

**The registry holds no funds.** It answers "did enough members sign these bytes?" and nothing else.

**Contract ids change when contracts are redeployed.** A fixed registry id in your contract is a fixed trust choice. If Knot's contracts are redeployed, you get a new id and you need to decide whether to follow. See the [versioning notes](https://github.com/Nocturne-Standards/knot/blob/main/docs/versioning.md).

**Test with real transactions.** A free read of `verify_quorum` is a node query. That query runs in the node's query VM, and `dusk-vm`'s `VM::ephemeral()` defaults the host-query policy to the pre-hardfork setting, so a secure signature can come back `false` (`sigs_ok=0`) even though the same bytes succeed in a real transaction. Don't use the free read as the test. Send the transaction and read the account back. A fix belongs in dusk-vm or rusk.

Method tables: [Reference](./reference). The wait in front of an Atlas name: [Warden](./warden).
