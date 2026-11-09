import { writeFileSync } from 'node:fs'
import type { Connect, Plugin } from 'vite'
import { join } from 'node:path'
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { versions } from './versions.mts'
import {
  ALL_PRODUCTS,
  DOCS_SURFACE,
  SIDEBAR_SECTIONS,
  PUBLISHED_PRODUCTS,
  HELD_PAGES,
  isVisible,
} from './published.mts'
import { PRODUCTS } from './products.mts'
import { buildProductSidebar } from './sidebar.mts'
import {
  filterSitemapPaths,
  renderLlmsTxt,
  renderSitemapXml,
} from './machine-surface-lib.mjs'

// Held pages (see HELD_PAGES in published.mts): [slug, path] pairs, prod only.
const ROOT_REDIRECT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Nocturne Standards Docs</title>
  <link rel="canonical" href="/v1/vigil/">
  <meta http-equiv="refresh" content="0; url=/v1/vigil/">
  <script>location.replace('/v1/vigil/')</script>
</head>
<body></body>
</html>
`

function redirectRootToV1(): Plugin {
  const redirect: Connect.NextHandleFunction = (req, res, next) => {
    const path = req.url?.split('?')[0]
    if (path === '/' || path === '/index.html') {
      res.statusCode = 302
      res.setHeader('Location', '/v1/vigil/')
      res.end()
      return
    }
    next()
  }
  return {
    name: 'redirect-root-to-v1',
    configureServer(server) {
      server.middlewares.use(redirect)
    },
    configurePreviewServer(server) {
      server.middlewares.use(redirect)
    },
  }
}

const heldPairs: [string, string][] =
  DOCS_SURFACE === 'prod'
    ? Object.entries(HELD_PAGES).flatMap(([slug, paths]) =>
        (paths ?? []).map((path): [string, string] => [slug, path]),
      )
    : []

export default withMermaid(
  defineConfig({
    srcDir: 'docs',
    title: 'Nocturne Standards Docs',
    description:
      'Nocturne Standards builds apps on DuskDS and DuskEVM: custody, payments and markets, and the contract building blocks they run on.',
    // Paper/ink brand is light-only (matches nocturne-standards.org)
    appearance: false,
    head: [
      [
        'link',
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/assets/nocturne-icon-square-avatar.svg',
        },
      ],
    ],
    // GitHub carve links may 404 until public repos exist. Cross-links into
    // still-gated product trees are expected too (see published.mts).
    ignoreDeadLinks: [
      /^https?:\/\/github\.com\/nocturne-standards\//,
      ...ALL_PRODUCTS.filter((p) => !isVisible(p)).map(
        (p) => new RegExp(`^/v1/${p}/`),
      ),
      // Safety net: links to held pages must not fail the prod build.
      ...heldPairs.map(([slug, path]) => new RegExp(`^/v1/${slug}/${path}(?:[#/?]|$)`)),
    ],
    // Publish gate (see published.mts): unpublished product trees are not
    // built at all, so they 404 instead of just being unlinked.
    // superpowers/** and ops/** are internal working docs, never public
    // VitePress pages, so they're excluded on both surfaces.
    srcExclude: [
      ...ALL_PRODUCTS.filter((p) => !isVisible(p)).map((p) => `v1/${p}/**`),
      ...heldPairs.map(([slug, path]) => `v1/${slug}/${path}.md`),
      'superpowers/**',
      'ops/**',
    ],
    vite: {
      // Bake surface into client bundles so theme components that import
      // published.mts / surface-lib never touch `process` in the browser.
      plugins: [redirectRootToV1()],
      define: {
        __DOCS_SURFACE__: JSON.stringify(DOCS_SURFACE),
      },
      optimizeDeps: {
        include: ['mermaid'],
      },
    },
    mermaid: {
      theme: 'base',
      themeVariables: {
        fontFamily: 'Sora, system-ui, sans-serif',
        fontSize: '13px',
        background: '#f3f1eb',
        primaryColor: '#d5e0ea',
        primaryTextColor: '#1c2430',
        primaryBorderColor: '#1c2430',
        secondaryColor: '#e8e4d9',
        secondaryTextColor: '#1c2430',
        secondaryBorderColor: '#1c2430',
        tertiaryColor: '#f3f1eb',
        tertiaryTextColor: '#1c2430',
        tertiaryBorderColor: '#1c2430',
        lineColor: '#3d6b7a',
        textColor: '#1c2430',
        mainBkg: '#d5e0ea',
        nodeBorder: '#1c2430',
        clusterBkg: '#e8e4d9',
        clusterBorder: '#1c2430',
        titleColor: '#1c2430',
        edgeLabelBackground: '#f3f1eb',
      },
      // Natural size, then CSS shrinks a diagram only when it is wider
      // than the column. useMaxWidth stretches a small graph to full width.
      flowchart: { useMaxWidth: false, nodeSpacing: 18, rankSpacing: 28, padding: 6 },
      sequence: {
        useMaxWidth: true,
        actorMargin: 20,
        messageMargin: 20,
        boxMargin: 6,
        diagramMarginX: 20,
        diagramMarginY: 10,
        noteMargin: 8,
        width: 110,
      },
    },
    themeConfig: {
      logo: {
        light: '/assets/nocturne-mark.svg',
        dark: '/assets/nocturne-mark-dark.svg',
        alt: 'Nocturne Standards',
      },
      siteTitle: 'Docs',
      // Opening the docs lands on Vigil, the first product. The v1 hub stays at /v1/.
      logoLink: '/v1/vigil/',
      nav: [
        { text: 'Deployments', link: '/v1/deployments/' },
        { text: 'Home', link: 'https://nocturne-standards.org' },
        {
          text: versions[0].label,
          items: versions.map((v) => ({ text: v.label, link: v.link })),
        },
      ],
      // Leading glyph = rail icon when sidebar is collapsed (see custom.css)
      // Publish gate (see published.mts): products nest under SIDEBAR_SECTIONS
      // and only render when isVisible (DOCS_SURFACE). Deployments lives in
      // the top nav (live pins), not the sidebar.
      sidebar: {
        '/v1/': [
          ...SIDEBAR_SECTIONS.flatMap((section) => {
            const items = section.slugs
              .filter((slug) => isVisible(slug))
              .map((slug) => buildProductSidebar(slug))
            if (items.length === 0) return []
            return [
              {
                text: section.text,
                collapsed: false,
                items,
              },
            ]
          }),
        ],
      },
      // Contact / Privacy: layout-bottom slot (SiteLegal.vue)
      footer: {
        message: '',
      },
    },
    async buildEnd(siteConfig) {
      const outDir = siteConfig.outDir
      writeFileSync(join(outDir, 'index.html'), ROOT_REDIRECT_HTML, 'utf8')
      if (DOCS_SURFACE !== 'prod') return
      const pages = siteConfig.pages ?? []
      const rawPaths = [
        '/',
        ...pages.map((page) => {
          const p = String(page)
            .replace(/\.md$/, '')
            .replace(/(^|\/)index$/, '/')
          const withSlash = p.startsWith('/') ? p : `/${p}`
          return withSlash.endsWith('/') ? withSlash : `${withSlash}/`
        }),
      ]
      const visible = ALL_PRODUCTS.filter(isVisible)
      const paths = filterSitemapPaths(rawPaths, visible)
      writeFileSync(join(outDir, 'sitemap.xml'), renderSitemapXml(paths), 'utf8')
      const products = PRODUCTS.filter((p) =>
        (PUBLISHED_PRODUCTS as readonly string[]).includes(p.slug),
      ).map((p) => ({ slug: p.slug, title: p.title, blurb: p.oneLiner, github: 'github' in p ? p.github : undefined }))
      writeFileSync(join(outDir, 'llms.txt'), renderLlmsTxt({ products }), 'utf8')
    },
  }),
)
