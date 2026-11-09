# Knot on DuskEVM

**Status:** deployed on DuskEVM testnet, testnet only, not audited yet. The address is on [Deployments](/v1/deployments/) (`knot-evm-root`).

A group on Dusk can also be checked from a Solidity contract on DuskEVM. The EVM contract, `KnotEvmRoot`, keeps a short fingerprint of each group: who the members are, the threshold, and a counter that goes up every time the group changes. It holds no keys and no funds. Your EVM contract asks it one question: did enough current members of this group sign this action?

## How a group gets there

1. **First member set.** Enough of the group's members sign the member set on Dusk. The Knot registry checks those signatures, then sends the member set once through DuskEVM's cross-domain messenger to `KnotEvmRoot`. `KnotEvmRoot` only accepts it from the registry it was deployed for.
2. **Later changes.** After that, the group changes its own members on the EVM side with `rotate`, signed by enough current members. Each change raises the counter, and every signature made before it stops working.

On testnet we ran this end to end on 2026-10-28: a 2-of-3 group was sent from Dusk, arrived on DuskEVM through the messenger, and a `checkAction` signed by two of its members went through.

## Asking it from your contract

| Call | What it does |
|---|---|
| `checkAction(accountId, actionDigest, quorum)` | Checks the signatures against the group's current members and threshold, and marks that action as used. The same signed action can't be used twice |
| `isBootstrapped`, `membersRoot`, `threshold`, `rotationNonce` | Read the group's current state |
| `isConsumed(accountId, actionDigest)` | Whether an action was already used |
| `actionMessage`, `rotationMessage` | The exact bytes members sign |

The signed message includes the calling contract's address and the current counter, so a signature made for one contract, or before a change, can't be reused somewhere else.

## Doing it with the Lab's tool

`knot-tool evm` does both steps with members' own identity stores. Each member signs into one shared file, which holds only public keys and signatures:

```bash
# each member, from their own store
knot-tool --store <store> evm bootstrap-sign --account <id> --receiver <KnotEvmRoot> --signer <name> --file bootstrap.json --confirm
# anyone, once enough members signed (pays DuskDS gas)
knot-tool evm bootstrap-submit --file bootstrap.json --confirm

# each member signs an action for a given consumer contract
knot-tool --store <store> evm action-sign --account <id> --root <KnotEvmRoot> --evm-chain 745 \
  --rotation-nonce <n> --consumer <address> --digest <32 bytes> --signer <name> --file action.json --confirm
# prints the checkAction call for the consumer to send
knot-tool evm action-args --file action.json
```

Every command shows a preview and a fingerprint first, and only signs or sends with `--confirm`.

## Signatures

Members use the same BLS keys as on Dusk. The contract checks them with the BLS12-381 precompiles Ethereum added in Pectra (EIP-2537), which DuskEVM supports. BLS on its own is nothing unusual on EVM chains; what this adds is that the group is the same one that exists on Dusk.

## What isn't there yet

- A group changed on Dusk after it was sent is not updated on DuskEVM automatically. It has to `rotate` there too.
- Not audited yet.

Source: [`evm/` in the Knot repo](https://github.com/Nocturne-Standards/knot/tree/main/evm).
