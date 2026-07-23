import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Browser, type Page } from '@playwright/test';

const productionOrigin = 'https://animesh.kundus.in';
const basePath = `/${(process.env.VITE_BASE_PATH || '/').replace(/^\/|\/$/g, '')}`;
const localPath = (path: string) =>
  basePath === '/' ? path : `${basePath}${path.replace(/^\//, '/')}`;
const toolCount = 6;
const projects = [
  ['youtube-audio', 'SoftwareApplication'],
  ['fix', 'SoftwareSourceCode', 'CreativeWork'],
  ['oops', 'SoftwareSourceCode'],
  ['condukt', 'SoftwareSourceCode'],
  ['github-router', 'SoftwareSourceCode'],
  ['ai-or-die', 'SoftwareApplication'],
  ['kusto-mcp', 'SoftwareSourceCode'],
  ['runnerize', 'SoftwareSourceCode'],
  ['mermaid-editor', 'SoftwareApplication'],
  ['pdf-viewer', 'SoftwareApplication'],
  ['gist-preview', 'SoftwareApplication'],
  ['har-viewer', 'SoftwareApplication'],
  ['saz-viewer', 'SoftwareApplication'],
  ['sanger-viewer', 'SoftwareApplication'],
  ['media-tools', 'SoftwareApplication'],
  ['file-tools', 'SoftwareApplication'],
  ['photo-tools', 'SoftwareApplication'],
  ['torrent-dl', 'SoftwareSourceCode'],
  ['pyflix', 'SoftwareSourceCode'],
  ['media-server', 'SoftwareSourceCode'],
  ['pyscrape', 'SoftwareSourceCode'],
  ['file-dl', 'SoftwareSourceCode'],
  ['yt-flask', 'SoftwareSourceCode'],
  ['funnel', 'SoftwareSourceCode'],
  ['flake', 'SoftwareSourceCode'],
  ['ml', 'SoftwareSourceCode'],
  ['msp_api', 'SoftwareSourceCode'],
  ['msp_scraper_lib', 'SoftwareSourceCode'],
  ['html5_game', 'SoftwareApplication'],
] as const;
const canonicalRoutes = [
  '/',
  '/projects/',
  '/writing/',
  '/tools/',
  '/repositories/',
  '/contact/',
  ...projects.map(([slug]) => `/project/${slug}/`),
];
const routeRecords = canonicalRoutes.map((path) => ({
  path,
  project: projects.find(([slug]) => path === `/project/${slug}/`),
}));

const readAttribute = (html: string, pattern: RegExp, label: string) => {
  const value = html.match(pattern)?.[1];
  expect(value, `missing ${label}`).toBeTruthy();
  return value!;
};

const blockRemoteSurfaces = async (page: Page) => {
  await page.route(`${productionOrigin}/**`, (route) => route.abort());
};

const createPage = async (
  browser: Browser,
  options: Parameters<Browser['newContext']>[0] = {},
) => {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await blockRemoteSurfaces(page);
  return { context, page };
};

test.describe('static portfolio contract', () => {
  test('ships unique production metadata and artifact schema in initial HTML', async ({
    request,
  }) => {
    expect(routeRecords).toHaveLength(35);
    const titles = new Set<string>();
    const descriptions = new Set<string>();

    for (const { path, project } of routeRecords) {
      const response = await request.get(localPath(path));
      expect(response.status(), path).toBe(200);
      const html = await response.text();

      const title = readAttribute(html, /<title>([^<]+)<\/title>/i, `${path} title`);
      const description = readAttribute(
        html,
        /<meta name="description" content="([^"]+)"/i,
        `${path} description`,
      );
      const canonical = readAttribute(
        html,
        /<link rel="canonical" href="([^"]+)"/i,
        `${path} canonical`,
      );
      const ogUrl = readAttribute(
        html,
        /<meta property="og:url" content="([^"]+)"/i,
        `${path} Open Graph URL`,
      );
      const json = readAttribute(
        html,
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/i,
        `${path} JSON-LD`,
      );
      const schema = JSON.parse(json) as {
        '@type'?: string;
        '@graph'?: Array<Record<string, unknown>>;
        mainEntity?: { '@type'?: string };
      };

      expect(title.length).toBeGreaterThan(15);
      expect(description.length).toBeGreaterThan(70);
      expect(titles.has(title), `duplicate title on ${path}`).toBe(false);
      expect(descriptions.has(description), `duplicate description on ${path}`).toBe(
        false,
      );
      titles.add(title);
      descriptions.add(description);

      expect(canonical).toBe(new URL(path, productionOrigin).toString());
      expect(ogUrl).toBe(canonical);
      expect(html).toContain('<meta property="og:title"');
      expect(html).toContain('<meta property="og:description"');
      expect(html).toContain(
        '<meta property="og:image" content="https://animesh.kundus.in/og-image.png"',
      );
      expect(html).toContain('<meta name="twitter:card" content="summary_large_image"');
      expect(html).toContain('<meta name="twitter:title"');
      expect(html).toContain(
        '<meta name="twitter:image" content="https://animesh.kundus.in/og-image.png"',
      );
      expect(html).toContain('<main id="main-content">');

      if (path === '/') {
        expect(schema['@graph']?.map((entry) => entry['@type'])).toEqual(
          expect.arrayContaining(['Person', 'WebSite', 'ProfilePage']),
        );
        const person = schema['@graph']?.find((entry) => entry['@type'] === 'Person');
        expect(person?.sameAs).toEqual(
          expect.arrayContaining([
            expect.stringContaining('github.com'),
            expect.stringContaining('linkedin.com'),
            expect.stringContaining('huggingface.co'),
            expect.stringContaining('addons.mozilla.org'),
          ]),
        );
      } else if (project) {
        expect(schema['@graph']?.[0]?.['@type']).toBe(project[1]);
        if (project[2]) {
          expect(schema['@graph']?.some((entry) => entry['@type'] === 'CreativeWork')).toBe(
            true,
          );
        }
      } else if (path === '/writing/') {
        expect(schema['@graph']?.some((entry) => entry['@type'] === 'BlogPosting')).toBe(
          true,
        );
        expect(schema['@graph']?.[0]?.mainEntity).toMatchObject({
          '@type': 'ItemList',
        });
      } else if (path === '/contact/') {
        expect(schema['@type']).toBe('ContactPage');
      } else {
        expect(schema['@type']).toBe('CollectionPage');
        expect(schema.mainEntity?.['@type']).toBe('ItemList');
      }
    }
  });

  test('keeps every route complete and navigable without JavaScript', async ({
    browser,
  }) => {
    const { context, page } = await createPage(browser, {
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });

    for (const { path } of routeRecords) {
      const response = await page.goto(localPath(path), {
        waitUntil: 'domcontentloaded',
      });
      expect(response?.status(), path).toBe(200);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('main')).toContainText(/\S{20,}/);
      expect(await page.locator('main a').count()).toBeGreaterThan(0);
      expect(await page.locator('nav[aria-label="Mobile navigation"] a').count()).toBe(
        6,
      );
      expect(await page.locator('a[href^="http"]').count()).toBeGreaterThan(0);
      expect(
        await page.locator('[style*="opacity: 0"], [style*="opacity:0"]').count(),
      ).toBe(0);

      const screenshot = await page.screenshot({ fullPage: true });
      expect(screenshot.byteLength, `${path} full-page screenshot`).toBeGreaterThan(
        10_000,
      );
      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(hasHorizontalOverflow, `${path} horizontal overflow`).toBe(false);
    }

    await page.goto(localPath('/'));
    const menu = page.locator('.mobile-menu');
    await menu.locator('summary').click();
    await expect(menu).toHaveAttribute('open', '');
    await expect(menu.getByRole('link', { name: 'Work' })).toBeVisible();

    await page.goto(localPath('/tools/'));
    await expect(page.getByRole('link', { name: 'Open in a new tab' })).toHaveCount(
      toolCount,
    );
    await context.close();
  });

  test('passes WCAG 2.1 AA in both themes with reduced motion', async ({
    browser,
  }) => {
    for (const colorScheme of ['light', 'dark'] as const) {
      const { context, page } = await createPage(browser, {
        colorScheme,
        reducedMotion: 'reduce',
        viewport: { width: 1280, height: 900 },
      });

      for (const { path } of routeRecords) {
        await page.goto(localPath(path), { waitUntil: 'domcontentloaded' });
        await expect(page.locator('main')).toBeVisible();
        expect(
          await page.evaluate(() =>
            window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          ),
        ).toBe(true);
        expect(
          await page.evaluate(
            () => document.documentElement.classList.contains('dark'),
          ),
        ).toBe(colorScheme === 'dark');

        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        expect(
          result.violations,
          `${colorScheme} ${path}: ${result.violations
            .map((violation) => violation.id)
            .join(', ')}`,
        ).toEqual([]);
      }

      await context.close();
    }
  });

  test('supports visible keyboard focus and persistent tool fallbacks', async ({
    page,
  }) => {
    await blockRemoteSurfaces(page);
    await page.goto(localPath('/'));
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
    const focusStyle = await page
      .getByRole('link', { name: 'Skip to main content' })
      .evaluate((element) => {
        const style = getComputedStyle(element);
        return `${style.outlineStyle} ${style.outlineWidth} ${style.boxShadow}`;
      });
    expect(focusStyle).not.toMatch(/^none 0px none$/);

    await page.goto(localPath('/tools/'));
    const fallbacks = page.getByRole('link', { name: 'Open in a new tab' });
    await expect(fallbacks).toHaveCount(toolCount);
    await expect(fallbacks.first()).toBeVisible();

    await page.goto(localPath('/404.html'));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'This path has no current record.',
    );

    const redirect = await page.request.get(localPath('/project/collabedit/'));
    expect(redirect.status()).toBe(200);
    const redirectHtml = await redirect.text();
    expect(redirectHtml).toContain(
      `http-equiv="refresh" content="0; url=${localPath('/projects/')}"`,
    );
    expect(redirectHtml).toContain(
      '<link rel="canonical" href="https://animesh.kundus.in/projects/">',
    );
  });
});
