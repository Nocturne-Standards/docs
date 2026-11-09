# Session

A session lets an allowed app spend up to a cap from your vault without asking your devices each time. The app holds its own session key. You set the cap, and you can revoke it at any moment.

## Catalogue sessions

A vault holds up to eight sessions at once. Arming one waits. Then you settle it on Waiting, and that pays the cap. Revoke closes a session or frees its slot. Only apps your vault has allowed can be armed.

## Gas is separate

Relay grants for gas are not sessions. They are opened on [Fee](/v1/vigil/app/fee) and filled on [Fund](/v1/vigil/app/fund).

## Where you see progress

After you approve an arm or a revoke, the activity dock shows its stages: signed, sent, included. A delayed action reads "Queued" with a link to Waiting.

## Next

[Waiting](/v1/vigil/app/waiting), [Fee](/v1/vigil/app/fee)
