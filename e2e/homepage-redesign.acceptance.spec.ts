import { expect, test, type Page } from '@playwright/test';

async function loadHomepage(page: Page) {
  await page.route('**/*', async (route) => {
    const hostname = new URL(route.request().url()).hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      await route.continue();
      return;
    }

    await route.abort();
  });
  await page.goto('/');
}

test.describe('Homepage redesign acceptance', () => {
  test('presents a clear hero and preview-led work showcase', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await loadHomepage(page);

    const heading = page.getByRole('heading', { level: 1 });
    const primaryCta = page.getByRole('link', { name: 'Explore Projects' });

    await expect(heading).toContainText('I build tools that');
    await expect(page.getByText(/Full-stack developer crafting privacy-first/)).toBeVisible();
    await expect(primaryCta).toHaveAttribute('href', '#projects');
    await expect(page.getByLabel('Product principles')).toBeVisible();

    const heroStyles = await heading.evaluate((element) => {
      const styles = getComputedStyle(element);
      return {
        fontSize: Number.parseFloat(styles.fontSize),
        letterSpacing: styles.letterSpacing,
      };
    });
    expect(heroStyles.fontSize).toBeGreaterThan(72);
    expect(heroStyles.letterSpacing).not.toBe('normal');

    await primaryCta.click();
    await expect(page).toHaveURL(/#projects$/);

    const showcase = page.locator('#projects');
    await expect(showcase.getByRole('heading', { name: 'Selected Projects' })).toBeVisible();
    await expect(showcase.locator('article')).toHaveCount(6);
    await expect(showcase.getByRole('heading', { name: 'Oops' })).toBeVisible();

    const firstCard = showcase.locator('article').first();
    await expect(firstCard.locator('svg').first()).toBeVisible();
    const firstCardBox = await firstCard.boundingBox();
    const secondCardBox = await showcase.locator('article').nth(1).boundingBox();
    expect(firstCardBox).not.toBeNull();
    expect(secondCardBox).not.toBeNull();
    expect(Math.abs((firstCardBox?.y ?? 0) - (secondCardBox?.y ?? 0))).toBeLessThan(10);
  });

  test('persists an accessible light and dark theme choice', async ({ page }) => {
    await loadHomepage(page);
    await page.evaluate(() => localStorage.setItem('theme', 'light'));
    await page.reload();

    const themeToggle = page.getByRole('button', { name: 'Switch to dark mode' });
    await expect(themeToggle).toHaveAttribute('aria-pressed', 'false');
    await themeToggle.click();

    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');

    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
  });

  test('stays usable without horizontal overflow on a small phone', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await loadHomepage(page);

    const menuButton = page.getByRole('button', { name: 'Open menu' });
    const themeToggle = page.getByRole('button', { name: /Switch to (dark|light) mode/ });
    const primaryCta = page.getByRole('link', { name: 'Explore Projects' });

    for (const control of [menuButton, themeToggle, primaryCta]) {
      const box = await control.boundingBox();
      expect(box).not.toBeNull();
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }

    await menuButton.click();
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await expect(page.getByRole('link', { name: 'All Projects' })).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);

    await primaryCta.click();
    const firstCardBox = await page.locator('#projects article').first().boundingBox();
    const secondCardBox = await page.locator('#projects article').nth(1).boundingBox();
    expect(firstCardBox).not.toBeNull();
    expect(secondCardBox).not.toBeNull();
    expect((secondCardBox?.y ?? 0)).toBeGreaterThan((firstCardBox?.y ?? 0));
  });

  test('honors the visitor reduced-motion preference', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await loadHomepage(page);

    const motionDurations = await page.evaluate(() => {
      const styles = getComputedStyle(document.querySelector('h1') as HTMLElement);
      return {
        animationDuration: styles.animationDuration,
        transitionDuration: styles.transitionDuration,
        scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      };
    });

    expect(Number.parseFloat(motionDurations.animationDuration)).toBeLessThanOrEqual(0.00001);
    expect(Number.parseFloat(motionDurations.transitionDuration)).toBeLessThanOrEqual(0.00001);
    expect(motionDurations.scrollBehavior).toBe('auto');
    await context.close();
  });
});
