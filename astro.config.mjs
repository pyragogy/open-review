import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Open Review is fully prerendered. No SSR, no server endpoints.
// `output: 'static'` is the Astro 5 default but we set it explicitly
// so a future contributor reading this file can't accidentally drift
// into hybrid mode without confronting R1 (static-only at runtime).

export default defineConfig({
  site:    'https://open-review.pyragogy.org',
  output:  'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  vite: {
    ssr: {
      noExternal: ['marked', 'isomorphic-dompurify'],
    },
  },
});
