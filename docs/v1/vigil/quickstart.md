# Quickstart

This page takes you from the installer to a first send on Dusk testnet, and shows how to cancel one. It uses the Vigil desktop app.

**Status:** testnet only, not audited. Don't use keys or funds you care about.

## What you need

- A Mac or a Linux computer. There is no Windows build.
- Some testnet DUSK, to pay gas and to fund the vault. Dusk's testnet faucet is a bot on the Dusk Discord. [How to get testnet tokens](https://docs.dusk.network/operator/networks/) in the Dusk docs has the steps. The faucet sends to one wallet address once every 24 hours.
- Somewhere to keep the cancel key file that is not this computer, such as a USB stick.

## 1. Install the app

Download the installer for your system from the Vigil releases page, [github.com/Nocturne-Standards/vigil/releases](https://github.com/Nocturne-Standards/vigil/releases): a `.dmg` on macOS, a `.deb` on Linux. It is not notarized. On macOS the system blocks the first open: Control-click the app, choose Open, then Open again.

The app signs and sends its own transactions. You need no other wallet program.

## 2. Set your two passwords

The app asks for two passwords. Each is typed in a separate Vigil window, not in the page.

- **The folder password** protects this computer's Vigil key. Vigil can hold it for a short time after you use it, so you are not asked for every action. You choose how long under Settings › This computer. The default is 5 minutes.
- **The fee wallet password.** The fee wallet is built into Vigil. It is a separate Dusk account that pays gas for everything you approve. Create it in the app, restore it from its 12 words, or import a wallet file you already have. [Desktop](./desktop#where-the-fee-wallet-is-kept) says where it is kept.

## 3. Fund the fee wallet

The sidebar shows the fee wallet and its balance. When the balance is low it shows a **Top up** button. It shows the fee wallet's address. Send testnet DUSK to that address. Ask the Dusk Testnet Faucet bot on the Dusk Discord, or send from another wallet. [How to get testnet tokens](https://docs.dusk.network/operator/networks/).

Have at least 2 DUSK there before you open a vault. 1 DUSK is the open lock, and the rest pays gas. See [Costs](./costs).

## 4. Create a vault

Open **Create a vault**. It has five steps and one review. Nothing is written to the chain and no DUSK moves until you open.

| Step | What you do |
|---|---|
| This folder's key | Name the key that signs on this computer. Write down its 24 words when they are shown. A key is made only in an empty folder. A folder that already has a key asks for its folder password instead. |
| Who signs | A new vault opens with this computer's key alone, 1 of 1. You can add devices later on Security. |
| Rules | How long large sends wait and how much may leave without waiting. The defaults suit most vaults. |
| Payout address | Where closing the vault and staking rewards pay. Pick an account you can spend from. |
| Cancel key | Choose where its file is written. Vigil makes the cancel key once, when the vault opens. |

Then review and open the vault. Store the cancel key file offline, away from this computer. It is how you cancel a send, and without it nothing can cancel a bad waiting change. Security › Cancel key › **Replace** can later swap it for a new key. See [Concepts](./concepts#the-cancel-key).

## 5. Deposit

Go to **Fund** and put some testnet DUSK into the vault. It lands in the vault balance when the transaction confirms. It does not wait.

## 6. Allow an address, then send

Money leaves the vault only to allowed addresses.

1. Open **Destinations** and add an address of yours. Adding an address waits, so the cancel key can cancel it.
2. Open **Waiting**. When the entry is ready, press **Settle**.
3. Open **Send**, pick that address, and send a small amount. A send within your free amount leaves at once. Nobody can cancel it.

## 7. Cancel with the cancel key

Send an amount above your free amount. It waits out your waiting period and shows on **Waiting**.

1. Press **Cancel send** on its card.
2. Choose the cancel key file. The app asks for it each time and never keeps it.
3. Review and approve. The send is cancelled and no DUSK moves.

## 8. Settle

Send another amount above your free amount and let it wait. When the card says Ready, press **Settle**, review and approve. The send then goes out. You pay the gas for settling. If you open a fee grant on the Fee page, a relayer can settle for you.

Each review shows a gas block with the limit and price. Read it before you approve. See [Costs](./costs).

## Join a vault someone else opened

A vault's signing group can include more than one computer. A computer joins in this order. Each step needs the one before it.

1. **Make this computer's key.** On the joining computer, open Vigil and open **Create a vault**. In step **This folder's key**, choose a folder password and write down the 24 words. The step then shows the key's public key. Copy it with the copy button. Leave the page with **Back** and do not finish the vault. The Join page does not make a key and does not show one.
2. **Send the public key to the vault's owner.** The owner is a member of the signing group.
3. **The owner adds the key.** On Security, the owner chooses **Add device**, pastes your public key, names it, and sets how many devices must sign. **Create the group** makes a new signing group for a small gas fee. Then the owner approves, which points the vault at the new group. That change waits, and the cancel key can cancel it. When Waiting says Ready, the owner presses **Settle**.
4. **The owner sends you four values from the vault card.** The contract and the cancel public key are on Settings › This vault. The vault number is there too and on Vaults. The signing group is the **new** group number on Security. Send the cancel public key, not the cancel key file.
5. **Join.** On the joining computer, choose **Add a vault** › **Join an existing one**. Enter the contract, the vault number, the signing group and the cancel public key. Type the folder password in the separate Vigil window. Press **Check and save**.

Vigil then checks the chain. The vault must exist. Its signing group must match your number. One of this folder's keys must be in that group. The cancel key on the chain must match the one you typed. If one check fails, Vigil saves nothing and says which one. "This key is not in the signing group yet" means step 3 has not settled, or you used an old group number.

When the checks pass, Vigil saves one row. It copies no seed, fee wallet or cancel file. The vault opens on the Overview.

6. **Link the collector (optional).** On [Approvals](/v1/vigil/app/approvals), type the join code that a linked device shows you, so this computer can approve through the collector. You can skip this and use files instead.

## Where things live

| What | Where |
|---|---|
| This computer's Vigil key and the list of your vaults | The Vigil folder, `~/.vigil` by default. Don't delete it: it holds the keys for every vault opened from it. |
| The fee wallet | [Where the fee wallet is kept](./desktop#where-the-fee-wallet-is-kept) |
| The cancel key | Wherever you saved it, outside both folders |
| Names, activity and display choices | Encrypted in the Vigil folder, and the app's local storage on this computer |

[Desktop](./desktop#where-vigil-keeps-its-files) has the paths for each system and what each file is.

## Next

- [Desktop](./desktop): the app page by page
- [Costs and fees](./costs)
- [Concepts](./concepts): the waiting period, send limits and the cancel key
- [Security](./security): what holds, and what does not
- [Glossary](./glossary)
