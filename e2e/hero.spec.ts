import { test, expect } from '@playwright/test';

test.describe('Homepage Hero', () => {
  test('is the first main section with accessible CTA destinations', async ({ page }) => {
    await page.goto('/');

    const hero = page.locator('main > section').first();
    await expect(hero).toHaveAttribute('aria-labelledby', 'hero-heading');
    await expect(hero.getByRole('link', { name: 'Explore Projects' })).toHaveAttribute('href', '#projects');
    await expect(hero.getByRole('link', { name: 'Try Live Demos' })).toHaveAttribute('href', '#demos');
  });
});
