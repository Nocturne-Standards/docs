# Roadmap

Lien on DuskEVM testnet can already cache a clearance and fence the tokens around one credit market. The rows below are the work still in front of that.

| When | What changes |
|---|---|
| Now | A person proves clearance on Dusk. The result is cached on DuskEVM, and it expires on its own. A cleared wallet can move the credit tokens only to the market and the router. Pause and a break-glass key cover a late message from the bridge. |
| Next | An issuer or a custodian mints the loan token. A second market can list a different loan asset beside the current one. The current market stays as it was created. |
| Later | Seized collateral can be sold through a [quote market](/v1/flint/). The price can come from a [committee mark](/v1/loom/). Changes to who administers the market wait out a delay. Amounts on the credit market can be hidden. |

## The order the work lands in

1. **Clearance.** The proof stays on Dusk. DuskEVM stores the latest answer and the time it arrived. This is what the testnet cache does.
2. **The fence.** The collateral token and the loan token move only on the allowlist in [Concepts](./concepts#the-fence).
3. **Unwind.** A revoked position can be liquidated. Seized collateral is swept by an admin today. Selling it through a market is the later step.
4. **The price.** An admin sets the testnet price through the adapter. A committee mark replaces that typed-in number without recreating the market.
5. **Administration.** A delay sits in front of a change to who administers the deployment, before anyone runs it as a pilot.
6. **Private amounts.** The clearance result stays a public cache. Hiding the size of a loan is separate work on DuskEVM.

Morpho Blue keeps its upstream license. A production deployment reviews that license before it ships.
