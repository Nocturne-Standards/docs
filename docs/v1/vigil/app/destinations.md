# Destinations

Destinations is where the vault may send. Two lists decide it.

## Allowed

Addresses the vault may send to. Each entry also says what it may do there, such as send or unstake. A new vault starts with the allow list on. Adding or widening an entry waits, so the cancel key can cancel it. Removing an entry is instant. The mark on an entry is a limit on what it may be used for.

## Blocked

Addresses the vault will never send to. A block always wins, even over the allowed list and even when the list is off. Blocking is instant. Unblocking waits.

## The allow list switch

Turning the list on applies at once. Turning it off waits. While it is off, only blocks apply.

## Names and limits

A label is a name kept on this computer. The chain still sees only the address. Each list holds up to 32 addresses.

Pool, Wicket and router addresses are built into the vault. They are not list slots.

Before you stake with the list on, add the node key's public key here with the stake mark.

## Next

[Send](/v1/vigil/app/send), [Rules](/v1/vigil/app/rules)
