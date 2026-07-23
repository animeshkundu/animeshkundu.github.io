import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const base = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  site: 'https://animesh.kundus.in',
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
