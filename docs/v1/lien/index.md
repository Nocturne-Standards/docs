# Lien

**Status:** wip · not audited. Work in progress: a compliance check decides which wallet may supply collateral or borrow.

Lien is credit with a compliance check. A person proves they are allowed on Dusk. That result is written onto DuskEVM, and only then can their wallet supply collateral or borrow. The position stays in their wallet. If the proof is revoked, the position can be unwound.

The credit market itself is Morpho Blue. The check sits in front of it: the market contract is unchanged, and the gate is the part Nocturne is building.

## Next

- [Concepts](./concepts): the cache, the token fence, and unwind
- [Architecture](./architecture): which contract keeps which fact
- [Roadmap](./roadmap): what the testnet does today, and what is still being built
- [Latch](/v1/latch/): the clearance check Lien reads
