import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image: img }) =>
    z.object({
      title: z.string(),
      dek: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.string(),
      tags: z.array(z.string()),
      cover: z.object({ src: img(), alt: z.string().min(1) }).optional(),
      stack: z.array(z.string()).optional(),
      relatedProject: reference('projects').optional(),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image: img }) =>
    z.object({
      name: z.string(),
      oneLiner: z.string(),
      kind: z.enum(['work', 'personal']),
      layer: z.enum(['mobile', 'backend', 'web', 'full-stack']),
      platform: z.string(),
      role: z.string(),
      started: z.coerce.date(),
      status: z.string(),
      stack: z.array(z.string()),
      repo: z.url().optional(),
      live: z.url().optional(),
      appStore: z.url().optional(),
      screenshots: z.array(z.object({ src: img(), alt: z.string().min(1) })),
      featured: z.boolean().default(false),
      order: z.number(),
    }),
});

const roles = defineCollection({
  loader: file('src/data/roles.json'),
  schema: z.object({
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    org: z.string(),
    title: z.string(),
    league: z.enum(['career', 'community']),
    bullets: z.array(z.string()),
    link: z.string().optional(),
  }),
});

const trophies = defineCollection({
  loader: file('src/data/trophies.json'),
  schema: z.object({
    year: z.number().int(),
    title: z.string(),
    org: z.string().optional(),
  }),
});

// Ticker items
const now = defineCollection({
  loader: file('src/data/now.json'),
  schema: z.object({
    status: z.enum(['final', 'in-progress', 'up-next']),
    text: z.string(),
    href: z.string(),
  }),
});

// Scoreboard stat tiles; `startYear` lets a value be derived at build (e.g. seasons at the Linc)
const scoreboard = defineCollection({
  loader: file('src/data/scoreboard.json'),
  schema: z.object({
    value: z.union([z.string(), z.number()]).optional(),
    startYear: z.number().int().optional(),
    label: z.string(),
  }).refine((tile) => tile.value !== undefined || tile.startYear !== undefined, {
    message: 'Provide either value or startYear',
  }),
});

// Bio chapters: one MDX file each, ordered by `order`; optional pull quote and captioned photo
const bio = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/bio' }),
  schema: ({ image: img }) =>
    z.object({
      title: z.string(),
      order: z.number(),
      pullQuote: z.string().optional(),
      photo: z.object({ src: img(), alt: z.string().min(1), caption: z.string() }).optional(),
    }),
});

// Scouting summary, vitals, intangibles and the closing call to action for /about
const profile = defineCollection({
  loader: file('src/data/profile.json'),
  schema: z.object({
    scoutingSummary: z.string(),
    vitals: z.array(z.object({ label: z.string(), value: z.string() })),
    intangibles: z.array(z.object({ title: z.string(), text: z.string() })),
    nowSigning: z.object({ heading: z.string(), text: z.string() }),
  }),
});

const link = z.object({ label: z.string(), href: z.url() });

const site = defineCollection({
  loader: file('src/data/site.json'),
  schema: z.object({
    name: z.string(),
    legalName: z.string(),
    jobTitle: z.string(),
    location: z.string(),
    resume: z.string(),
    hero: z.object({ eyebrow: z.string(), intro: z.string() }),
    bioTeaser: z.string(),
    socials: z.object({ github: link, linkedin: link, instagram: link }),
    fan: z.object({
      teams: z.array(
        z.object({ name: z.string(), city: z.string(), bestMoment: z.string() }),
      ),
    }),
  }),
});

export const collections = { posts, projects, roles, trophies, now, scoreboard, site, bio, profile };
