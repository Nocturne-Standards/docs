# Rules

Rules are the numbers that make the vault. A tighter rule starts as soon as it confirms. A looser rule waits, so you have time to cancel it with the cancel key.

## The rules

- **Wait for large sends.** How long a send above the limit waits before it goes out. A longer wait is tighter and applies at once. A shorter wait waits out the current period.
- **Send without waiting up to.** Sends at or under this amount go out right away. Changing it down applies at once. Raising it waits.
- **Largest single send.** Anything above this is refused. You can set no limit, which waits.
- **Recovery delay.** How long a recovery waits. It must stay longer than twice the waiting period. Off means no recovery, and the vault is frozen if the keys are lost.
- **Payout address.** Where staking rewards, a closed vault and desk payouts go. It is a Moonlight account, never a contract. Changing it waits.
- **Stake.** A stake of 1,000 DUSK or more waits like any large change. This is a vault rule, not a cap. It is separate from the chain's own minimum, which needs 1,000 DUSK of stake before a node is chosen. An unstake uses the same bands as a send.
- **Settle window** and **waiting actions at once.** Chosen when the vault opened. They cannot change. Another vault is the only way to get other values.

Each editor shows what the change does and whether it waits before you review it. A block count shows as a time too.

## Next

[Send](/v1/vigil/app/send), [Destinations](/v1/vigil/app/destinations)
