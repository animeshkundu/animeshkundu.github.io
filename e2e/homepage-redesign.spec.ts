import { test, expect } from '@playwright/test';

test.describe('Homepage redesign acceptance', () => {
  test('presents an editorial hero and asymmetric project grid on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const hero = page.locator('main section').first();
    await expect(hero.getByRole('heading', { level: 1 })).toContainText('I build tools');
    await expect(hero.getByText('open-source.workbench')).toBeVisible();

    const projectCards = page.locator('#projects article');
    await expect(projectCards).toHaveCount(6);

    const firstCard = await projectCards.nth(0).boundingBox();
    const secondCard = await projectCards.nth(1).boundingBox();

    expect(firstCard).not.toBeNull();
    expect(secondCard).not.toBeNull();
    expect(firstCard!.width).toBeGreaterThan(secondCard!.width * 1.5);
  });

  test('keeps the single-page layout within a mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const projectCards = page.locator('#projects article');
    await expect(projectCards).toHaveCount(6);

    const firstCard = await projectCards.nth(0).boundingBox();
    const secondCard = await projectCards.nth(1).boundingBox();

    expect(firstCard).not.toBeNull();
    expect(secondCard).not.toBeNull();
    expect(Math.abs(firstCard!.width - secondCard!.width)).toBeLessThan(1);

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });

  test('scrolls to sections without hiding headings behind the fixed navigation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Explore Projects' }).click();

    await expect(page).toHaveURL(/#projects$/);
    const projects = page.locator('#projects');
    const expectedTop = await projects.evaluate((section) => {
      const rootStyles = getComputedStyle(document.documentElement);
      const sectionStyles = getComputedStyle(section);
      const scrollPadding = Number.parseFloat(rootStyles.scrollPaddingTop) || 0;
      const scrollMargin = Number.parseFloat(sectionStyles.scrollMarginTop) || 0;
      return scrollPadding + scrollMargin;
    });

    expect(expectedTop).toBeGreaterThan(70);
    await expect.poll(async () => {
      const top = await projects.evaluate((section) => section.getBoundingClientRect().top);
      return Math.round(top);
    }).toBe(Math.round(expectedTop));
  });

  test('honors reduced motion for section scrolling', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const scrollBehavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    );
    expect(scrollBehavior).toBe('auto');
  });

  test('restores the selected theme after a reload', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('theme', 'light'));
    await page.reload();

    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect.poll(() => page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');

    await page.reload();

    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
  });
});
