import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';
import NotFoundPage from '../pages/404.astro';
import ContactPage from '../pages/contact/index.astro';
import HomePage from '../pages/index.astro';
import ProjectPage, {
  getStaticPaths as getProjectPaths,
} from '../pages/project/[slug].astro';
import CollabeditRedirect from '../pages/project/collabedit.astro';
import ProjectsPage from '../pages/projects/index.astro';
import RepositoriesPage from '../pages/repositories/index.astro';
import { GET as getSitemap } from '../pages/sitemap.xml';
import ToolsPage from '../pages/tools/index.astro';
import WritingPage from '../pages/writing/index.astro';
import { projects } from '../data/projects';

describe('owned static pages', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it.each([
    [HomePage, '/', 'Built in public, from utility to judgment.'],
    [ProjectsPage, '/projects/', 'Products, systems, and useful edges.'],
    [WritingPage, '/writing/', 'Follow the consequence past the demo.'],
    [ToolsPage, '/tools/', 'Useful before you sign in.'],
    [RepositoriesPage, '/repositories/', 'The broader public record.'],
    [ContactPage, '/contact/', 'Bring the unfinished question.'],
  ])('renders %s as meaningful initial HTML', async (Page, path, heading) => {
    const html = await container.renderToString(Page, {
      request: new Request(`https://animesh.kundus.in${path}`),
    });

    expect(html).toContain('<main id="main-content">');
    expect(html).toContain(`<h1>${heading}</h1>`);
    expect(html).toContain(`<link rel="canonical" href="https://animesh.kundus.in${path}">`);
    expect(html).toContain('property="og:title"');
    expect(html).toContain('name="twitter:title"');
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain('aria-label="Primary navigation"');
    expect(html).toContain('aria-label="Footer navigation"');
  });

  it('renders all retained project routes and artifact branches', async () => {
    const paths = getProjectPaths();
    expect(paths).toHaveLength(projects.length);
    expect(paths.map((entry) => entry.params.slug)).toEqual(
      projects.map((project) => project.slug),
    );

    for (const project of projects) {
      const html = await container.renderToString(ProjectPage, {
        props: { project },
        params: { slug: project.slug },
        request: new Request(
          `https://animesh.kundus.in/project/${project.slug}/`,
        ),
      });

      expect(html).toContain(`<h1>${project.title}</h1>`);
      expect(html).toContain(project.sourceUrl);
      expect(html).toContain(`<dd>${project.schemaType}</dd>`);
      expect(html).toContain(`https://animesh.kundus.in/project/${project.slug}/`);
      expect(html).toContain('as of ');

      if (project.liveUrl) expect(html).toContain('Open live surface');
      if (project.creativeWork) expect(html).toContain('The model behind the command');
    }
  });

  it('renders the 404 document and the retired-project redirect stub', async () => {
    const notFound = await container.renderToString(NotFoundPage);
    const redirect = await container.renderToString(CollabeditRedirect);

    expect(notFound).toContain('This path has no current record.');
    expect(notFound).toContain('content="noindex, follow"');
    expect(notFound).toContain('https://animesh.kundus.in/404.html');

    expect(redirect).toContain('http-equiv="refresh" content="0; url=/projects/"');
    expect(redirect).toContain(
      '<link rel="canonical" href="https://animesh.kundus.in/projects/">',
    );
    expect(redirect).toContain('This project record has moved.');
  });

  it('emits one production-absolute sitemap with owned and preserved routes', async () => {
    const response = await getSitemap({} as Parameters<typeof getSitemap>[0]);
    const body = await response.text();

    expect(response.headers.get('Content-Type')).toBe(
      'application/xml; charset=utf-8',
    );
    expect(body).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(body).toContain('<loc>https://animesh.kundus.in/</loc>');
    expect(body).toContain(
      '<loc>https://animesh.kundus.in/project/youtube-audio/</loc>',
    );
    expect(body).toContain('<loc>https://animesh.kundus.in/essays/</loc>');
    expect(body).not.toContain('/test-');
    expect(body).not.toContain('/project/collabedit/');
  });
});
