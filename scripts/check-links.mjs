// Checks every internal link, asset and #fragment in the built site (dist/).
// Usage: npm run build && node scripts/check-links.mjs
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const base = '/about-me';

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* htmlFiles(path);
    else if (name.endsWith('.html')) yield path;
  }
}

function resolveTarget(pathname) {
  const local = join(dist, decodeURIComponent(pathname.slice(base.length)));
  if (existsSync(local) && statSync(local).isFile()) return local;
  const index = join(local, 'index.html');
  return existsSync(index) ? index : null;
}

const idCache = new Map();
function hasId(file, id) {
  if (!idCache.has(file)) {
    const html = readFileSync(file, 'utf8');
    idCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idCache.get(file).has(id);
}

// Targets known to be missing until content lands. Delete each entry once its file exists.
const pending = new Set(['/about-me/resume.pdf']);

// Links that are meant to land on the 404 page (the new-portfolio-site post shows it off). The 404 page itself is built
// as dist/404.html, so only the trailing-slash-free path is listed here.
const intentional404 = new Set(['/about-me/blog/404-page']);

const problems = [];
let checked = 0;

for (const file of htmlFiles(dist)) {
  const page = '/' + relative(dist, file).split(sep).join('/');
  const html = readFileSync(file, 'utf8');
  const urls = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const match of html.matchAll(/\ssrcset="([^"]+)"/g)) {
    urls.push(...match[1].split(',').map((entry) => entry.trim().split(/\s+/)[0]));
  }

  for (const url of urls) {
    if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue; // external links are not checked (flaky, rate-limited)
    checked++;
    const resolved = new URL(url, `http://x${base}${page === '/index.html' ? '/' : page.replace(/index\.html$/, '')}`);
    if (!resolved.pathname.startsWith(`${base}/`) && resolved.pathname !== base) {
      problems.push(`${page}: ${url} is outside the site base ${base}`);
      continue;
    }
    if (pending.has(resolved.pathname)) continue;
    if (intentional404.has(resolved.pathname.replace(/\/$/, ''))) {
      if (!existsSync(join(dist, '404.html'))) problems.push(`${page}: ${url} should show the 404 page, but dist/404.html is missing`);
      continue;
    }
    const target = resolveTarget(resolved.pathname);
    if (!target) problems.push(`${page}: ${url} does not exist`);
    else if (resolved.hash.length > 1 && !hasId(target, resolved.hash.slice(1))) {
      problems.push(`${page}: ${url} points at a missing #${resolved.hash.slice(1)}`);
    }
  }
}

if (problems.length) {
  console.error(`${problems.length} broken link(s):\n` + [...new Set(problems)].map((p) => `  ${p}`).join('\n'));
  process.exit(1);
}
console.log(`Checked ${checked} internal links across the built site: all good.`);
