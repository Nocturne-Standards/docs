# Who can change what

Knot's checks are on chain, but a few keys can still change how those checks are set up. This page lists them, what each can change, and how long a change waits. If you plan to rely on a Knot group, read it first.

**Status:** testnet only, not audited yet. Delay lengths on testnet are lab values. Read the current numbers from the contracts. Contract ids are on [Deployments](/v1/deployments/).

## The short version

- A group's members can change that group, with the group's own delay.
- The deployer key sets up the Registry and Proposals contracts and decides which group Proposals works for. It can't change a group's members.
- The Atlas guardian decides which contract the books accept writes from. That is the most powerful role on this page, because that contract can write any group's members.
- Warden, if it is installed as the guardian, makes service changes wait. It doesn't add a wait to everything.
- Nobody can move a member's key, and the Registry holds no funds.

## The table

| Who | What they can change | Which delay applies |
|---|---|---|
| **A group's members** (a quorum of them) | The group's members and threshold (`change_account`). The group's delay (`set_timelock`). Cancel a waiting change (`cancel_pending`). Approve or cancel a proposal | The group's own `timelock_blocks`, default 0. At 0 a change applies in the same call. Changing the delay itself waits the current delay, so a group can't shorten its own wait instantly |
| **Anyone** | Create a group. Apply a waiting change after its time (`execute_pending`, `execute`). Finalize a proposal that has enough approvals. Prune old proposals | None. They can't change anything a quorum hasn't signed |
| **The deployer key** (owner of the Registry and Proposals contracts) | Registry: point it at its book, once. Proposals: point at its book; point at a registry (this bumps the epoch and clears the bound group); bind the one group Proposals works for (this retires every open or queued proposal of the old binding); set the proposal time limit; set the tombstone flag | None. These are direct calls by that key |
| **The Atlas guardian** | Which contract Atlas names for `knot-registry` and `knot-proposals`. The books accept writes only from the named contract, so the guardian decides who can write the groups and proposals. Also who the next guardian is, and Atlas's own delay | A service name changes in the call. When Warden is the guardian, Warden's `delay_blocks` applies first. Replacing the guardian waits Atlas's `timelock_blocks`, then the incoming guardian calls `accept_guardian` |
| **The Warden scheduler** | Schedule a service change. Change Warden's delay or scheduler. Start a guardian or timelock change on Atlas | `delay_blocks` for service changes, for Warden's own settings, and before a guardian change. Then Atlas's `timelock_blocks` for guardian and timelock changes |
| **The bound group, through Proposals** | Call any contract that checks `abi::caller()` for Proposals. Not Proposals itself, and not its book | The group's `timelock_blocks` |
| **A collector operator, or the Lab** | Nothing on chain. They hold no keys (the Lab holds only the local user's keys) and send nothing the members haven't signed | |

## What the Atlas guardian can do, in plain terms

The two books don't check signatures. They trust whichever contract Atlas names for them. If the guardian points `knot-registry` at a different contract, that contract can change any group's members and threshold, and only the group's own delay slows it down (default 0). The honest Registry would no longer be able to cancel a pending change. Contracts that still call the old Registry id keep reading the rewritten group through it.

Knot's quorum check is the last word on a group only while Atlas points at the contract you expect. Knot's pieces are built to be used with Atlas, and a Knot deployment includes the trust you place in whoever holds the guardian slot.

Warden is the piece that puts a wait on this. When Warden is the guardian, a service change is scheduled first, waits `delay_blocks`, and anyone can apply it afterward. Replacing Warden waits twice: Warden's `delay_blocks` first, then Atlas's own `timelock_blocks`. See [Warden](./warden).

## What is wired on testnet today

- On the Knot testnet deployment, Atlas's guardian is a Warden contract. That Warden waits **30 blocks** before a service change applies. These delays are lab values.
- The person who starts a change is one ordinary key, not a group. `knot-proposals` on that Atlas resolves to the current proposals logic. That logic has no group bound yet, so a group cannot start a service change.
- Contract ids, including the current Warden, live in [Deployments](/v1/deployments/).

## The three delays

They cover different actions. Setting one to 0 doesn't replace another.

| Delay | Lives on | What waits |
|---|---|---|
| `timelock_blocks` | each Knot group | Member and threshold changes, and running an approved proposal |
| `delay_blocks` | Warden | Atlas pointing a service name at a new contract; Warden's own delay and scheduler; the first wait of a guardian change |
| `timelock_blocks` | Atlas | Replacing the guardian (after Warden's wait), and changing Atlas's own delay |

**Cancelling needs a quorum.** During a wait, the group can cancel a waiting member change or a queued proposal, but only with the same number of signatures that approved it. If an attacker holds enough keys to approve, the honest members can't cancel. A wait gives the group, and anyone watching the events, time to react. It helps most when enough honest keys remain to reach the threshold.

Cancel applies to queued proposals and pending member changes. A proposal that is still open (not yet finalized) has no cancel; it expires at its deadline.

## What nobody can do

- Nobody can sign for a group without the keys. Each signature is checked on chain against the group stored there.
- The Registry and Proposals hold no funds.
- Contracts don't upgrade in place. A fixed behaviour change is a new contract id; the old contract's rows stay where they are.
- Proposals can't call itself or its own book as a target.
