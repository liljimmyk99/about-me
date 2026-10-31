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

export type TickerStatus = 'final' | 'in-progress' | 'up-next';
export interface TickerItem {
  status: TickerStatus;
  text: string;
  href: string;
}

const tickerOrder: TickerStatus[] = ['final', 'in-progress', 'up-next'];
const MAX_TICKER_ITEMS = 4;

/** Newest post (as "Final") plus the items in now.json, ordered Final, In progress, Up next. */
export async function getTickerItems(): Promise<TickerItem[]> {
  const [newest] = await getPosts();
  const now = (await getCollection('now')).map((entry) => entry.data);
  const items: TickerItem[] = [
    ...(newest
      ? [{ status: 'final' as const, text: newest.data.title, href: `/blog/${newest.id}/` }]
      : []),
    ...now,
  ];
  return items
    .sort((a, b) => tickerOrder.indexOf(a.status) - tickerOrder.indexOf(b.status))
    .slice(0, MAX_TICKER_ITEMS);
}

export interface ScoreboardTile {
  id: string;
  value: string | number;
  label: string;
}

/** Tiles with `startYear` get a computed season count (the start year counts as season one). */
export async function getScoreboardTiles(): Promise<ScoreboardTile[]> {
  const year = new Date().getFullYear();
  const tiles = await getCollection('scoreboard');
  return tiles.map(({ id, data }) => ({
    id,
    label: data.label,
    value: data.startYear !== undefined ? year - data.startYear + 1 : (data.value ?? ''),
  }));
}

/** Roles newest first; ties put the ongoing role ahead. */
export async function getRoles() {
  const roles = await getCollection('roles');
  return roles.sort(
    (a, b) =>
      b.data.start.valueOf() - a.data.start.valueOf() ||
      (b.data.end?.valueOf() ?? Infinity) - (a.data.end?.valueOf() ?? Infinity),
  );
}

/** Featured projects in their `order`, capped for the home page highlight reel. */
export async function getFeaturedProjects(limit = 4) {
  const projects = await getCollection('projects', ({ data }) => data.featured);
  return projects.sort((a, b) => a.data.order - b.data.order).slice(0, limit);
}

export async function getBioChapters() {
  const chapters = await getCollection('bio');
  return chapters.sort((a, b) => a.data.order - b.data.order);
}

export async function getProfile() {
  const entry = await getEntry('profile', 'profile');
  if (!entry) throw new Error('Missing profile entry in src/data/profile.json');
  return entry.data;
}

/** Trophies newest first. */
export async function getTrophies() {
  const trophies = await getCollection('trophies');
  return trophies.sort((a, b) => b.data.year - a.data.year);
}
