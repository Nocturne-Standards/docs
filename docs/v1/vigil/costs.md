# Costs and fees

Vigil has three places that hold DUSK, and each pays for different things. This page says which pays for what, how to read the cost before you approve, and where to change the limits.

## Three pots

| Pot | What it is | What it pays |
|---|---|---|
| The vault | The DUSK your rules guard. | What you send, stake or bridge. |
| The fee wallet | A separate Dusk wallet on your computer. | The gas for every transaction you approve in the app. |
| The fee balance | DUSK held inside the vault. | Relayed calls, through a fee grant. |

DUSK never moves between these on its own. Keep only a little in the fee wallet, because your vault rules do not guard it.

## The fee wallet pays gas

Every action in the app is one transaction from the fee wallet, at the gas price and gas limit on Settings. You pay the gas a call uses and never more than its limit. An action that waits costs two transactions: one to queue it and one to settle it. A cancel is one more.

## The gas block in a review

Every review of an action the fee wallet sends has a **Gas** block. It shows:

- **Gas limit.** The most gas the call may use, and where the number came from: your setting, the default, or a charged grant.
- **Gas price.** In lux per gas, and whether it is the default or your setting.
- **Most it can cost.** The limit times the price, paid from the fee wallet. It also shows what the fee wallet holds.

The default limit is 200,000,000 gas and the default price is 1 lux per gas. That is at most 0.2 DUSK for a change or its Settle. A Cancel is limited to 0.06 DUSK, a Fund deposit to 0.02 DUSK and a Remove to 0.04 DUSK. Most calls use far less. A change that only queues uses well under 0.01 DUSK, and most others use about 0.06 DUSK. A stake uses about 0.135 DUSK.

If the fee wallet holds less than the most the call can cost, the review says so and asks you to top it up first.

### Where to change limits

Use **Change limits** in the review, or open Settings › Money and gas. Set the gas price once for all calls. Set a limit for each kind of call. The recommended numbers suit almost everyone, so change them only if a call keeps running out of gas. A failed call costs at most its own limit. Press **Save gas settings** to keep a change. **Use the recommended numbers** resets them.

## Fee balance and grants

The fee balance pays for relayed calls. A relayer is a service that submits your settle or cancel for you and pays the gas up front. A fee grant is a slice of your fee balance that one key may spend, for named calls, until it expires.

- Fill the fee balance on Fund › Fund the fee balance.
- Open and stop grants on the Fee page. See [Fee](/v1/vigil/app/fee).
- The grant must hold the ceiling plus the transfer cost plus the charge before the call runs. The call is charged what it used, so usually less. The review lists each part.
- The heavy relayed call takes at most 0.0719 DUSK in gas and transfer cost (70,000,000 gas plus 1,900,000 repay, at 1 lux per gas). The light class is lower.
- The Fee page also lists what the fee balance paid, per call.

## Relayer charge

A relayer may charge a fixed amount, in lux, on each call it relays. The charge comes from the relayer's signed offer and is paid from the grant. You see it in the review before you open the grant, and again on each call. A grant with no charge shows none.

## Costs by moment

- **Opening a vault.** Have at least 2 DUSK in the fee wallet. 1 DUSK is the **open lock**. You do not choose it. It comes back when the vault closes, after the wait. It is not a fee. Opening is two transactions. You do not need 1,000 DUSK to open. That figure is for a later stake.
- **Closing a vault.** It waits, so two fees. The payout is the balance plus the open lock.
- **Funding the vault.** One fee, plus the DUSK you send in.
- **A send.** A send within the free amount is one fee. A send that waits is one fee to queue and one to settle.
- **Staking.** A stake of 1,000 DUSK or more waits like a large send: one fee to queue and one to settle. A smaller stake goes now, for one fee. Unstake uses the same bands as a send. Claim is one fee.
- **Tightening a rule.** One fee. Loosening waits: one fee to queue and one to settle.

## Sozu minimum

A deposit into the Sozu pool must be at least 5 lux. A smaller deposit is refused before it waits. If it were sent, the pool would refuse it and the gas would be lost.

## Next

[Fee](/v1/vigil/app/fee), [Settings](/v1/vigil/app/settings)
