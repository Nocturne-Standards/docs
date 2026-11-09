# Approvals

Approvals holds the requests that wait for people, and the link that carries them between your devices. It is in the Protect group, after Security.

Two pages sound alike, so keep them apart. [Waiting](/v1/vigil/app/waiting) holds changes that wait for a block, and the cancel key can cancel them there. Approvals holds sends that wait for another device to approve. A send moves from Approvals to Waiting when you submit it.

## Signing groups and devices

Your vault is guarded by a signing group: the device keys that approve changes, and how many of them must agree. Each computer that runs Vigil holds one device key, protected by its folder password. The signing group is a [Knot](/v1/knot/) account, so the group itself lives on the chain. Security shows who is in it and lets you add a device.

A group of 2 of 2 means every send needs two computers. That is the case Approvals is for. With one device, the page stays quiet and Vigil tells you approvals are off for this vault.

## Turn it on for a vault

Each vault has its own link to the collector. The first device turns it on: choose **Turn on**, and type the folder password once. Vigil makes a link for this vault and registers this computer. Other devices of the vault join that link with a join code.

The collector is the service that carries the approvals. See [The collector](#the-collector) below.

## Add a device with the join code

Adding a device has two parts.

1. **Add it to the signing group** on [Security](/v1/vigil/app/security). That is a change to the group, so it waits, and the cancel key can cancel the wait. The full order, including joining the vault, is in the [Quickstart](/v1/vigil/quickstart#join-a-vault-someone-else-opened).
2. **Link it to the collector** so it can approve there. On a device that is already linked, open Approvals and choose **Show join code** next to the new device. Vigil shows a join code on screen. Type it on the new computer, where Approvals asks for it.

About the code:

- You read it and type it by hand. There is no Copy button, so it never goes into the clipboard.
- It works once and runs out in 10 minutes.
- Letters and numbers count. Capitals do not matter. Dashes and spaces are ignored.
- Vigil shows it on that screen only. It is not saved.

The screen on the first device says what is happening: waiting for the other device to type it, then linking, then linked. If the code ran out, choose **Show a new code**.

If you see "That code is not valid, has expired or was already used", ask whether anyone else used it. If it was not you, tell the other device and show a new code.

Both computers must run the same Vigil release. Update the other one first.

## Approve from another device

When another device starts a send that needs this computer's key, it appears under **Waiting for you**. The sidebar shows a badge with the count, and Overview shows one line when something needs you. Vigil checks for requests only for the vault that is open, and only while the app is unlocked. It sends no notification outside the window, because a notification could show an amount or a vault name on a locked screen.

1. Choose **Review**. The sheet shows the amount, the full address, the vault and a match code.
2. Check every line. Then check the match code with the other device.
3. Choose **Approve** and type the folder password. Approving signs with this computer's key.

There is no Decline. If you do not agree, do not approve. The request drops off by itself after 7 days.

After you approve, the row says **You approved**, and the other device collects it. If the approval did not go out, the row says **Not sent** and why. Vigil keeps it in the window and tries again. Locking the app drops it. You can save an approval file instead.

## Your sends

Sends you started that need another device show here, with how many approvals they have and who gave them. When there are enough, the row says **Ready** and you choose **Submit**. The send then waits on [Waiting](/v1/vigil/app/waiting) like any other.

**Cancel** removes the request from the collector. Nothing happens on the chain, so there is nothing to confirm.

A request expires after 7 days if it has too few approvals. Start the send again.

## The collector

You choose per computer, in [Settings](/v1/vigil/app/settings) › This computer.

- **Vigil's collector.** The default. Nothing to set up. Vigil runs it and you reach it over the internet.
- **This computer.** Vigil runs a collector here for your other devices, with a short guided setup. It listens on your home network. Locking Vigil or quitting shuts it down, and requests that were waiting are lost. The device that started a send can send it again.
- **Another collector.** One you or someone you trust runs. You type its address and fingerprint, and confirm the host before the first use.
- **Off.** Files only. See below.

Vigil's collector is Vigil's own. It is not a shared service with Knot.

## What the collector can and cannot see

Approvals are sealed on this computer before they leave it. The collector, the company that runs it, the network in between and other Vigil users cannot read the amount, the destination or who signs.

They can see that a vault is active, how many devices it has, when requests arrive and from which network address. Someone who watches both the collector and the chain may guess which vault it is. Vigil makes that harder by clearing requests after a random delay, but it does not remove it. They cannot move money, sign for you or make Vigil accept an approval from someone outside the signing group.

The collector can drop or delay a request. Then the approval does not arrive. Files still work.

## Cleanup

When a send lands or is cancelled, Vigil removes its request and the approvals from the collector by itself, a short random time later. You do nothing. Any device of the vault that sees the outcome may do it, so a device that went offline does not leave anything behind. A request nobody finishes drops off after 7 days.

## Quiet vaults

A vault that nobody uses on the collector for a week (a month when two or more devices are set up) is dropped from it. Nothing is lost but requests that were still waiting. The next time you use it, Vigil sets it up again. That asks for your folder password once on each device, and a device may wait for another one to finish first.

Vigil never opens a password prompt by itself. A banner with a button asks, and not at all when Vigil already holds the folder password.

## When a device leaves the signing group

A device that is removed from the signing group may still hold the old link key. Vigil changes the key and sends the new one to every other device. It asks for the folder password once. Funds are not at risk. Devices that are offline get the new key the next time they open Vigil.

## Files instead

Files are the fallback. Use them when the collector cannot be reached, and for a cold key on an offline machine. On [Send](/v1/vigil/app/send), save a request file, carry it to the other device, sign it there, and bring the approval file back. The match code is the same on both computers.

## Next

[Security](/v1/vigil/app/security), [Send](/v1/vigil/app/send), [Waiting](/v1/vigil/app/waiting), [Settings](/v1/vigil/app/settings)
