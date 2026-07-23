import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';
import ProjectCard from '../components/ProjectCard.astro';
import SiteFooter from '../components/SiteFooter.astro';
import SiteHeader from '../components/SiteHeader.astro';
import ToolEmbed from '../components/ToolEmbed.astro';
import { getProject } from '../data/projects';
import { tools } from '../data/tools';
import BaseLayout from '../layouts/BaseLayout.astro';

describe('Astro presentation components', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it.each([
    ['/', 'Index'],
    ['/project/fix/', 'Work'],
    ['/writing/', 'Writing'],
    ['/tools/', 'Tools'],
    ['/repositories/', 'Repositories'],
    ['/contact/', 'Contact'],
  ])('renders semantic navigation for %s', async (currentPath, currentLabel) => {
    const html = await container.renderToString(SiteHeader, {
      props: { currentPath },
    });

    expect(html).toContain('aria-label="Primary navigation"');
    expect(html).toContain('aria-label="Mobile navigation"');
    expect(html).toContain('<details class="mobile-menu">');
    expect(html).toContain(`>${currentLabel}</a>`);
    expect(html).toContain('aria-current="page"');
    expect(html).toContain('Switch to dark theme');
  });

  it('renders footer identity and destination links', async () => {
    const html = await container.renderToString(SiteFooter);

    expect(html).toContain('Animesh Kundu');
    expect(html).toContain('aria-label="Footer navigation"');
    expect(html).toContain('https://github.com/animeshkundu');
    expect(html).toContain('Hugging Face');
  });

  it('renders application and source project cards', async () => {
    const application = await container.renderToString(ProjectCard, {
      props: { project: getProject('youtube-audio') },
    });
    const source = await container.renderToString(ProjectCard, {
      props: { project: getProject('fix'), index: 12 },
    });

    expect(application).toContain('W-01');
    expect(application).toContain('RUNNABLE');
    expect(application).toContain('/project/youtube-audio/');
    expect(source).toContain('W-12');
    expect(source).toContain('SOURCE');
    expect(source).toContain('Read the record');
  });

  it('renders every tool with a persistent fallback and its own iframe policy', async () => {
    for (const [index, tool] of tools.entries()) {
      const html = await container.renderToString(ToolEmbed, {
        props: { tool, index: index + 1 },
      });

      expect(html).toContain(`id="${tool.slug}"`);
      expect(html).toContain('Open in a new tab');
      expect(html).toContain(`sandbox="${tool.sandboxTokens}"`);
      expect(html).toContain(`referrerpolicy="${tool.referrerPolicy}"`);
      expect(html).toContain(`title="${tool.name} interactive preview"`);
      expect(html).toContain('loading="lazy"');
    }
  });

  it('renders a complete layout with safe metadata and noindex support', async () => {
    const html = await container.renderToString(BaseLayout, {
      props: {
        title: 'Container test | Animesh Kundu',
        description: 'A complete rendered document for the presentation-layer test.',
        path: '/container-test/',
        jsonLd: { '@context': 'https://schema.org', value: '</script>' },
        ogType: 'article',
        noindex: true,
      },
      slots: {
        default: '<section><h1>Rendered slot</h1><a href="/projects/">Work</a></section>',
      },
    });

    expect(html).toContain('<html lang="en">');
    expect(html).toContain('<title>Container test | Animesh Kundu</title>');
    expect(html).toContain('https://animesh.kundus.in/container-test/');
    expect(html).toContain('content="noindex, follow"');
    expect(html).toContain('property="og:type" content="article"');
    expect(html).toContain(
      'property="og:image" content="https://animesh.kundus.in/og-image.png"',
    );
    expect(html).toContain(
      'name="twitter:image" content="https://animesh.kundus.in/og-image.png"',
    );
    expect(html).toContain('\\u003c/script>');
    expect(html).toContain('Skip to main content');
    expect(html).toContain('Rendered slot');
  });
});
