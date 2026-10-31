import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { codeHeader } from './src/lib/codeHeader.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://liljimmyk99.github.io',
  base: '/about-me',
  integrations: [
    mdx(),
    // The 404 is excluded automatically; /styleguide is a temporary internal page
    sitemap({ filter: (page) => !page.includes('/styleguide') }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      transformers: [codeHeader],
    },
  },
});
