import { describe, expect, it } from 'vitest';
import {
  essays,
  essaysAsOf,
  essaysSourceUrl,
  featuredEssays,
} from '../data/essays';
import { identity, publicGists } from '../data/identity';
import {
  getProject,
  projectCategories,
  projects,
  selectedProjects,
} from '../data/projects';
import {
  featuredSurfaces,
  repositories,
  repositoriesAsOf,
  repositoriesSourceUrl,
  sameOriginSurfaces,
  surfacesAsOf,
  surfacesSourceUrl,
} from '../data/repositories';
import {
  canonicalRoutes,
  productionOrigin,
  redirectRoutes,
  sitemapSurfaceRoutes,
  staticRoutes,
} from '../data/routes';
import { tools } from '../data/tools';
import type { Project } from '../data/types';
import { formatDate, formatNumber } from '../lib/format';
import {
  collectionSchema,
  contactSchema,
  homeSchema,
  projectSchema,
  projectsSchema,
  toolsSchema,
  writingSchema,
} from '../lib/seo';
import { basePath, canonicalUrl, withBase } from '../lib/urls';

describe('durable public data', () => {
  it('keeps identity and public gist references closed to the approved set', () => {
    expect(identity.name).toBe('Animesh Kundu');
    expect(identity.sameAs).toHaveLength(5);
    expect(identity.sameAs).toEqual(
      expect.arrayContaining([
        expect.stringContaining('github.com/animeshkundu'),
        expect.stringContaining('linkedin.com/in/animeshkundu'),
        expect.stringContaining('huggingface.co/animeshkundu'),
        expect.stringContaining('addons.mozilla.org'),
      ]),
    );
    expect(publicGists.map((gist) => gist.sourceName)).toEqual([
      'static_file_server.py',
      'loggly.py',
      'facebook_scrapper.py',
      'rotate_ip_address',
    ]);
  });

  it('enumerates the complete retained project record', () => {
    expect(projects).toHaveLength(29);
    expect(projectCategories).toHaveLength(5);
    expect(selectedProjects.length).toBeGreaterThan(5);
    expect(getProject('fix')?.creativeWork?.name).toBe('cmd-correct');
    expect(getProject('youtube-audio')?.metrics).toHaveLength(2);
    expect(getProject('missing-project')).toBeUndefined();

    for (const project of projects) {
      expect(project.sourceUrl).toMatch(/^https:\/\/github\.com\/animeshkundu\//);
      expect(project.install.length).toBeGreaterThan(0);
      expect(project.usage.length).toBeGreaterThan(20);
      expect(project.updatedAt).toMatch(/^20\d{2}-/);
      expect(project.metrics.every((metric) => metric.asOf && metric.sourceUrl)).toBe(
        true,
      );
    }
  });

  it('publishes dated essay, repository, surface, and tool snapshots', () => {
    expect(essays).toHaveLength(40);
    expect(featuredEssays).toHaveLength(6);
    expect(essaysAsOf).toBe('2026-07-22');
    expect(essaysSourceUrl).toBe('https://animesh.kundus.in/essays/rss.xml');

    expect(repositories).toHaveLength(31);
    expect(repositoriesAsOf).toBe('2026-07-22');
    expect(repositoriesSourceUrl).toContain('api.github.com');
    expect(sameOriginSurfaces).toHaveLength(23);
    expect(surfacesAsOf).toBe('2026-07-22');
    expect(surfacesSourceUrl).toContain('api.github.com');
    expect(featuredSurfaces.some((surface) => surface.repository === 'pyflix')).toBe(
      true,
    );
    expect(featuredSurfaces.some((surface) => surface.repository === 'torrent-dl')).toBe(
      true,
    );

    expect(tools).toHaveLength(6);
    for (const tool of tools) {
      expect(tool.fallbackUrl).toBe(tool.embedUrl);
      expect(tool.privacyVerifiedSource).toMatch(
        /^https:\/\/github\.com\/animeshkundu\//,
      );
      expect(tool.sandboxTokens).toContain('allow-scripts');
    }
  });

  it('defines the canonical, redirect, and preserved-surface routes', () => {
    expect(productionOrigin).toBe('https://animesh.kundus.in');
    expect(staticRoutes).toEqual([
      '/',
      '/projects/',
      '/writing/',
      '/tools/',
      '/repositories/',
      '/contact/',
    ]);
    expect(canonicalRoutes).toHaveLength(35);
    expect(new Set(canonicalRoutes).size).toBe(canonicalRoutes.length);
    expect(redirectRoutes).toEqual([
      { slug: 'collabedit', destination: '/projects/' },
    ]);
    expect(sitemapSurfaceRoutes).toEqual(
      expect.arrayContaining([
        '/essays/',
        '/github-router/',
      ]),
    );
  });
});

describe('formatting and URL helpers', () => {
  it('formats dates and counts consistently', () => {
    expect(formatDate('2026-07-22')).toBe('Jul 22, 2026');
    expect(formatNumber(14484)).toBe('14,484');
  });

  it('keeps navigation base-aware and canonical URLs production-absolute', () => {
    expect(basePath).toBe('/');
    expect(withBase('/projects/')).toBe('/projects/');
    expect(withBase('/')).toBe('/');
    expect(withBase('contact/')).toBe('/contact/');
    expect(withBase('#record')).toBe('#record');
    expect(withBase('mailto:anik.edu@gmail.com')).toBe('mailto:anik.edu@gmail.com');
    expect(withBase('https://example.com/path')).toBe('https://example.com/path');
    expect(canonicalUrl('/project/fix/')).toBe(
      'https://animesh.kundus.in/project/fix/',
    );
  });
});

describe('structured data', () => {
  it('describes the home identity graph and collection pages', () => {
    expect(homeSchema['@graph'].map((entry) => entry['@type'])).toEqual([
      'Person',
      'WebSite',
      'ProfilePage',
      'CreativeWork',
    ]);
    expect(homeSchema['@graph'][0]).toMatchObject({ sameAs: identity.sameAs });

    const projectCollection = projectsSchema(projects.slice(0, 2));
    expect(projectCollection.mainEntity.itemListElement).toHaveLength(2);
    expect(projectCollection.mainEntity.itemListElement[1].position).toBe(2);

    const repositoryCollection = collectionSchema('Repositories', '/repositories/', [
      { name: 'Fix', url: 'https://github.com/animeshkundu/fix' },
    ]);
    expect(repositoryCollection.mainEntity.itemListElement[0]).toMatchObject({
      position: 1,
      name: 'Fix',
    });
    expect(contactSchema['@type']).toBe('ContactPage');
  });

  it('uses artifact-appropriate project schema', () => {
    const application = projectSchema(getProject('youtube-audio')!);
    expect(application['@graph'][0]).toMatchObject({
      '@type': 'SoftwareApplication',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
    });

    const source = projectSchema(getProject('fix')!);
    expect(source['@graph'][0]).toMatchObject({
      '@type': 'SoftwareSourceCode',
      programmingLanguage: 'Rust',
    });
    expect(source['@graph'][1]).toMatchObject({
      '@type': 'CreativeWork',
      name: 'cmd-correct',
    });

    const noTechnology: Project = {
      ...getProject('oops')!,
      technologies: [],
      creativeWork: undefined,
    };
    expect(projectSchema(noTechnology)['@graph'][0]).toMatchObject({
      programmingLanguage: 'Multiple',
    });
  });

  it('describes writing and tools as itemized collections', () => {
    const writing = writingSchema(essays.slice(0, 2));
    expect(writing['@graph']).toHaveLength(3);
    expect(writing['@graph'][1]).toMatchObject({
      '@type': 'BlogPosting',
      headline: essays[0].title,
    });

    const toolCollection = toolsSchema(tools.slice(0, 2));
    expect(toolCollection.mainEntity.itemListElement).toHaveLength(2);
    expect(toolCollection.mainEntity.itemListElement[0].item).toMatchObject({
      '@type': 'SoftwareApplication',
      operatingSystem: 'Web Browser',
    });
  });
});
