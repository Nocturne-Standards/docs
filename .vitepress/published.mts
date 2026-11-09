import { resolveSurface, isVisibleFor } from './surface-lib.mjs'
import { PRODUCTS, type ProductKind, type ProductSlug } from './products.mts'

/**
 * Publish gate for the v1 docs tree.
 *
 * Visibility for build/nav is `isVisible` (honors DOCS_SURFACE).
 * A product is *public* only when listed in `PUBLISHED_PRODUCTS`.
 *
 * Release checklist (public ship):
 * 1. Add the product to `.vitepress/products.mts` (name, `kind`, one-liner,
 *    status). `SIDEBAR_SECTIONS` ("Products", "Building blocks") and
 *    `ALL_PRODUCTS` are derived from it.
 * 2. Add the slug to `PUBLISHED_PRODUCTS` when it should ship publicly.
 * 3. Add its pages to `.vitepress/sidebar.mts`.
 * 4. Rebuild + deploy (`docs:build` / `deploy` always force prod).
 *
 * Local full-tree review: `npm run docs:dev` (DOCS_SURFACE=dev).
 * Local production preview: `npm run docs:dev:prod`.
 *
 * `deployments` is not a product slug — always on via top-nav link.
 *
 * Sidebar / hub order follows PRODUCTS order within each kind.
 */
const slugsOfKind = (kind: ProductKind): ProductSlug[] =>
  PRODUCTS.filter((p) => p.kind === kind).map((p) => p.slug)

/** Derived from `kind` in products.mts; empty sections are dropped. */
export const SIDEBAR_SECTIONS: { text: string; slugs: ProductSlug[] }[] = [
  { text: 'Products', slugs: slugsOfKind('product') },
  { text: 'Building blocks', slugs: slugsOfKind('building-block') },
].filter((s) => s.slugs.length > 0)

export const ALL_PRODUCTS: ProductSlug[] = SIDEBAR_SECTIONS.flatMap((s) => s.slugs)
export type { ProductSlug }

export const PUBLISHED_PRODUCTS: ProductSlug[] = [
  'vigil',
  'lien',
  'mill',
  'flint',
  'loom',
  'plate',
  'atlas',
  'knot',
  'latch',
]

export const DOCS_SURFACE = resolveSurface()

/**
 * Pages of a published product that build only on the dev surface
 * (DOCS_SURFACE=dev). Paths are relative to /v1/<slug>/, without `.md`.
 * Use for developer-facing pages of a product whose user pages are public.
 */
export const HELD_PAGES: Partial<Record<ProductSlug, string[]>> = {
  vigil: [
    'cli',
    'contracts',
    'events',
    'refusals',
    'relayer',
    'deploy',
    'versions',
    'how-it-works',
  ],
}

/** True only on the prod surface, for a page listed in `HELD_PAGES`. */
export const isPageHeld = (slug: ProductSlug, path: string): boolean =>
  DOCS_SURFACE === 'prod' && (HELD_PAGES[slug] ?? []).includes(path)

export const isPublished = (slug: ProductSlug): boolean =>
  (PUBLISHED_PRODUCTS as readonly string[]).includes(slug)

export const isVisible = (slug: ProductSlug): boolean =>
  isVisibleFor(slug, PUBLISHED_PRODUCTS, DOCS_SURFACE)
