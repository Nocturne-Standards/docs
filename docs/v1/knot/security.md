# Security and limits

**Status:** Knot runs on Dusk testnet and isn't audited yet. Report a problem to the address in the Knot repo `SECURITY.md`.

The chain is the authority. The Lab helps you sign. A collector only stores a
file. If your product treats a Lab response as the quorum, that product owns
the Lab's trust, and it should say so in its own docs.

Knot's writes are **Prove**: the contract checks members, threshold, and
signatures again. **Coord** would be an off-chain tool saying "good enough"
and the chain believing it. Knot does not do that.

Longer maintainer write-up:
[`docs/security-model.md`](https://github.com/Nocturne-Standards/knot/blob/main/docs/security-model.md).

## Who holds keys

| Piece | Job | Holds keys? |
|---|---|---|
| `knot-encoding` | Digests, event payloads, fingerprints | No |
| `knot-registry` | Group API and quorum checks | No |
| `knot-registry-data` | Account book | No |
| `knot-proposals` | Propose / approve / finalize | No |
| `knot-proposals-data` | Proposal book | No |
| `knot-warden` | Atlas service-repoint delay | No |
| `knot-tool` | Local Lab + CLI | **Yes** (local only) |
| `knot-collector` | Shared mailbox | No |

## Must be true

| Moment | What the chain requires |
|---|---|
| A message you invented | Your domain and a nonce are in the bytes |
| After `create_account` | You read the account back and use that id |
| A book write | The caller is the API Atlas resolves for that name |
| Owner config | Direct account call. `init_data` is one book |
| Finalize | Current members, threshold, this API's id in the digest, generation from open |
| Approve | Stores the signature. The generation check is finalize, not approve |
| After quorum | Account delay can still hold the action. Cancel needs a new quorum and does not start another wait |
| Your contract is the target | `abi::caller()` is the proposals API |
| Warden is the guardian | Atlas `timelock_blocks` stays above 0 |

A proposal summary shown in a UI is display text. The digest is the fields in
[Contracts](./contracts). Member order is part of a `change_account` digest.

| Off the chain | Keep |
|---|---|
| Lab | Testnet only. Keys in the process or a local store. Loopback. Cookie session |
| `KNOT_PWD` | Only together with `KNOT_ALLOW_ENV_PWD=1` |
| Collector | Hostile. Recompute before sign. TLS and auth on the proxy |
| "Is my key a member?" in the Lab | Helpful. The chain is still the check |

## Known limits

- Proposals serve one bound group per deployment.
- 16 members per group. Function name 64 bytes. Arguments 4096 bytes. `proposal_ttl` at most 100,000 blocks.
- Cancel needs a quorum and only applies to queued proposals and pending member changes.
- No target allowlist. The target must check `abi::caller()`. Finalize refuses Proposals itself and its book.
- A free read of `verify_quorum` can say false for a signature a transaction accepts. The query VM uses the pre-hardfork verify policy.
- Hardware keys are not supported yet. We hope to add them. Until then the Lab keystore is for testing, not for keys that guard anything real.
- The collector is unauthenticated by design. Login and TLS go on the proxy.
- A redeploy is a new contract id. Rows are not migrated.
- A book build with `ATLAS_PIN_HEX` missing fails. It does not fall back to a placeholder Atlas id.

## Integrator checklist

The steps live on [Integrate](./integrate). Short form:

1. Put a distinct domain label on every message you pass to `verify_quorum`.
2. Bind replay context (nonce, one-shot state, or both) into that message.
3. After `create_account`, verify the stored account and returned id before use.
4. If finalize calls you, check `abi::caller()` against the proposals API id.
5. Point Atlas `knot-registry` and `knot-proposals` at the API ids, not the books.
6. Do not trust collector contents or free "verify" HTTP reads for live
   correctness - recompute locally, then use real writes / account reads.
7. Knot exports only its own digests. A product that signs its own message
   format defines and documents that domain itself.
