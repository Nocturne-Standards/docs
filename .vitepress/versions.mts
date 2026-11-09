/**
 * Published docs versions. First entry is latest.
 *
 * Freeze workflow (see VERSIONING.md / `node scripts/freeze-version.mjs <ver>`):
 * 1. Copy `docs/<current>/` → `docs/<next>/` (script).
 * 2. Prepend `{ label: '<next>.x (latest)', version: '<next>', link: '/<next>/' }`.
 * 3. Drop `(latest)` from the previous label; keep its entry for the frozen tree.
 * 4. Add matching sidebars in `config.mts`.
 * Align docs path (`v1`) with release notes; crate semver is separate.
 */
export const versions = [
  { label: 'v1 (latest)', version: 'v1', link: '/v1/' },
] as const

export const CURRENT_VERSION = versions[0].version
