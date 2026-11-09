# Staking

Staking puts the vault's DUSK to work on a node and earns rewards. The vault keeps the DUSK. The node key only produces blocks.

## Stake

Stake binds the node's consensus key to the vault. The app reads only the public address from the key file and does not store the file. Keep the file outside the wallet folders. With the allow list on, add the node key under Destinations with the stake mark first. A stake of 1,000 DUSK or more waits like any large change. The chain needs 1,000 DUSK of active stake before it picks a node.

## Unstake and claim

Rewards pay the payout address, which you change on [Rules](/v1/vigil/app/rules). Unstake pays an allowed address and can wait like a send. Claim collects rewards and does not return DUSK to the vault.

## Locked stake

Part of your stake that the network holds back for now. You cannot unstake it until it unlocks.

## Fees

The fee wallet pays gas for stake, unstake and claim. See [Costs](/v1/vigil/costs).

## Next

[Destinations](/v1/vigil/app/destinations), [Overview](/v1/vigil/app/overview)
