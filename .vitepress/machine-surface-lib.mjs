export const SITE_ORIGIN = 'https://docs.nocturne-standards.org'

/**
 * Drop unpublished product trees. Keep non-product paths (hubs, legal, etc.).
 * Normalize `.../index.html` away; require trailing slash on dirs we keep.
 * @param {string[]} paths
 * @param {readonly string[]} visibleSlugs
 */
export function filterSitemapPaths(paths, visibleSlugs) {
  const visible = new Set(visibleSlugs)
  const out = []
  for (const raw of paths) {
    let p = raw.replace(/\/index\.html$/, '/').replace(/\.html$/, '')
    if (!p.startsWith('/')) p = `/${p}`
    if (!p.endsWith('/')) p = `${p}/`
    const m = p.match(/^\/v1\/([^/]+)\//)
    if (m && m[1] !== 'deployments' && !visible.has(m[1])) continue
    if (!out.includes(p)) out.push(p)
  }
  return out
}

/** @param {string[]} paths @param {string} [origin] */
export function renderSitemapXml(paths, origin = SITE_ORIGIN) {
  const body = paths
    .map(
      (p) =>
        `  <url>\n    <loc>${origin}${p === '/' ? '/' : p}</loc>\n  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

/**
 * @param {{ products: { slug: string, title: string, blurb: string, github?: string }[], origin?: string }} opts
 */
export function renderLlmsTxt(opts) {
  const origin = opts.origin ?? SITE_ORIGIN
  const lines = [
    '# Nocturne Standards Docs',
    '',
    `> Integrator documentation for Nocturne Standards. Site: ${origin}/`,
    '',
    'This file is for LLMs and crawlers. It is not an SEO brief.',
    '',
    '## Published products',
    '',
  ]
  for (const p of opts.products) {
    lines.push(`### ${p.title}`)
    lines.push('')
    lines.push(p.blurb)
    lines.push('')
    lines.push(`- Docs: ${origin}/v1/${p.slug}/`)
    if (p.github) lines.push(`- GitHub: ${p.github}`)
    lines.push('')
  }
  lines.push('## Deployments')
  lines.push('')
  lines.push(`Versions and where addresses belong: ${origin}/v1/deployments/`)
  lines.push('')
  return lines.join('\n')
}
