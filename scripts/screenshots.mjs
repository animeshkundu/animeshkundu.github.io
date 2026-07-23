import { spawn } from 'node:child_process';
import { mkdir, readdir, rm } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { chromium } from '@playwright/test';

const port = process.env.SCREENSHOT_PORT || '4321';
const origin = `http://127.0.0.1:${port}`;
const basePath = `/${(process.env.VITE_BASE_PATH || '/').replace(/^\/|\/$/g, '')}`;
const pageUrl = (route = '/') =>
  `${origin}${basePath === '/' ? route : `${basePath}${route}`}`;
const outputDirectory = new URL('../screenshots/', import.meta.url);

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with ${code}`));
    });
  });

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

await run('npm', ['run', 'build']);
await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const routes = (await collectHtml('dist'))
  .map(routeFor)
  .filter((route) => route !== '/project/collabedit/')
  .sort();

try {
  const response = await fetch(pageUrl());
  if (response) throw new Error(`Screenshot port ${port} is already in use`);
} catch (error) {
  if (!(error instanceof TypeError)) throw error;
}

const server = spawn(
  process.execPath,
  [
    'node_modules/astro/bin/astro.mjs',
    'preview',
    '--port',
    port,
    '--host',
    '127.0.0.1',
  ],
  { stdio: 'inherit' },
);

const waitUntilReady = async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(pageUrl());
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Preview server did not become ready');
};

try {
  await waitUntilReady();
  const browser = await chromium.launch({ headless: true });
  const visual = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: 'light',
  });
  const noJavaScript = await browser.newContext({
    viewport: { width: 390, height: 844 },
    javaScriptEnabled: false,
  });

  for (const route of routes) {
    const page = await visual.newPage();
    await page.goto(pageUrl(route), { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(350);
    const name =
      route === '/'
        ? 'index'
        : route.replace(/^\/|\/$/g, '').replaceAll('/', '--');
    await page.screenshot({
      path: new URL(`${name}.png`, outputDirectory).pathname,
      fullPage: true,
    });
    await page.close();

    const noJsPage = await noJavaScript.newPage();
    await noJsPage.goto(pageUrl(route), { waitUntil: 'domcontentloaded' });
    const mainText = (await noJsPage.locator('main').innerText()).trim();
    const links = await noJsPage.locator('main a').count();
    if (mainText.length < 80 || links === 0) {
      throw new Error(`No-JavaScript content check failed for ${route}`);
    }
    await noJsPage.close();
  }

  const home = await visual.newPage();
  await home.goto(pageUrl(), { waitUntil: 'domcontentloaded' });
  await home.evaluate(() => document.documentElement.classList.add('dark'));
  await home.setViewportSize({ width: 390, height: 844 });
  await home.waitForTimeout(250);
  await home.screenshot({
    path: new URL('index--mobile-dark.png', outputDirectory).pathname,
    fullPage: true,
  });

  await visual.close();
  await noJavaScript.close();
  await browser.close();
  console.log(`Captured ${routes.length} canonical page screenshots.`);
} finally {
  server.kill('SIGTERM');
}
