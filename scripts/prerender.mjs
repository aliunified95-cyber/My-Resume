/**
 * Injects server-rendered HTML and SEO / social tags into dist/index.html so
 * the page is readable without JavaScript and indexable by search engines.
 */
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, meta } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const m = meta();
const base = m.siteUrl ? m.siteUrl.replace(/\/?$/, '/') : '';
const image = base ? `${base}og-image.png` : 'og-image.png';

const head = [
  `<title>${esc(m.title)}</title>`,
  `<meta name="description" content="${esc(m.description)}" />`,
  base && `<link rel="canonical" href="${esc(base)}" />`,
  `<meta property="og:type" content="profile" />`,
  `<meta property="og:title" content="${esc(m.title)}" />`,
  `<meta property="og:description" content="${esc(m.description)}" />`,
  base && `<meta property="og:url" content="${esc(base)}" />`,
  `<meta property="og:image" content="${esc(image)}" />`,
  `<meta property="og:image:width" content="1200" />`,
  `<meta property="og:image:height" content="630" />`,
  `<meta name="twitter:card" content="summary_large_image" />`,
  `<meta name="twitter:title" content="${esc(m.title)}" />`,
  `<meta name="twitter:description" content="${esc(m.description)}" />`,
  `<meta name="twitter:image" content="${esc(image)}" />`,
  m.name &&
    `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: m.name, url: base || undefined })}</script>`,
]
  .filter(Boolean)
  .join('\n    ');

const file = path.join(dist, 'index.html');
let html = await readFile(file, 'utf8');
html = html.replace(/<!--app-head:start-->[\s\S]*?<!--app-head:end-->/, head);
html = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);
await writeFile(file, html);
await rm(ssrDir, { recursive: true, force: true });
console.log('Prerendered dist/index.html');
