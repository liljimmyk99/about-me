import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://liljimmyk99.github.io',
  base: '/about-me',
  integrations: [mdx()],
});
