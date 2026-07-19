import { mkdir, writeFile } from 'node:fs/promises';

const siteUrl = 'https://pranavkumarreddya-lgtm.github.io/shvtter-stories';
const pages = [
  '/',
  '/#about',
  '/#portfolio',
  '/#services',
  '/#testimonials',
  '/#team',
  '/#blog',
  '/#contact'
];
const today = new Date().toISOString().slice(0, 10);
const entries = pages.map((page) => `  <url>\n    <loc>${siteUrl}${page}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

await mkdir('dist', { recursive: true });
await Promise.all([
  writeFile('dist/sitemap.xml', sitemap),
  writeFile('dist/robots.txt', robots),
]);

console.log(`Generated sitemap.xml for ${pages.length} page(s).`);
