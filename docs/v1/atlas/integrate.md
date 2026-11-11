# Integrate

A counter holds a number. A front door asks Atlas which counter to use. The front door stores the directory and the name `counter`.

The guardian is a key, as on [Deploy](./deploy). A new counter under the same name applies in that call. To make the change wait, use a [warden](./guardian).

## The two contracts

The counter keeps one number.

```rust
pub fn increment(&mut self) {
    self.n = self.n.saturating_add(1);
}

pub fn value(&self) -> u64 {
    self.n
}
```

Deploy that contract twice in this walk. The first id is the one you register. The second id replaces it.

The front door is built against the directory from [Deploy](./deploy). Its `increment` asks for the name `counter`, then calls `increment` on the contract Atlas returns.

```rust
const SERVICE: &str = "counter";

fn increment(&mut self) {
    let name = String::from(SERVICE);
    let found: Option<ContractId> =
        abi::call(ATLAS_ID, "resolve", &name).expect("atlas resolve failed");
    let counter = found.expect("atlas has no counter");
    let _: () = abi::call(counter, "increment", &()).expect("counter increment failed");
}
```

`ATLAS_ID` is the directory id from the build below. The call shapes come from [`nocturne-atlas-encoding`](https://crates.io/crates/nocturne-atlas-encoding) 0.5.0.

## Build the front door

Set `ATLAS_PIN_HEX` to the directory id before you build. It is 64 hex characters. The `build.rs` in the repository's [`docs/consumers.md`](https://github.com/Nocturne-Standards/atlas/blob/main/docs/consumers.md) writes that id into the wasm. The build stops if the variable is missing or not 64 hex characters.

That id stays with this build. Deploying the same wasm again still talks to the same directory.

Those two contracts are `crates/atlas-example-counter` and `crates/atlas-example-front` on [feat/atlas-example](https://github.com/Nocturne-Standards/atlas/tree/feat/atlas-example). The test `example_front_door_re_resolves_after_repoint` deploys a directory, registers `counter`, calls the front door, then points the same name at a second counter. The second counter reads 1. The first still reads 1.

## Swap the counter

Deploy a second counter. The guardian calls `set_service` with the name `counter` and the new id. The front door you already deployed stays where it is. The next `increment` asks Atlas again and calls the new counter.

The first counter is still on the chain. The name no longer points at it.

A different directory is a new build. Set `ATLAS_PIN_HEX` to the new id, build again, and deploy that wasm. The front door already on the chain keeps asking the first directory.
