/**
 * The one source per product: name, kind, one-liner, status and links.
 *
 * Read by the docs hubs, `llms.txt`, the sidebar sections (`published.mts`),
 * and `scripts/check-product-skeleton.mjs`. The same one-liner and status go
 * on the website card, the GitHub repo description and the README.
 *
 * Keep this file free of imports and of non-erasable TypeScript (no enums):
 * the check script loads it directly with Node.
 */

export type ProductKind = 'product' | 'building-block' | 'service'

/** Vocabulary from the docs skeleton spec (2026-11-01). */
export type StatusToken =
  | 'design-only'
  | 'mock'
  | 'testnet'
  | 'mainnet'
  | 'not audited'
  | 'docs incomplete'
  | 'wip'

export type ProductMeta = {
  slug: string
  title: string
  /** product = a person uses it; building-block = a project deploys its own copy. */
  kind: ProductKind
  /** What it does for you. Plain, under 15 words (Vigil's is fixed by the spec). */
  oneLiner: string
  /** Tokens in the order they are written on the overview's status line. */
  status: readonly StatusToken[]
  /** One plain sentence: what you can do today and what you cannot. */
  statusSentence: string
  github?: string
}

/** Order here is the sidebar and hub order within each kind. */
export const PRODUCTS = [
  {
    slug: 'vigil',
    title: 'Vigil',
    kind: 'product',
    oneLiner: 'A vault for DUSK where large sends wait and a cold key can stop them.',
    status: ['testnet', 'not audited'],
    statusSentence:
      'Vigil runs on Dusk testnet through its desktop app as a downloadable testnet binary.',
    github: 'https://github.com/Nocturne-Standards/vigil',
  },
  {
    slug: 'wen',
    title: 'WEN',
    kind: 'product',
    oneLiner: 'Trade yes/no outcomes on Dusk without revealing your position until a market closes.',
    status: ['testnet', 'not audited'],
    statusSentence:
      'A testnet portal exists, but access may be gated and the source code is not released yet.',
  },
  {
    slug: 'ambit',
    title: 'Ambit',
    kind: 'product',
    oneLiner: 'A market participant that spends under a Chit allowance.',
    status: ['mock', 'not audited', 'docs incomplete'],
    statusSentence:
      'You can try a hosted mock or run one strategy tick locally, but nothing is submitted to a chain yet.',
    github: 'https://github.com/aichbindas/ambit',
  },
  {
    slug: 'chit',
    title: 'Chit',
    kind: 'product',
    oneLiner: 'Let an agent pay within a cap you set, and revoke it at any time.',
    status: ['testnet', 'not audited', 'docs incomplete'],
    statusSentence:
      'You can run Chit locally against Dusk testnet, and some deeper pages are still missing.',
    github: 'https://github.com/aichbindas/chit',
  },
  {
    slug: 'lien',
    title: 'Lien',
    kind: 'product',
    oneLiner: 'Compliance-gated credit on Morpho Blue, on DuskEVM.',
    status: ['wip', 'not audited'],
    statusSentence:
      'Work in progress: a compliance check decides which wallet may supply collateral or borrow.',
  },
  {
    slug: 'mill',
    title: 'Mill',
    kind: 'product',
    oneLiner: 'Structured credit with tranched facilities, on the same compliance checks as Lien.',
    status: ['wip', 'not audited'],
    statusSentence:
      'Work in progress: a facility splits a credit pool into tranches of different seniority.',
  },
  {
    slug: 'flint',
    title: 'Flint',
    kind: 'product',
    oneLiner: 'Request-for-quote trading where the trade and its payment settle together.',
    status: ['wip', 'not audited'],
    statusSentence:
      'Work in progress: a quote becomes a trade and a payment that settle in the same step.',
  },
  {
    slug: 'loom',
    title: 'Loom',
    kind: 'product',
    oneLiner: 'A committee attests to a value, such as a NAV mark, on-chain.',
    status: ['wip', 'not audited'],
    statusSentence:
      'Work in progress: a committee publishes a value, such as a NAV mark, for other contracts to read.',
  },
  {
    slug: 'plate',
    title: 'Plate',
    kind: 'product',
    oneLiner: 'A compliance-gated security token that settles against cash on-chain.',
    status: ['wip', 'not audited'],
    statusSentence:
      'Work in progress: a gated security token is issued to a cleared wallet and settles against cash.',
  },
  {
    slug: 'atlas',
    title: 'Atlas',
    kind: 'building-block',
    oneLiner: 'A per-deployment directory from a name to a contract id, with one guardian.',
    status: ['testnet', 'not audited'],
    statusSentence:
      'You deploy the directory yourself. The versions in the source tree are listed on this page.',
  },
  {
    slug: 'knot',
    title: 'Knot',
    kind: 'building-block',
    oneLiner: 'M-of-N signing groups on Dusk: an action happens only when enough keys agree.',
    status: ['testnet', 'mock', 'not audited'],
    statusSentence:
      'Knot runs on Dusk testnet, and you can try the Lab in mock mode with no chain at [knot.nocturne-standards.org](https://knot.nocturne-standards.org).',
    github: 'https://github.com/Nocturne-Standards/knot',
  },
  {
    slug: 'latch',
    title: 'Latch',
    kind: 'building-block',
    oneLiner: 'Identity and session gating that links a DuskDS identity to an EVM wallet.',
    status: ['wip', 'not audited'],
    statusSentence:
      'Work in progress: a Dusk identity links to an EVM wallet, and a revoke closes that link.',
  },
  {
    slug: 'treasury',
    title: 'Treasury',
    kind: 'building-block',
    oneLiner: 'Holds and moves protocol-owned funds, named through an Atlas instance.',
    status: ['design-only', 'not audited', 'docs incomplete'],
    statusSentence: 'Nothing is deployed and there is nothing to try yet.',
    github: 'https://github.com/aichbindas/treasury',
  },
] as const satisfies readonly ProductMeta[]

export type ProductSlug = (typeof PRODUCTS)[number]['slug']

export const statusLine = (p: Pick<ProductMeta, 'status' | 'statusSentence'>): string =>
  `**Status:** ${p.status.join(' · ')}. ${p.statusSentence}`
