import { expect, test } from '@playwright/test';

test.describe('Theme preference', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('persists an explicit theme choice across reloads', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();

    await page.getByRole('button', { name: 'Switch to dark mode' }).click();

    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('theme')))
      .toBe('dark');

    await page.reload();

    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
  });

  test('applies the system dark theme before the application loads', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.route('**/assets/*.js', (route) => route.abort());

    await page.reload();

    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('theme')))
      .toBeNull();
  });
});
