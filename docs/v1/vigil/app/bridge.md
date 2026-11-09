# Bridge

Bridge moves DUSK from the vault to an address on DuskEVM. The EVM address must sign off on it first, so only its owner can receive.

## How a bridge goes

0. The EVM address must already be an allowed destination with the bridge mark. Add it on [Destinations](/v1/vigil/app/destinations). Adding it waits, and the cancel key can cancel it.
1. Enter an amount and the EVM address.
2. The address must sign a plain transaction that sends this amount to itself. Sign the hash of the raw transaction in an EVM wallet. A normal sign-message does not produce a signature that matches. The signature is tied to the amount, the address and the nonce. If you change the amount, or the address makes another deposit first, sign again.
3. Paste the signature. It is 65 bytes: `0x` and then 130 hex characters, with r, s and v. A v of 27 or 28 is accepted. The page confirms when the signature matches the address and this transaction. Then review. The app holds the signed transaction and relays it only when you settle the bridge. The key never comes to the app.
4. A bridge always waits. The cancel key can cancel it until you settle it. See [Waiting](/v1/vigil/app/waiting).

## Limits

The bridge budget refills over time. Max uses the smaller of that and your balance. The app cannot see the other chain, so it cannot tell you when the DUSK arrives there.

## Next

[Send](/v1/vigil/app/send)
