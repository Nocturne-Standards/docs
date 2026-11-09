# Sozu

Sozu is a shared staking pool on Dusk. The page has two parts, Pool and Desk.

## Pool

You deposit DUSK and get shares. The pool stakes the DUSK, and each share is worth the DUSK it can be turned back into. Deposits wait first. Taking DUSK out is quicker. The pool allows one unstake in flight, so a second is refused until the first finishes.

**The minimum deposit is 5 lux.** A deposit below it is refused before it waits. Without that check the pool would fail it after the gas was spent.

## Desk

The desk is a second way into Sozu through the same ledger. You deposit DUSK for desk shares. These are the four actions:

- **Deposit** and **redeem** are the standard actions. Redeem turns shares into liquid STDUSK.
- **Liquid** sends the liquid STDUSK of a row to the payout address. The payout address is fixed per row. You change it on Rules.
- **Claim** collects the part of a redeem that unlocks later. It arrives as DUSK in the vault. It does not stake again.

## Next

[Wicket](/v1/vigil/app/wicket), [Rules](/v1/vigil/app/rules)
