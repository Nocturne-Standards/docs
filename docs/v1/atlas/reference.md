# Reference

Calls on the native directory. DuskEVM names are on [On DuskEVM](./evm).

## Calls

| Call | Who | When it applies |
|---|---|---|
| `init_guardian` | Deploy owner, once | In that call. Sets the guardian and the first delay. |
| `set_service` | Guardian | In that call. |
| `set_guardian`, `set_timelock` | Guardian | After `timelock_blocks`. They share the one pending slot. |
| `accept_guardian` | The account named by a pending guardian change | Required before that change can apply. If the delay has already passed, this call applies it. |
| `cancel_pending` | Current guardian | In that call, for as long as the change has not been applied. |
| `execute_pending` | Anyone | At `execute_at` or any block after it. |
| `resolve`, `guardian`, `timelock_blocks`, `pending`, `pending_accepted` | Anyone | Read. |

`set_service` refuses an empty name, a name longer than 64 bytes, and the all-zero id. From atlas 0.6.0 it also refuses to write an id that is already stored under that name, and it leaves the entry as it was. A different id under the same name updates the entry and emits `service_updated`. On DuskEVM the stored value is a locator: a kind and 32 bytes, as on [On DuskEVM](./evm). Writing the same locator again reverts `Unchanged` and emits nothing. A different kind, or different bytes, updates the name and emits `ServiceSet`.

With a delay of 0, a delay change is applied in the same call. A guardian change still waits for `accept_guardian`, which is the check that the new account can actually send a transaction to the directory. A mistyped key, or a contract that never calls `accept_guardian`, never takes the slot, and the current guardian can cancel it.

Native delays cap at 777,600 blocks, about 90 days if blocks are 10 seconds apart.

One pending change holds whichever of a guardian change or a delay change is in progress, so you finish or cancel it before scheduling the other. Moving a name does not use that slot.

## Versions

| Package | Version | Where |
|---|---|---|
| `nocturne-atlas` | 0.6.0 | `atlas.wasm` from [Nocturne-Standards/atlas](https://github.com/Nocturne-Standards/atlas), via `make release-wasm`. Not on crates.io. |
| `nocturne-atlas-encoding` | 0.5.0 | [crates.io](https://crates.io/crates/nocturne-atlas-encoding). Call and event bytes. `pending_cancelled` carries `execute_at`. |
| `nocturne-atlas-event-decoder` | 0.3.1 | [crates.io](https://crates.io/crates/nocturne-atlas-event-decoder). Host decoder. Cancel records from before 0.6.0 still decode. |
| `nocturne-atlas-test-proxy` | 0.3.0 | Test fixture in the same repository. Not for deployment. |

```toml
atlas-encoding = { package = "nocturne-atlas-encoding", version = "0.5" }
atlas-event-decoder = { package = "nocturne-atlas-event-decoder", version = "0.3" }
```

A crate version is not a contract id. The id you trust is the directory you deployed, checked with `guardian()` and `timelock_blocks()` on that id.
