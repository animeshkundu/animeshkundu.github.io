import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const dist = process.env.DIST_DIR || 'dist';
const productionOrigin = 'https://animesh.kundus.in';

const collect = async (directory, paths = []) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path, paths);
    else paths.push(path);
  }
  return paths;
};

const routeFor = (file) => {
  const local = relative(dist, file).split(sep).join('/');
  if (local === 'index.html') return '/';
  if (local === '404.html') return '/404.html';
  return `/${local.replace(/index\.html$/, '')}`;
};

const valueOf = (html, pattern, label, route) => {
  const value = html.match(pattern)?.[1];
  if (!value) throw new Error(`${route} is missing ${label}`);
  return value;
};

const files = await collect(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const canonicalPages = htmlFiles.filter(
  (file) =>
    routeFor(file) !== '/404.html' &&
    routeFor(file) !== '/project/collabedit/',
);

if (canonicalPages.length !== 35) {
  throw new Error(`Expected 35 canonical pages, found ${canonicalPages.length}`);
}

const titles = new Set();
const descriptions = new Set();

for (const file of canonicalPages) {
  const route = routeFor(file);
  const html = await readFile(file, 'utf8');
  const title = valueOf(html, /<title>([^<]+)<\/title>/i, 'title', route);
  const description = valueOf(
    html,
    /<meta name="description" content="([^"]+)"/i,
    'description',
    route,
  );
  const canonical = valueOf(
    html,
    /<link rel="canonical" href="([^"]+)"/i,
    'canonical',
    route,
  );
  valueOf(html, /<meta property="og:title" content="([^"]+)"/i, 'Open Graph title', route);
  valueOf(html, /<meta property="og:description" content="([^"]+)"/i, 'Open Graph description', route);
  const socialImage = valueOf(
    html,
    /<meta property="og:image" content="([^"]+)"/i,
    'Open Graph image',
    route,
  );
  valueOf(html, /<meta name="twitter:title" content="([^"]+)"/i, 'Twitter title', route);
  const twitterImage = valueOf(
    html,
    /<meta name="twitter:image" content="([^"]+)"/i,
    'Twitter image',
    route,
  );
  valueOf(html, /<main[^>]*>([\s\S]+)<\/main>/i, 'main content', route);

  if (!canonical.startsWith(productionOrigin)) {
    throw new Error(`${route} has a non-production canonical: ${canonical}`);
  }
  if (
    socialImage !== `${productionOrigin}/og-image.png` ||
    twitterImage !== socialImage
  ) {
    throw new Error(`${route} has an unsupported social preview image`);
  }
  if (titles.has(title)) throw new Error(`Duplicate title: ${title}`);
  if (descriptions.has(description)) {
    throw new Error(`Duplicate description: ${description}`);
  }
  titles.add(title);
  descriptions.add(description);

  const json = valueOf(
    html,
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/i,
    'JSON-LD',
    route,
  );
  JSON.parse(json);
}

const redirect = await readFile(join(dist, 'project/collabedit/index.html'), 'utf8');
const redirectTarget = valueOf(
  redirect,
  /<meta http-equiv="refresh" content="0; url=([^"]+)"/i,
  'redirect target',
  '/project/collabedit/',
);
const redirectCanonical = valueOf(
  redirect,
  /<link rel="canonical" href="([^"]+)"/i,
  'redirect canonical',
  '/project/collabedit/',
);
if (
  !redirectTarget.endsWith('/projects/') ||
  redirectCanonical !== `${productionOrigin}/projects/`
) {
  throw new Error('collabedit redirect stub is incomplete');
}

const sitemapFiles = files.filter((file) =>
  file.toLowerCase().includes('sitemap'),
);
if (sitemapFiles.length !== 1 || !sitemapFiles[0].endsWith('sitemap.xml')) {
  throw new Error(`Expected one sitemap.xml, found ${sitemapFiles.join(', ')}`);
}

const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${productionOrigin}/sitemap.xml`)) {
  throw new Error('robots.txt points to the wrong sitemap');
}

console.log(
  `Static contract passed for ${canonicalPages.length} canonical pages and one redirect stub.`,
);
