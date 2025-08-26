import domains from '../data/domains.json';
import categories from '../data/categories.json';
import insights from '../data/insights.json';

function generateSiteMap(host) {
  const urls = [];
  // Static pages
  const staticPages = ['/', '/portfolio', '/categories', '/leasing', '/selling', '/insights', '/contact', '/about', '/faqs', '/playbooks', '/terms', '/privacy', '/cookies', '/escrow-process', '/request-shortlist', '/ventures', '/portfolio/premium', '/portfolio/brandable', '/portfolio/geo', '/portfolio/short'];
  staticPages.forEach((path) => {
    urls.push({ loc: `${host}${path}`, lastmod: new Date().toISOString().split('T')[0] });
  });
  // Domain detail pages
  domains.forEach((d) => {
    urls.push({ loc: `${host}/domain/${d.slug}`, lastmod: new Date().toISOString().split('T')[0] });
  });
  // Category pages
  categories.forEach((c) => {
    urls.push({ loc: `${host}/categories/${c.slug}`, lastmod: new Date().toISOString().split('T')[0] });
  });
  // Insights pages
  insights.forEach((p) => {
    urls.push({ loc: `${host}/insights/${p.slug}`, lastmod: p.publish_date });
  });
  // Compose XML
  const urlSet = urls.map(({ loc, lastmod }) => {
    return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}</urlset>`;
}

export async function getServerSideProps({ res, req }) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = `${protocol}://${req.headers.host}`;
  const sitemap = generateSiteMap(host);
  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
  return { props: {} };
}

export default function SiteMap() {
  return null;
}