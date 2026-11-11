import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PRODUCTS, type ProductSlug } from './products.mts'
import { isPageHeld } from './published.mts'

/**
 * One helper builds every product's sidebar from the standard groups, in this
 * order. A group appears only when it has pages; no empty template pages.
 */
export const GROUPS = [
  'Start',
  'Understand',
  'Use',
  'Integrate',
  'Operate',
  'Reference',
] as const
export type GroupName = (typeof GROUPS)[number]

/** `path` is relative to /v1/<slug>/; '' is the overview. */
export type PageDef = { text: string; path: string; items?: PageDef[] }
export type SidebarItem = { text: string; link?: string; collapsed?: boolean; items?: SidebarItem[] }

const DOCS_V1 = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'v1')

const OVERVIEW: PageDef = { text: 'Overview', path: '' }

/**
 * Pages per product, by content. Start also gets, automatically when the file
 * exists, the first real step: `deploy-your-own` for a building block,
 * `quickstart` for a product (see `startPages`).
 * Products keep a thin `run-locally` page in Start (it is their first step);
 * building blocks list it under Operate.
 */
export const PRODUCT_PAGES: Record<ProductSlug, Partial<Record<GroupName, PageDef[]>>> = {
  vigil: {
    Understand: [
      { text: 'Concepts', path: 'concepts' },
      { text: 'How it works', path: 'how-it-works' },
      { text: 'Security', path: 'security' },
    ],
    Use: [
      { text: 'Desktop', path: 'desktop' },
      {
        text: 'App pages',
        path: 'app/overview',
        items: [
          { text: 'Overview', path: 'app/overview' },
          { text: 'Waiting', path: 'app/waiting' },
          { text: 'History', path: 'app/history' },
          { text: 'Security', path: 'app/security' },
          { text: 'Approvals', path: 'app/approvals' },
          { text: 'Rules', path: 'app/rules' },
          { text: 'Destinations', path: 'app/destinations' },
          { text: 'Send', path: 'app/send' },
          { text: 'Fund', path: 'app/fund' },
          { text: 'Bridge', path: 'app/bridge' },
          { text: 'Accounts', path: 'app/accounts' },
          { text: 'Staking', path: 'app/staking' },
          { text: 'Sozu', path: 'app/sozu' },
          { text: 'Wicket', path: 'app/wicket' },
          { text: 'Fee', path: 'app/fee' },
          { text: 'Session', path: 'app/session' },
          { text: 'Seasons', path: 'app/seasons' },
          { text: 'Settings', path: 'app/settings' },
        ],
      },
      { text: 'Costs and fees', path: 'costs' },
      { text: 'CLI', path: 'cli' },
    ],
    Integrate: [
      { text: 'Contracts', path: 'contracts' },
      { text: 'Events', path: 'events' },
      { text: 'Refusals', path: 'refusals' },
    ],
    Operate: [
      { text: 'Relayer', path: 'relayer' },
      { text: 'Deploy your own set', path: 'deploy' },
    ],
    Reference: [
      { text: 'Versions and ids', path: 'versions' },
      { text: 'Glossary', path: 'glossary' },
    ],
  },
  wen: {
    Operate: [{ text: 'Admin ops', path: 'admin' }],
  },
  ambit: {
    Start: [{ text: 'Run locally', path: 'run-locally' }],
    Understand: [
      { text: 'Concepts', path: 'concepts' },
      { text: 'Architecture', path: 'architecture' },
      { text: 'Roadmap', path: 'roadmap' },
    ],
  },
  chit: {
    Start: [{ text: 'Run locally', path: 'run-locally' }],
    Understand: [
      { text: 'Concepts', path: 'concepts' },
      { text: 'Architecture', path: 'architecture' },
      { text: 'Roadmap', path: 'roadmap' },
    ],
    Use: [{ text: 'Browser extension', path: 'extension' }],
    Integrate: [
      { text: 'HTTP / API', path: 'api' },
      { text: 'Contracts', path: 'contracts' },
    ],
    Operate: [
      { text: 'Native DUSK cash', path: 'native-cash' },
      { text: 'Indexing', path: 'indexing' },
    ],
  },
  lien: {
    Understand: [
      { text: 'Concepts', path: 'concepts' },
      { text: 'Architecture', path: 'architecture' },
      { text: 'Roadmap', path: 'roadmap' },
    ],
  },
  mill: {},
  flint: {},
  loom: {},
  plate: {},
  atlas: {
    Start: [{ text: 'Deploy', path: 'deploy' }],
    Understand: [{ text: 'Guardian', path: 'guardian' }],
    Integrate: [
      { text: 'Integrate', path: 'integrate' },
      { text: 'On DuskEVM', path: 'evm' },
    ],
    Reference: [{ text: 'Reference', path: 'reference' }],
  },
  knot: {
    Understand: [
      { text: 'Concepts', path: 'concepts' },
      { text: 'How it works', path: 'how-it-works' },
      { text: 'Use cases', path: 'use-cases' },
      { text: 'Architecture', path: 'architecture' },
      { text: 'Who can change what', path: 'who-can-change-what' },
      { text: 'Security and limits', path: 'security' },
      { text: 'Warden', path: 'warden' },
    ],
    Use: [{ text: 'Quickstart (Lab)', path: 'quickstart' }],
    Integrate: [
      { text: 'Integrate', path: 'integrate' },
      { text: 'Contracts', path: 'contracts' },
      { text: 'Reference', path: 'reference' },
      { text: 'On DuskEVM', path: 'evm' },
      { text: 'Collector', path: 'collector' },
    ],
    Operate: [{ text: 'Run locally', path: 'run-locally' }],
  },
  latch: {
    Understand: [
      { text: 'Concepts', path: 'concepts' },
      { text: 'Architecture', path: 'architecture' },
    ],
  },
  treasury: {},
}

const pageExists = (slug: string, path: string): boolean =>
  existsSync(join(DOCS_V1, slug, path === '' ? 'index.md' : `${path}.md`))

/** Overview, then the first real step when its page exists. */
function startPages(slug: ProductSlug, kind: string): PageDef[] {
  const first: PageDef =
    kind === 'building-block'
      ? { text: 'Deploy your own', path: 'deploy-your-own' }
      : { text: 'Quickstart', path: 'quickstart' }
  const own = PRODUCT_PAGES[slug].Start ?? []
  const auto = pageExists(slug, first.path) && !own.some((p) => p.path === first.path) ? [first] : []
  return [OVERVIEW, ...auto, ...own]
}

const linkOf = (slug: string, path: string): string =>
  path === '' ? `/v1/${slug}/` : `/v1/${slug}/${path}`

/** Groups as [name, pages] in standard order, empty groups dropped. */
export function productGroups(slug: ProductSlug): [GroupName, PageDef[]][] {
  const meta = PRODUCTS.find((p) => p.slug === slug)
  if (!meta) throw new Error(`unknown product: ${slug}`)
  return GROUPS.map((g): [GroupName, PageDef[]] => [
    g,
    g === 'Start' ? startPages(slug, meta.kind) : (PRODUCT_PAGES[slug][g] ?? []),
  ]).filter(([, pages]) => pages.length > 0)
}

/** A page, or a collapsed sub-group when it lists `items` (the group itself has no page). */
const pageItem =
  (slug: string) =>
  (p: PageDef): SidebarItem =>
    p.items
      ? { text: p.text, collapsed: true, items: p.items.map(pageItem(slug)) }
      : { text: p.text, link: linkOf(slug, p.path) }

export function buildProductSidebar(slug: ProductSlug): SidebarItem {
  const meta = PRODUCTS.find((p) => p.slug === slug)
  if (!meta) throw new Error(`unknown product: ${slug}`)
  // Held pages (prod only) drop out; a group left empty drops with them.
  const shown = productGroups(slug)
    .map(([name, pages]): [GroupName, PageDef[]] => [
      name,
      pages.filter((p) => !isPageHeld(slug, p.path)),
    ])
    .filter(([, pages]) => pages.length > 0)
  return {
    text: meta.title,
    link: linkOf(slug, ''),
    collapsed: true,
    items: shown.map(([name, pages]) => ({
      text: name,
      collapsed: true,
      items: pages.map(pageItem(slug)),
    })),
  }
}
