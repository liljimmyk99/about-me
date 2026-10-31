/** "Jan 1, 2026"; UTC so a date-only front matter value never shifts a day. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

const WORDS_PER_MINUTE = 200;

/** Whole minutes to read a Markdown/MDX body (at least 1); fenced code is left out of the count. */
export function readTimeMinutes(body: string | undefined): number {
  const text = (body ?? '').replace(/^---[\s\S]*?---/, '').replace(/```[\s\S]*?```/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
