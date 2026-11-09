# History

History is a record of what the vault has done, newest first. Nothing here moves DUSK, and nothing here waits. Failed attempts are kept too.

## Outcomes

- **Landed.** It confirmed on chain.
- **Failed.** The network refused it.
- **Lapsed.** The wait ended and nobody settled it.

## Reading a card

A card shows a status on the left, a title in the middle and the kind of record on the right. Under the title are the main values. Open the card for the block, the topic and who sent it. At the foot are the block, the date and the transaction id, with a link to the explorer.

- Click an amount to see it in lux.
- Click the transaction id to copy it.
- When a relayer made the call, the card shows a small table of what the fee balance paid.

## Filters

The pills at the top group records by kind. **Queue** holds the steps of a waiting action: a queued entry the app cannot yet match to what it does, a cancelled one, a settled one, the Settle and Cancel calls read from their transactions, and "Removed N expired" when expired entries are swept. Once a queued or settled row matches the action it belongs to, it moves to that action's own pill, such as Send. **Failed** shows only what the network refused. You can also filter by outcome and search the text. The list shows ten records a page. **Refresh** reads again. **Re-sync** appears if the app notices a gap in the activity it read.

## Dates

The first column is the block number. Click it to switch to a date and time, and again to go back. Settings › This computer › Time sets the time zone and the format.

## Next

[Waiting](/v1/vigil/app/waiting), [Settings](/v1/vigil/app/settings)
