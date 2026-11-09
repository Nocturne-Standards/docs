# Fee

Fee shows the vault's fee balance, the grants that let a relayer pay gas for you, and who pays gas by default. The page appears when your vault has a fee balance.

## Fee balance

The fee balance is DUSK held inside the vault for relayed calls. It is not the vault balance and not the fee wallet. Fill it on [Fund](/v1/vigil/app/fund). The DUSK comes from the fee wallet, so get testnet DUSK first: [How to get testnet tokens](https://docs.dusk.network/operator/networks/). With a balance of zero, the page still opens and shows a highlighted **Top up on Fund** button.

## Open grants

A grant lets one key spend a slice of the fee balance on gas. **Open a grant** (top right) opens a form. You set:

- the paying key: the Vigil relay or your own key;
- the cap, which moves from the fee balance into the gas contract;
- the expiry, as a date and time, which the app turns into a block height;
- which calls it may pay for: Queue, Settle, Cancel.

Each grant shows the slice left, when it ends, its key and what it pays. **Payments** opens the history of what that grant paid. **Stop grant** ends the grant, and what is left can go back to the fee balance. Stopping a grant waits like any change, so it takes a Settle.

A vault can have at most three grants, and only when it keeps send, settle and cancel apart.

Automatic retries is off by default: a call is sent once. If the chain refuses it, settle it yourself on [Waiting](/v1/vigil/app/waiting).

Grant fields are public on chain. A grant gives that key the right to relay for your vault until it expires or you stop it. It is not control of the vault.

## What a relayed call costs

The grant must hold the ceiling plus the transfer cost plus the charge before the call runs. The call is charged what it used, so usually less. The review lists the parts, and the charge only when the grant has one. A heavy relayed call takes at most 0.0719 DUSK in gas and transfer cost (70,000,000 gas plus 1,900,000 repay, at 1 lux per gas); a light one takes less.

## Who pays by default

Each action starts with the payer set here. A review can change it for that action only. A relayed call also shows a card in the activity dock, tagged Relayed.

## Next

[Costs](/v1/vigil/costs)
