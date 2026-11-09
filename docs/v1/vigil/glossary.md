# Glossary

One term for one thing. The app and these pages use these words.

## Using a vault

**Vault.** Where your DUSK sits. One contract holds many vaults, one per owner.

**Change.** Anything that moves money or a setting: a send, a stake, a new limit. Your signing group signs it; the vault applies it at once or makes it wait.

**Signing group.** The keys that approve changes to your vault and how many must agree, for example 2 of 3. It is a [Knot](/v1/knot/) account on the chain.

**Device.** One computer that holds one member key of the signing group, protected by its folder password.

**Cancel key.** A key you keep offline. Vigil makes it once, when the vault opens. It can cancel a waiting change and schedule a recovery. It cannot pay anything. The app asks for its file each time and never keeps it. Security › Cancel key › Replace swaps it for a new one.

**Cancel.** Stops a waiting change with the cancel key. Cancel send ends a waiting send. Cancel change ends any other waiting change. It moves no DUSK.

**Settle.** Finishes a change after its wait is over. Anyone can settle, and a relayer can if you gave it a fee grant.

**Remove.** Takes expired entries off the Waiting list. One Remove clears every expired entry, up to 64 in one call. It sends no DUSK.

**Waiting, ready, lapsed.** The three states of a change that waits. Waiting: the cancel key can still cancel it. Ready: its wait is over and it can settle. Lapsed: its settle window ended and nobody settled it.

**Queue.** The vault's list of waiting changes. History has a Queue group for the steps of one that are not yet matched to the action: queued, cancelled, settled, the Settle and Cancel calls, and removal of expired entries. A step that matches its action shows under that action instead.

**Waiting period.** How many blocks a change waits before it can settle. A block takes about 10 seconds, and the app can show any block count as a time.

**Recovery.** Moving the vault to a new signing group with the cancel key, after the recovery delay. Nobody can cancel it with the cancel key.

**Send limits.** The free amount, which may leave without waiting and refills over time, and the hard maximum.

**Allowed addresses.** The addresses your vault may pay without a wait. Adding one waits; blocking one applies at once.

**Payout address.** Where closing the vault, staking rewards, desk payouts and session refunds pay. It is an account, never a contract.

**Open lock.** The DUSK locked when a vault opens. You do not choose the amount. Closing the vault returns it after the wait. It is not a fee.

**Accounts.** Separate pots inside one vault, each with its own fixed id.

**Top up.** Two different things. The Top up button in the sidebar shows the fee wallet's address so you can send DUSK to it. On testnet, the Dusk Discord faucet can send it ([steps](https://docs.dusk.network/operator/networks/)). Fund › Fund the fee balance moves DUSK from the fee wallet into the vault's fee balance.

**Agent card.** Lets an app spend up to a cap from your vault, under Chit's rules. Arming one always waits. Also called a session.

**Folder password.** The password for this computer's Vigil key. It unlocks every vault in that folder, and each folder has its own. Vigil holds it for a time you choose after you use it: after each use, or 1, 5 or 15 minutes. The default is 5 minutes. There is no unlimited choice. A signature starts the time again. Forgetting the key, quitting and switching folders clear it at once.

**Approvals.** The page for requests that wait for people: sends from other devices that need this computer's key, your own sends that wait for approvals, and the link between your devices. Not the same as Waiting, which holds changes that wait for a block. See [Approvals](/v1/vigil/app/approvals).

**Collector.** The service that carries approvals between your devices. Vigil's collector is the default, and you can run your own. It carries them sealed, so it cannot read them. See [Approvals](/v1/vigil/app/approvals).

**Link.** A vault's setup on the collector. Each vault has its own. A device is linked when it can approve through the collector.

**Join code.** A code that links a new device to a vault's link. It is shown on a linked device, typed by hand on the new one, works once and runs out in 10 minutes.

**Key change.** When a device leaves the signing group, Vigil changes the key that seals the link and sends the new one to the other devices.

**Hold.** How long a password stays in memory. With "after each use" it is dropped after its first use. An unused one is cleared 5 minutes after unlock.

**Fee wallet.** The Dusk account built into Vigil that pays gas for the app's transactions. It is separate from the vault and your rules do not guard it.

**Fee balance.** DUSK held inside the vault to pay for relayed calls. It is filled on Fund and is not the vault balance or the fee wallet.

**Fee grant.** A slice of the fee balance that one key may spend on gas, for named calls, until it expires.

**Relayer.** An optional service that pays gas for some calls and is repaid from a fee grant. It may take a fixed charge on each call.

**Gas block.** The part of a review that shows the gas limit, the gas price and the most the call can cost, paid from the fee wallet.

**Relay key.** The key a fee grant names: the relayer's key for that grant.

## Venues

**Sozu, Wicket, the desk.** Places a vault can hold a position. The desk pays a redeem as STDUSK, not DUSK.

**Bridge.** Moves DUSK from a vault to an address on DuskEVM.
