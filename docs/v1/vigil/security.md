# Security

What the vault promises, what it does not, and how to report a problem.

**Status:** testnet only, not audited. No outside review has been published. Use testnet funds and keys only.

## Two ideas carry most of it

- **Every payment is signed.** Each change names the exact payments it may make and the settings it may change, and your signing group signs that. The vault pays an entry only if it matches exactly, only while its change is due, and only once.
- **Money that leaves at once is capped.** A change that does not wait is charged against your free amount, which refills over time up to the free amount over twice your waiting period. Everything else waits, is announced, and can be cancelled with your cancel key.

## Threat by threat

### Someone changes the vault's software

**What holds.** Changed software still cannot pay anything your signing group did not sign. It cannot queue a change your group did not sign. It cannot move your vault to other signers, another cancel key or another payout key without a signed change that waits. It cannot loosen your waiting period or your send limits. A queued withdrawal to your payout key, or a queued close, settles without it. The change shows up in the vault's records.

**What does not.** It can cancel due changes before they apply; your group signs them again. It can write looser screening records while a signed change of that kind is due, and remove agent-card slots (see [Known gaps](#known-gaps)). Name changes to the software are announced and wait out a timelock, but that timelock is short on testnet, and the app does not yet show a pending one. The app refuses to submit a reviewed change if the software changed since you reviewed it.

### A member key leaks, below the threshold

**What holds.** Only distinct members whose signature verifies over this exact change count. A signature cannot be reused for another change or replayed. You replace the leaked key with a change to the signing group, which waits and can be cancelled.

**What does not.** With a threshold of 1, one key is the whole group. With the threshold met, an attacker moves up to your free amount at once; the rest waits, and you can cancel it with your cancel key.

### The whole signing group is lost

**What holds.** Your cancel key schedules a recovery to a new group. It waits your recovery delay, then the new group acts. The vault checks the cancel key's signature itself, so nothing else has to work for recovery to go through.

**What does not.** If both the signing group and the cancel key are lost, the vault cannot act.

### The cancel key is stolen

**What holds.** The cancel key can only cancel waiting changes and schedule a recovery. It cannot pay anything. Your signing group replaces it, which drops everything the old key scheduled, and the old key cannot cancel its own replacement.

**What does not.** Until you replace it, it can cancel your waiting changes. If you don't notice within the recovery delay, its recovery settles and the attacker's group controls the vault. Changes that don't wait can't be cancelled by anyone; your free amount bounds them.

### An agent key leaks

**What holds.** Arming an agent card always waits. Its cap plus gas reserve may not exceed your hard maximum, and it is charged to your free amount when it starts. Only your payout key can start it, and only your payout key can revoke a live card.

**What does not.** Within the card's terms the agent can spend up to its cap, under Chit's rules for that money. A payee list does not limit payments on chain unless the card is scoped to that payee set. Unspent value returns to your payout key, not to the vault.

### The relayer misbehaves, or its wallet is stolen

**What holds.** A relayer signs nothing for you. It acts only through a fee grant that names its relay key, only for the calls the grant includes, and only before the grant expires. Each call's gas has a ceiling, and the total is bounded by the grant. You never need it: settle, cancel, revoke and close all work as your own transactions. Stopping the grant returns what is left.

**What does not.** It can spend the grant: a relayed call that fails in the vault is still repaid its gas. It can stop serving you. A stolen relay wallet loses its own float, not your vault's money.

### The collector is watched, or misbehaves

**What holds.** Requests and approvals are sealed on your computer before they leave it. The collector, the company that runs it, Cloudflare in front of Vigil's collector and other Vigil users cannot read the amount, the destination or who signs. The collector signs nothing and holds no key that moves money. Every app checks that an approval is from a member of your signing group and drops any that is not. You can run your own collector, or use files only.

**What does not.** The collector sees that a vault is active, how many devices it has, when requests arrive and from which network address. Someone who watches both the collector and the chain may link a vault to its traffic by timing, even though the contents stay secret. Vigil clears requests after a random delay to make that harder, but it does not remove it. A collector can drop or delay a request, so an approval may not arrive. Files still work.

### A linked device is stolen

**What holds.** A locked device gives away nothing: its key and its link are sealed under the folder password. An unlocked one still needs the folder password to sign. Remove the device from the signing group, and Vigil changes the link key so the old one stops working.

**What does not.** Until it is removed from the group, a stolen device that is unlocked can get in the way of the collector path: remove other devices' links, delete waiting requests or add junk. It cannot move funds or forge an approval, and files still work.

### The desktop app is compromised on one machine

**What holds.** That machine holds one member's key. Changes still need the threshold, and each other member's app decodes and shows what it signs. The approve button submits the sheet you reviewed, not what the form says afterwards. Waiting changes can be cancelled with a cancel key kept elsewhere.

**What does not.** A compromised app can show you one thing and ask you to sign another. If that machine holds enough keys for the threshold, the attacker moves up to your free amount at once. If the cancel key file or the payout wallet is on that machine, they are exposed too. Keep the cancel key on other media.

## Always exit

Every position has an exit you start with your own transaction, and none needs the relayer: unstake and claim rewards; leave the Sozu and Wicket positions and the desk (the desk pays a redeem as STDUSK, not DUSK); cancel a waiting change with your cancel key, or drop one past its window; revoke an agent card and stop a fee grant; close the vault, which pays the balance, the gas pool and the deposit to your payout key.

Others' timing still applies: the stake contract's waiting period, each venue's liquidity, and Chit's timing for an agent card's unspent value.

## Known gaps

These are accepted on purpose and written down so nobody mistakes them for guarantees.

- **The collector can link timing to a vault.** The contents of an approval are secret. When it arrives is not. See [The collector is watched](#the-collector-is-watched-or-misbehaves).
- **Screening records are bound to their kind, not their content.** While a signed change to your allowed addresses or agent-card settings is due, changed software could write a looser record than your group signed. It moves no value: every payment still needs its own signed entry.
- **Dropping a due change** is a denial of service, not theft. Your group schedules it again.
- **Opening a vault** moves only the opener's own deposit. Only pay into a vault you opened or checked.
- **An agent-card slot can be removed without a signed change**, so that anyone can clear cards that have closed. Changed software could use this to drop a live slot. The card's money still returns to your payout key, and your payout key can close the card itself.

Still open, waiting on Chit:

- Unspent card value returns to your payout key, not to the vault.
- The app does not generate agent keys. You paste a public key, and nothing checks that someone holds it.
- A card's payee list is stored but not enforced on chain unless the card is scoped to a payee set.
- The card adapter works with Chit's current version and needs an update when Chit changes.

## Report a problem

Email **security@nocturne-standards.org** with the affected part, the steps to reproduce, and the impact. Expect an acknowledgement within 72 hours. Please don't open a public issue for an undisclosed vulnerability. Problems in [Knot](/v1/knot/) go to that project.

## Next

- [Concepts](./concepts)
- [Desktop](./desktop)
- [Costs and fees](./costs)
