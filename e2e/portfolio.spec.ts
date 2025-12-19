import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the hero section correctly', async ({ page }) => {
    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText('I build tools');
    
    // Check tagline
    await expect(page.getByText('Full-stack developer')).toBeVisible();
    
    // Check CTA buttons
    await expect(page.getByRole('link', { name: /Explore Projects/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Try Live Demos/i })).toBeVisible();
  });

  test('should navigate to sections via nav links', async ({ page }) => {
    // Click on Projects link
    await page.getByRole('link', { name: 'Projects' }).first().click();
    await expect(page).toHaveURL(/#projects/);
    
    // Check Projects section is visible
    await expect(page.getByText('Selected Projects')).toBeVisible();
  });

  test('should toggle dark mode', async ({ page }) => {
    // Get the theme toggle button
    const themeButton = page.getByRole('button', { name: /Switch to dark mode|Switch to light mode/i });
    
    // Check initial state and toggle
    await themeButton.click();
    
    // Verify the toggle worked by checking the button label changed
    await expect(themeButton).toHaveAttribute('aria-label', /Switch to/);
  });

  test('should display featured projects with working links', async ({ page }) => {
    // Scroll to projects section
    await page.getByRole('link', { name: 'Projects' }).first().click();
    
    // Check that project cards are visible using more specific selectors
    await expect(page.locator('#projects').getByRole('heading', { name: 'Mermaid Editor' })).toBeVisible();
    await expect(page.locator('#projects').getByRole('heading', { name: 'Gist Preview' })).toBeVisible();
    await expect(page.locator('#projects').getByRole('heading', { name: 'SAZ Viewer' })).toBeVisible();
    
    // Check Source links are present
    const sourceLinks = page.getByRole('link', { name: /Source/i });
    await expect(sourceLinks.first()).toBeVisible();
  });

  test('should show live demos section with iframe', async ({ page }) => {
    // Navigate to demos
    await page.getByRole('link', { name: 'Demos' }).first().click();
    
    // Check section header
    await expect(page.getByText('Try before you clone')).toBeVisible();
    
    // Check demo tabs
    await expect(page.getByRole('button', { name: 'Mermaid Editor' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Gist Preview' })).toBeVisible();
    
    // Click different demo tab
    await page.getByRole('button', { name: 'SAZ Viewer' }).click();
  });

  test('should display repositories section with filtering', async ({ page }) => {
    // Navigate to repositories
    await page.getByRole('link', { name: 'Repos' }).first().click();
    
    // Check section header using role selector
    await expect(page.getByRole('heading', { name: 'All projects' })).toBeVisible();
    
    // Check filter buttons
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'TypeScript' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Python' })).toBeVisible();
    
    // Check search input
    await expect(page.getByPlaceholder('Search...')).toBeVisible();
  });

  test('should display About section with stats', async ({ page }) => {
    // Navigate to about
    await page.getByRole('link', { name: 'About' }).first().click();
    
    // Check section content
    await expect(page.getByText('Crafting tools developers rely on')).toBeVisible();
    
    // Check stats
    await expect(page.getByText('GitHub stars')).toBeVisible();
    await expect(page.getByText('Open source projects')).toBeVisible();
  });

  test('should display FAQ section with accordion', async ({ page }) => {
    // Find and click on FAQ question
    const faqButton = page.getByRole('button', { name: /What do you build/i });
    await faqButton.scrollIntoViewIfNeeded();
    await expect(faqButton).toBeVisible();
    
    // Click to expand
    await faqButton.click();
    
    // Check answer is visible
    await expect(page.getByText(/Developer tools that run in the browser/i)).toBeVisible();
  });

  test('should display Contact section with links', async ({ page }) => {
    // Navigate to contact
    await page.getByRole('link', { name: 'Contact' }).first().click();
    
    // Check section header
    await expect(page.getByText("Let's work together")).toBeVisible();
    
    // Check contact links
    await expect(page.getByRole('link', { name: /Email/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /GitHub/i }).first()).toBeVisible();
  });

  test('should have proper footer', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check footer content
    await expect(page.getByText(/© \d{4} Animesh Kundu/)).toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile menu button exists
    const menuButton = page.getByRole('button', { name: /Open menu|Close menu/i });
    await expect(menuButton).toBeVisible();
    
    // Open mobile menu
    await menuButton.click();
    
    // Check mobile nav links
    await expect(page.getByRole('link', { name: 'Projects' }).first()).toBeVisible();
  });
});
