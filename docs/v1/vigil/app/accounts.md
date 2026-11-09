# Accounts

Accounts are purses inside the vault that contracts pay into by name. They are not the vault balance and not the fee balance. The page appears only when your vault's version has accounts.

## Paying in

Only a contract can pay into an account today. It calls the vault with a note that names the account. A deposit from a wallet does not enter an account.

## Sending out

A send from an account waits your waiting period and needs the signing group, like any send. The cancel key can cancel it.

## Names and ids

A new account's id is fixed by the vault and its slot, so an integrator can know it before the account exists. Names are kept on this computer only. The Integrate tab shows what another contract needs to pay into one account. The History tab lists what moved through your accounts and exports it as CSV.

## Closing the vault

Closing does not pay the accounts. Send each balance out first.

## Next

[Send](/v1/vigil/app/send), [Concepts](/v1/vigil/concepts)
