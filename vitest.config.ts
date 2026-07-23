import { getViteConfig } from 'astro/config';
import type { ViteUserConfig } from 'vitest/config';

const config: ViteUserConfig = {
  test: {
    environment: 'node',
    include: ['src/__tests__/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,astro}'],
      exclude: [
        'src/env.d.ts',
        'src/data/types.ts',
        'src/data/snapshots/**',
      ],
      thresholds: {
        branches: 90.01,
        functions: 90.01,
        lines: 90.01,
        statements: 90.01,
      },
      reporter: ['text', 'html', 'json'],
    },
  },
};

export default getViteConfig(config);
