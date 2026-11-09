# Security

Security shows who may approve changes, and how you recover if a device is lost. The DUSK stays in the vault through all of it.

## Devices

The list shows each device key that signs for the vault and a tag for the one on this computer. The group is a [Knot](/v1/knot/) account on the chain. Names are kept on this computer only. The cancel key and the fee wallet are not members of the group.

**Add device** opens a short flow. Paste the new device's public key here, or create the key here. [Quickstart](/v1/vigil/quickstart#join-a-vault-someone-else-opened) has the full order. A key created here stays on this computer until you move its 24 words somewhere safe. Then choose how many devices must sign. **Create the group** makes the new signing group at once, for a small gas fee. Pointing the vault at it waits, and the cancel key can cancel that wait. Until you press Settle on Waiting, the old group still signs.

Changing who signs waits, so nobody can quietly add their own key.

A new device also needs a link to the collector before it can approve there. That is done on [Approvals](/v1/vigil/app/approvals), with a join code you read and type. If a device leaves the group, Vigil changes the link key and sends the new one to the other devices.

## Approving from another computer

Security says who signs. [Approvals](/v1/vigil/app/approvals) carries the requests between your devices: a send started on one device waits there, and the other devices approve it. If the collector cannot be reached, or a key signs on an offline machine, save a request file instead. The other computer shows the same match code, signs, and saves an approval file. Choose that file here and submit.

## Cancel key

The cancel key is kept offline. Vigil makes it once, when the vault opens. It can cancel waiting changes. It cannot move money. **Replace** writes a new key file and is the only way to change it. The old key cannot stop a replacement, so keep it until the change settles.

## Recovery

**Lost your daily key? Start recovery** hands the vault to another signing group after a long wait. Nobody can cancel it, so check the new group first.

## More keys

The node key is the key you stake to. It cannot move the stake. The open lock is the DUSK locked when the vault opened. Closing the vault returns it after the wait.

## Next

[Approvals](/v1/vigil/app/approvals), [Rules](/v1/vigil/app/rules), [Waiting](/v1/vigil/app/waiting), [Security model](/v1/vigil/security)
