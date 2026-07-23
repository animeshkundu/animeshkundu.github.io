import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { surfacesAsOf } from '../data/repositories';
import {
  canonicalRoutes,
  productionOrigin,
  sitemapSurfaceRoutes,
} from '../data/routes';

export const prerender = true;

const lastModified = new Map(
  projects.map((project) => [
    `/project/${project.slug}/`,
    project.updatedAt.slice(0, 10),
  ]),
);

const urls = [
  ...canonicalRoutes.map((path) => ({
    path,
    lastmod: lastModified.get(path) ?? surfacesAsOf,
  })),
  ...sitemapSurfaceRoutes.map((path) => ({
    path,
    lastmod: surfacesAsOf,
  })),
];

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, lastmod }) => `  <url>
    <loc>${new URL(path, productionOrigin).toString()}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
