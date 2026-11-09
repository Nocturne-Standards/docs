# Desktop

The Vigil desktop app is how you use a vault day to day. It runs on your own computer, holds one member key of your signing group, signs and sends its own transactions, and talks to Dusk testnet only. Get the installer from the [Vigil releases page](https://github.com/Nocturne-Standards/vigil/releases): a `.dmg` on macOS, a `.deb` on Linux. It is not notarized. To install it and make a first send, see [Quickstart](./quickstart). For what each page does, see the guides below.

**Status:** testnet only, not audited.

## How approving works

Every change you make in the app ends in a review sheet. The sheet shows what you are about to sign, decoded, including where any money goes. When you approve, the app submits that sheet, not whatever the form says after the sheet opened.

If your signing group's threshold is more than one, the other members approve the same change on their own computers, through the [Approvals](/v1/vigil/app/approvals) page. Each of their apps decodes and shows it too. Your signing group is a [Knot](/v1/knot/) account.

When a change is refused, the app says why. A refusal that approving again cannot fix is marked as such.

## Send DUSK

Pick an amount and an address. A send within your free amount leaves at once. A larger one waits out your waiting period, and the app shows it as waiting until it settles. With allowed addresses on, a send to an address that is not on the list waits.

## Cancel a waiting send

While a change waits, your cancel key can cancel it. You need the cancel key file for this, so bring it from where you keep it. The app asks for the file each time and never keeps it. Cancel is your own transaction to the vault, and it does not need the relayer. When the wait is over, Settle finishes the change.

## Stake from the vault

Stake DUSK from the vault to a node. The node keeps its own consensus key. A stake of at least 1,000 DUSK waits like any large change, and the chain needs 1,000 DUSK of stake before it picks a node. Unstaked DUSK is paid out after the stake contract's own waiting period.

## Pay fees with a relayer

The Fee page shows the vault's fee balance, your fee grants with a Stop grant button, a button to open a grant, and who pays by default. A grant lets a relayer pay gas for the calls you include (Queue, Settle, Cancel), until it expires. The grant must hold the ceiling plus the transfer cost plus the charge before a call runs. The call is charged what it used, so usually less, and the heavy relayed call takes at most 0.0719 DUSK in gas and transfer cost, plus the relayer's charge. Stop grant ends the grant, and what is left can go back to the fee balance. A stop waits like any change.

## Keep money apart in accounts

The Accounts page appears when your vault's version has accounts. It shows totals, one card per account with a name you choose, a way to open one and to send from one. Its Integrate tab gives the details another contract needs to pay into one account. Its History tab lists what moved through your accounts and exports it as CSV.

## Replace a key

- **A member key is lost or leaked:** replace it with a change to the signing group. It waits, and the cancel key can cancel it.
- **The cancel key is lost or leaked:** replace it on Security › Cancel key. The old key cannot cancel that, and anything it scheduled is dropped.
- **The whole signing group is lost:** use the cancel key to schedule a recovery to a new group. It waits the recovery delay and nobody can cancel it, so check the new group carefully first.

## The app, page by page

The sidebar groups the pages by what you do. Fee shows when your vault's release has a fee balance, and Accounts when it has accounts. Waiting shows how many actions are waiting.

| Group | Pages |
|---|---|
| Watch | [Overview](/v1/vigil/app/overview), [Waiting](/v1/vigil/app/waiting), [History](/v1/vigil/app/history) |
| Protect | [Security](/v1/vigil/app/security), [Approvals](/v1/vigil/app/approvals), [Rules](/v1/vigil/app/rules), [Destinations](/v1/vigil/app/destinations) |
| Move | [Send](/v1/vigil/app/send), [Fund](/v1/vigil/app/fund), [Bridge](/v1/vigil/app/bridge), [Accounts](/v1/vigil/app/accounts) |
| Earn | [Staking](/v1/vigil/app/staking), [Sozu](/v1/vigil/app/sozu), [Wicket](/v1/vigil/app/wicket) |
| Fees and sessions | [Fee](/v1/vigil/app/fee), [Session](/v1/vigil/app/session) |
| Season | [Seasons](/v1/vigil/app/seasons) |

[Settings](/v1/vigil/app/settings) has four tabs: This vault, Money and gas, This computer and About. Every page has a **Guide** button in its header with the same help inside the app. What things cost is on [Costs and fees](/v1/vigil/costs).

## Passwords and how long they are held

Two passwords guard the app. Each is typed in a separate Vigil window. The folder password protects this computer's key. The fee wallet password unlocks the wallet that pays gas.

Settings › This computer sets how long Vigil holds the folder password: after each use, or 1, 5 or 15 minutes. The default is 5 minutes. There is no unlimited choice. A signature starts the time again. Forgetting the key, quitting the app or switching folders clears it at once. The fee wallet card in Settings › Money and gas has its own choice: lock right after each write, or a number of minutes. With "after each use" or "lock right after each write", the password is held until its first use and then dropped. If you never use it, it is cleared 5 minutes after you unlock.

## Where Vigil keeps its files

Vigil runs on macOS and Linux. There is no Windows build. In the paths below, `~` is your home folder.

| What | Default path | What it is |
|---|---|---|
| The Vigil folder | `~/.vigil` | This computer's keys and vault list. Each folder has its own folder password. You can pick another folder at start or under Settings › This computer. |
| `factors.dat` | In the Vigil folder | This computer's signing keys, encrypted with the folder password. |
| `index.vigil` | In the Vigil folder | Which vaults this folder holds. Encrypted. |
| `private.vigil` | In the Vigil folder | Vault names, address labels, the activity list, device names and account labels. Encrypted. |
| `index.json` | In the Vigil folder | An empty placeholder. It holds no vault. |
| The fee wallet folder | See [Where the fee wallet is kept](#where-the-fee-wallet-is-kept) | The built-in fee wallet's key store. |
| The config file | `~/.config/vigil/config.toml` | Your node choice and which Vigil folder is in use. Set `VIGIL_CONFIG` to an absolute path to use another file. |
| App local storage | macOS: `~/Library/WebKit/org.aichbindas.vigil`. Linux: `~/.local/share/org.aichbindas.vigil` | Display and timing choices: time zone, time format, density, gas limits, how long the folder password is held, and the idle lock. |
| The cancel key file | Where you saved it | Not in any of the folders above. Vigil refuses to save it inside the Vigil folder or the fee wallet folder. |

Back up the Vigil folder, and keep the 24 words of each key. Without `factors.dat` the folder cannot sign.

### Where the fee wallet is kept

The fee wallet is built into Vigil. Vigil makes it, holds its key in its own encrypted key store (a file named `factors.dat`), and signs gas payments with it. You need no other wallet program. The key store sits in the fee wallet folder, `~/.dusk/rusk-wallet` by default. Settings › Money and gas › **Choose…** picks another folder, and **Use standard folder** goes back to the default.

### Using your own wallet

You can use a wallet you already have. Put its `wallet.dat` file from the Dusk wallet program in the fee wallet folder, then press **Import the wallet file** in Settings › Money and gas. Vigil reads the file once, asks for its password, and moves the key into its own key store. The file is not changed. Or choose **Restore from 12 words**.

## Next

- [Concepts](./concepts)
- [Costs and fees](./costs)
- [Security](./security)
