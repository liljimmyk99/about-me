import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { codeHeader } from './src/lib/codeHeader.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://liljimmyk99.github.io',
  base: '/about-me',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      transformers: [codeHeader],
    },
  },
});
