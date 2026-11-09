# Fund

Fund puts DUSK into the vault, or into the vault's fee balance. The fee wallet pays the gas for both.

## Fund the vault

The amount goes into the vault balance when the transaction confirms. It does not wait. Your waiting period applies to later sends, not to funding. Type the amount in DUSK or lux. Max leaves room for the gas.

## Fund the fee balance

This card appears when your vault has a fee balance. It moves DUSK from the fee wallet into the vault's fee balance. A relayer is paid from that balance when it settles for you. This is not a vault deposit. See [Fee](/v1/vigil/app/fee).

## Top up the fee wallet

Fund spends from the fee wallet, so it cannot fill the fee wallet itself. To do that, use the **Top up** button in the sidebar. It shows the fee wallet's address. Send DUSK to that address from another wallet or an exchange. On testnet, ask the Dusk Testnet Faucet bot on the Dusk Discord: [How to get testnet tokens](https://docs.dusk.network/operator/networks/). Top up appears when the fee wallet is low.

| You want to | Use |
|---|---|
| Put DUSK in the vault | Fund › Fund the vault |
| Prepare the vault to pay a relayer | Fund › Fund the fee balance |
| Give the fee wallet DUSK for gas | Top up in the sidebar |

## Next

[Fee](/v1/vigil/app/fee), [Costs](/v1/vigil/costs)
