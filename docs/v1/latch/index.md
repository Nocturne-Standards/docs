# Latch

**Status:** wip · not audited. Work in progress: a Dusk identity links to an EVM wallet, and a revoke closes that link.

Latch is the identity check the other products call. It ties a Dusk identity to an EVM wallet and keeps a session for that link. A revoke on Dusk is what closes the wallet's access. [Lien](/v1/lien/) is the credit product that reads this check before someone may borrow.

## Next

- [Concepts](./concepts): the session, the revoke, and the wallet link
- [Architecture](./architecture): the four contracts and the bridge to DuskEVM
