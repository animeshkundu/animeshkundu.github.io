import AxeBuilder from '@axe-core/playwright';
import { chromium } from '@playwright/test';
import { readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const origin = process.env.BROWSER_BASE_URL || 'http://127.0.0.1:4173';

const collectHtml = async (directory, paths = []) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collectHtml(path, paths);
    else if (entry.name.endsWith('.html')) paths.push(path);
  }
  return paths;
};

const routeFor = (file) => {
  const local = relative('dist', file).split(sep).join('/');
  if (local === 'index.html') return '/';
  if (local === '404.html') return '/404.html';
  return `/${local.replace(/index\.html$/, '')}`;
};

const routes = (await collectHtml('dist'))
  .map(routeFor)
  .filter((route) => route !== '/project/collabedit/')
  .sort();

const browser = await chromium.launch({ headless: true });
const failures = [];

for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: theme,
  });
  const page = await context.newPage();

  for (const route of routes) {
    const response = await page.goto(`${origin}${route}`, {
      waitUntil: 'domcontentloaded',
    });
    if (!response?.ok()) failures.push(`${theme} ${route}: HTTP ${response?.status()}`);

    if (theme === 'dark') {
      await page.evaluate(() => document.documentElement.classList.add('dark'));
      await page.waitForTimeout(200);
    }

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    if (results.violations.length > 0) {
      failures.push(
        `${theme} ${route}: ${results.violations
          .map((violation) => violation.id)
          .join(', ')}`,
      );
    }
  }

  await context.close();
}

const noJavaScript = await browser.newContext({
  viewport: { width: 390, height: 844 },
  javaScriptEnabled: false,
});
const noJavaScriptPage = await noJavaScript.newPage();

for (const route of routes) {
  await noJavaScriptPage.goto(`${origin}${route}`, {
    waitUntil: 'domcontentloaded',
  });
  const mainText = (await noJavaScriptPage.locator('main').innerText()).trim();
  const links = await noJavaScriptPage.locator('main a').count();
  if (mainText.length < 80 || links === 0) {
    failures.push(`no-js ${route}: ${mainText.length} characters, ${links} links`);
  }

  if (route === '/tools/') {
    const fallbacks = await noJavaScriptPage
      .getByRole('link', { name: 'Open in a new tab' })
      .count();
    if (fallbacks !== 6) failures.push(`no-js tools: ${fallbacks} fallback links`);
  }
}

await noJavaScriptPage.goto(origin, { waitUntil: 'domcontentloaded' });
const disclosure = noJavaScriptPage.locator('.mobile-menu');
await disclosure.locator('summary').click();
if (!(await disclosure.evaluate((element) => element.hasAttribute('open')))) {
  failures.push('no-js mobile navigation disclosure did not open');
}

await noJavaScript.close();
await browser.close();

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Browser contract passed for ${routes.length} routes in both themes and no-JavaScript mode.`,
  );
}
