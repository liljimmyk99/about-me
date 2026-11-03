// Loads every page of the built site (dist/) at phone widths and fails on layout regressions:
// anything that sticks out past the screen edge (outside a box that scrolls on purpose), and
// tap targets under 24×24px (WCAG 2.2 SC 2.5.8). Details, the phone menu and collapsed lists
// are opened first so their contents are checked too.
// Usage: npm run build && node scripts/check-mobile-layout.mjs
// Drives the installed Google Chrome (no browser download); set CHROME_PATH to use another Chromium.
import { createServer } from 'node:http';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';
import { chromium } from 'playwright-core';

const dist = new URL('../dist/', import.meta.url).pathname;
const base = '/about-me';
const widths = [320, 375];
const minTarget = 24;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* htmlFiles(path);
    else if (name.endsWith('.html')) yield path;
  }
}

function resolveFile(pathname) {
  if (!pathname.startsWith(`${base}/`)) return null;
  const local = join(dist, decodeURIComponent(pathname.slice(base.length)));
  if (!local.startsWith(dist)) return null;
  if (existsSync(local) && statSync(local).isFile()) return local;
  const index = join(local, 'index.html');
  return existsSync(index) ? index : null;
}

// Runs inside the page
function audit(minTarget) {
  for (const details of document.querySelectorAll('details')) details.open = true;
  for (const el of document.querySelectorAll('[data-menu]')) el.dataset.menu = 'open';
  for (const el of document.querySelectorAll('[data-collapsed]')) delete el.dataset.collapsed;

  const vw = document.documentElement.clientWidth;
  const describe = (el) => {
    const classes = typeof el.className === 'string' ? el.className.trim().split(/\s+/).filter(Boolean) : [];
    return el.tagName.toLowerCase() + (el.id ? `#${el.id}` : '') + classes.map((c) => `.${c}`).join('');
  };
  const inScrollBox = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      if (['auto', 'scroll'].includes(getComputedStyle(p).overflowX)) return true;
    }
    return false;
  };
  const overflows = (el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && (r.right > vw + 1 || r.left < -1);
  };

  const problems = [];
  for (const el of document.body.querySelectorAll('*')) {
    // Report only the outermost element that sticks out
    if (!overflows(el) || inScrollBox(el) || (el.parentElement !== document.body && overflows(el.parentElement))) continue;
    const r = el.getBoundingClientRect();
    problems.push(`${describe(el)} spans ${Math.round(r.left)}–${Math.round(r.right)}px on a ${vw}px screen`);
  }
  for (const el of document.querySelectorAll('a[href], button, summary')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0 || el.closest('.visually-hidden')) continue;
    // WCAG inline exception: a link inside a sentence can be as small as the text around it
    if (getComputedStyle(el).display === 'inline' && el.parentElement.textContent.trim() !== el.textContent.trim()) continue;
    if (r.width < minTarget || r.height < minTarget) {
      problems.push(`${describe(el)} "${el.textContent.trim().slice(0, 30)}" is ${Math.round(r.width)}×${Math.round(r.height)}px`);
    }
  }
  return problems;
}

const server = createServer((req, res) => {
  const file = resolveFile(new URL(req.url, 'http://x').pathname);
  if (!file) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' },
);
const pages = [...htmlFiles(dist)].map((file) => `${base}/${relative(dist, file).split(sep).join('/')}`.replace(/index\.html$/, ''));
const problems = [];

try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    for (const path of pages) {
      await page.goto(origin + path);
      for (const problem of await page.evaluate(audit, minTarget)) problems.push(`${width}px ${path}: ${problem}`);
    }
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}

if (problems.length) {
  console.error(`${problems.length} phone layout problem(s):\n` + problems.map((p) => `  ${p}`).join('\n'));
  process.exit(1);
}
console.log(`Checked ${pages.length} pages at ${widths.join(' and ')}px: no overflow, every tap target at least ${minTarget}×${minTarget}px.`);
