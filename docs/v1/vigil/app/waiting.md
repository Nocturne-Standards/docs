# Waiting

Waiting lists the changes that have not finished yet. A large send waits here. So does any change that loosens a rule, adds an allowed address or changes who signs.

## How a waiting action moves

1. It is **Waiting** until its ready block. The cancel key can cancel it in this time.
2. It is **Ready** from that block. Anyone can settle it, and so can a relayer if you gave it a fee grant.
3. It is **Lapsed** if its settle window ends and nobody settled it.

A send that still waits for another device to approve it is not here yet. It is on [Approvals](/v1/vigil/app/approvals), and it moves here when you submit it. When requests need this computer, Waiting shows one line: "N requests need your approval. Open Approvals."

A card shows the ready block, how far through the wait it is, and the details of the change. Open the card for the chain fields and the full digest.

## Cancel

**Cancel send** ends a waiting send. **Cancel change** ends any other waiting change. Both need the cancel key file, which the app asks for each time and never keeps. Cancel does not move any DUSK. It is your own transaction, so it does not need a relayer.

## Settle

**Settle** finishes a change after its wait is over. If the vault cannot pay what the change asks, the card says so, and the row stays until it lapses.

## Remove

**Remove** takes lapsed entries off the list. One Remove clears every expired entry, up to 64 in one call. When several are expired, the button reads "Remove expired" with the number. Remove does not send any DUSK.

## Tags and costs

- **New** means the entry appeared since you last opened this list.
- **Unreadable** means the app cannot decode the change. You can still cancel it.
- When a relayer settled an entry, the card shows what the fee balance paid, and the reason if the relayer was refused.

Every Cancel, Settle and Remove review shows a gas block. See [Costs](/v1/vigil/costs).

## Next

[History](/v1/vigil/app/history), [Security](/v1/vigil/app/security)
