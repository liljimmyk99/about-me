import { getCollection, getEntry } from 'astro:content';

/** Posts newest first; drafts are shown in dev only, never in production builds. */
export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => !import.meta.env.PROD || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getSite() {
  const entry = await getEntry('site', 'site');
  if (!entry) throw new Error('Missing site entry in src/data/site.json');
  return entry.data;
}
