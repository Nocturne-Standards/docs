# Concepts

The words Vigil uses, and what each one does for you.

## The vault

A vault holds your DUSK on chain. One contract holds many vaults, one per owner, so you do not deploy anything to get one. Opening a vault locks a small deposit, which you get back when you close it.

Money leaves a vault only through a **change**: a send, a stake, a new setting. Your signing group signs each change. The vault then either applies it at once or makes it wait.

## The signing group

The keys that approve changes to your vault, and how many of them must agree, for example 2 of 3. The signing group is a [Knot](/v1/knot/) account on the chain. Vigil's deploy uses the Knot registry and warden it pins, so the group's members and threshold are read from there. Each computer that runs the Vigil app holds one member key, protected by its folder password.

Every change takes the group's threshold. A larger amount does not ask for more signatures: it waits instead. With a threshold of 1, one key is the whole group.

A member key is not a Dusk wallet key. Its recovery phrase has 24 words and restores only that Vigil key. A Dusk wallet phrase has 12 words and is not a vault key.

## Devices and approvals

Each computer that holds a member key is a device. When a send needs more than one device, the first device starts it and the others approve it. They do not have to be on the same network: the request travels sealed through a **collector**, Vigil's or your own, and every device checks that an approval comes from a member of the signing group before it counts.

A new device [joins a vault](./quickstart#join-a-vault-someone-else-opened) in several steps. Last, it links to the collector with a **join code** that you read on one device and type on the other. When a device leaves the group, Vigil changes the key that seals the link.

The collector cannot read an amount, a destination or who signs. It can see that a vault is active and when requests arrive. When the collector cannot be used, or a key signs on an offline machine, files do the same job. [Approvals](/v1/vigil/app/approvals) has the details.

## The waiting period

How many blocks a change waits before it can settle. A send above your free amount waits. So does anything that loosens your protection: a larger free amount, a shorter wait, a new payout key, a new signing group. Tightening applies at once.

While a change waits, it is announced by an event, so the app and anyone watching can see it. After the wait, the change settles. Anyone may settle it, including a relayer.

## Send limits

- **The free amount** is how much may leave without waiting. What leaves is charged against a running total, which refills over time from the contract's own clock. It refills up to the free amount over twice your waiting period.
- **The hard maximum** is a ceiling the vault also checks, for example on an agent card's cap.

A change within the free amount cannot be cancelled by anyone. That is the point of it, and the risk of it: set it to what you can afford to lose.

## The cancel key

A key Vigil makes once, when you open the vault. Keep it offline. It never signs a send. It can do two things:

- **Cancel:** cancel a change that is still waiting.
- **Recover:** if your signing group is lost, schedule a move to a new group. A recovery waits the recovery delay, which must be more than twice the waiting period. You can also turn recovery off.

Vigil makes the cancel key only at that moment. You can replace it later on Security › Cancel key › **Replace**, which writes a new key file. The replacement waits, the old cancel key cannot cancel it, and it drops anything the old key scheduled.

## Payout key

Where the vault pays when you close it, when you claim staking rewards and when you exit a position. Changing it always waits.

## Allowed addresses

The addresses your vault may pay without a wait. A new vault starts with the list on. Adding an allowed address waits. Blocking an address applies at once, and a block wins whether the list is on or off. Turning the list off waits; turning it on applies at once.

## Accounts

Separate pots inside one vault. Each has a fixed id, so another contract can pay into a specific account. A vault has up to eight accounts, and it cannot close while an account holds value.

## Staking

You can stake DUSK from the vault. The node keeps its own consensus key; the vault never needs it. A stake of at least 1,000 DUSK waits like any large change. The chain itself needs 1,000 DUSK of stake before it picks a node.

## Fee wallet and relayer

The **fee wallet** is built into Vigil. It is a Dusk account that pays gas for the transactions the app sends, and it is separate from the vault. [Where it is kept](./desktop#where-the-fee-wallet-is-kept), and how to [use your own wallet](./desktop#using-your-own-wallet).

A **relayer** is an optional service that pays gas for some calls on your behalf. You open a **fee grant** for it: a slice of the vault's money it may spend on gas, for the calls you include, until a set expiry. The grant names the relayer's **relay key**. Stopping the grant returns what is left. You never need a relayer: every exit works as your own transaction.

## Agent cards

An agent card lets an app spend up to a cap from your vault without asking your group each time. Arming a card always waits. Its cap counts against your free amount when it starts. Unspent value goes back to your payout key, not to the vault. Agent cards use Chit's escrow and follow Chit's rules for that money.

## Updates

A fix to the vault's software can ship without changing your vault's id. Such a change is announced first and waits out a timelock. [Security](./security) says what an update can and cannot do.

## Next

- [Desktop](./desktop)
- [Approvals](/v1/vigil/app/approvals)
- [Security](./security)
- [Glossary](./glossary)
