# Settings

Settings has four tabs. Nothing secret is shown here.

## This vault

What the open vault was opened with: its name on this computer, the vault number, the contract, the spendable amount, the device keys that sign and how many must sign, the rules, the payout address, the cancel key and the staking node. Each part has a button to the page that changes it. The name is yours and stays on this computer. At the end you can start a new vault.

## Money and gas

DUSK sits in three places, and it does not move between them on its own.

- **The vault.** What you send from. Your rules guard it.
- **The vault's fee balance.** Kept inside the vault for relayed calls.
- **The fee wallet on this computer.** It is built into Vigil and pays the network fee for what you approve. Your rules do not guard it, so keep only a little DUSK in it.

The fee wallet card shows the fee wallet folder and has **Choose…** to pick another ([where the fee wallet is kept](/v1/vigil/desktop#where-the-fee-wallet-is-kept)). The card also sets how long the wallet stays unlocked: **Lock right after each write**, or a number of minutes. To use a wallet you already have, press **Import the wallet file** or **Restore from 12 words** ([steps](/v1/vigil/desktop#using-your-own-wallet)).

The **Gas** card sets the gas price and the gas limit for each kind of call. The recommended numbers suit almost everyone. Change them only if a call keeps running out of gas. Changes wait until you press **Save gas settings**. **Use the recommended numbers** resets them. Every review shows the limit and price it will use. See [Costs](/v1/vigil/costs).

## This computer

- **Network.** Which node this computer asks for the vault's state.
- **Approvals from other devices.** How other devices' approvals reach this computer: Vigil's collector (the default), this computer, another collector, or off for files only. The choice is per computer. You link each vault on [Approvals](/v1/vigil/app/approvals). "What Vigil's collector can see" folds out the plain disclosure.
- **Folder password.** How long Vigil holds it: after each use, or 1, 5 or 15 minutes. The default is 5 minutes. There is no unlimited choice. See [Folder password](/v1/vigil/glossary).
- **Vault folders.** Each folder is one login with its own device key and vault list. Switching asks for that folder's password.
- **Time.** The time zone block dates are shown in, which defaults to this computer's, and the time format.
- **Display.** Density. It only changes how this computer shows things.

## About

The app version, the network, the contract new vaults open on, and whether the contract code and policy program match this app. A mismatch is also raised at the top of every page, with what to do.

## Next

[Costs](/v1/vigil/costs), [Glossary](/v1/vigil/glossary)
