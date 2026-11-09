# Send

Send moves DUSK out of the vault to an address on Moonlight, Dusk's public account type. The address must be on the allowed list, or the vault refuses it. Add one first on [Destinations](/v1/vigil/app/destinations).

## How it goes

1. Enter an amount and pick an address.
2. The amount field is coloured. Green is within the free amount, so it leaves at once. Amber waits out your waiting period. Red is over the balance or over the largest send the vault allows.
3. Review. The sheet shows the amount, the full address and when the send takes effect. It also shows the gas block. See [Costs](/v1/vigil/costs).
4. Approve. If your signing group needs another device, the review shows how many approvals the send has, and the other devices approve it on [Approvals](/v1/vigil/app/approvals). When there are enough, choose **Submit**.
5. A send that waits appears on [Waiting](/v1/vigil/app/waiting). Settle it there when the wait is over, or cancel it with the cancel key.

## Good to know

- Staked DUSK is not in the send amount.
- Network fees come from the fee wallet, not from the amount.
- The page checks that the vault can pay the amount before it quotes.
- **Cancel** on a send that waits for approvals removes its request from the collector. Nothing happens on the chain.
- **Use files instead** saves a request file. **Open a request** signs a file for another device. Files are the fallback when the collector cannot be reached, or for a cold key on an offline machine. Signing a file does not broadcast, and it does not need a fee wallet.
- If a send may have gone through, the page asks you to check History before you send again.

## Next

[Approvals](/v1/vigil/app/approvals), [Waiting](/v1/vigil/app/waiting), [Rules](/v1/vigil/app/rules)
