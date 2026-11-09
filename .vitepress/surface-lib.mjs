/**
 * Docs surface helpers (pure). Unset / unknown → prod (safe).
 *
 * Client/theme code must not read `process.env` (undefined in the browser).
 * Vite injects `__DOCS_SURFACE__` via `define` in config.mts from the Node-side
 * resolution at server/build start.
 *
 * @param {NodeJS.ProcessEnv | Record<string, string | undefined>} [env]
 * @returns {'dev' | 'prod'}
 */
export function resolveSurface(env) {
  // Vite `define` replaces this identifier in bundled client modules.
  if (typeof __DOCS_SURFACE__ !== 'undefined') {
    return __DOCS_SURFACE__ === 'dev' ? 'dev' : 'prod'
  }
  const e =
    env ??
    (typeof process !== 'undefined' && process.env ? process.env : {})
  return e.DOCS_SURFACE === 'dev' ? 'dev' : 'prod'
}

/**
 * @param {string} slug
 * @param {readonly string[]} published
 * @param {'dev' | 'prod'} surface
 */
export function isVisibleFor(slug, published, surface) {
  return surface === 'dev' || published.includes(slug)
}
