import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, getSite } from '../lib/content';
import { withBase } from '../lib/url';

export async function GET(context: APIContext) {
  const [site, posts] = await Promise.all([getSite(), getPosts()]);
  return rss({
    title: `${site.name}: Blog`,
    description: `Posts by ${site.name} on mobile engineering, projects and life off the field.`,
    site: new URL(withBase('/'), context.site),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.dek,
      pubDate: post.data.date,
      link: withBase(`/blog/${post.id}/`),
      categories: post.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
}
