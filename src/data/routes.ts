import { projects } from './projects';
import { featuredSurfaces } from './repositories';

export const productionOrigin = 'https://animesh.kundus.in';

export const staticRoutes = [
  '/',
  '/projects/',
  '/writing/',
  '/tools/',
  '/repositories/',
  '/contact/',
] as const;

export const canonicalRoutes = [
  ...staticRoutes,
  ...projects.map((project) => `/project/${project.slug}/`),
];

export const sitemapSurfaceRoutes = featuredSurfaces
  .filter(
    (surface) =>
      surface.repository === 'essays' ||
      [
        'mermaid-editor',
        'pdf-viewer',
        'gist-preview',
        'har-viewer',
        'saz-viewer',
        'sanger-viewer',
        'github-router',
        'ai-or-die',
        'kusto-mcp',
        'media-tools',
        'file-tools',
        'photo-tools',
        'fix',
        'oops',
        'runnerize',
      ].includes(surface.repository),
  )
  .map((surface) => surface.path);

export const redirectRoutes = [
  {
    slug: 'collabedit',
    destination: '/projects/',
  },
] as const;
