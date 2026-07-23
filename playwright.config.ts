import { defineConfig, devices } from '@playwright/test';

const origin = 'http://127.0.0.1:5000';
const basePath = `/${(process.env.VITE_BASE_PATH || '/').replace(/^\/|\/$/g, '')}`;
const serverUrl = new URL(basePath === '/' ? '/' : `${basePath}/`, origin).toString();

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['line'], ['html', { open: 'never' }]] : 'line',
  timeout: 300000,
  use: {
    baseURL: origin,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command:
      'npm run preview -- --port 5000 --strictPort --host 127.0.0.1',
    url: serverUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
