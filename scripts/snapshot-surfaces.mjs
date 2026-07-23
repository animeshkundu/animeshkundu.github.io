import { mkdir, writeFile } from 'node:fs/promises';

const username = 'animeshkundu';
const output = new URL('../src/data/snapshots/surfaces.json', import.meta.url);
const featured = new Set([
  'essays',
  'mermaid-editor',
  'pdf-viewer',
  'gist-preview',
  'har-viewer',
  'saz-viewer',
  'sanger-viewer',
  'github-router',
  'ai-or-die',
  'kusto-mcp',
  'media-tools',
  'file-tools',
  'photo-tools',
  'fix',
  'oops',
  'runnerize',
  'youtube-audio',
  'pyflix',
  'torrent-dl',
]);
const excluded = new Set(['collabedit', 'Misc-Scripts', 'factory-selftest']);
const cleanText = (value) => value.replaceAll('\u2014', ',');

const response = await fetch(
  `https://api.github.com/users/${username}/repos?per_page=100`,
  {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'animesh-kundus-in-snapshot',
    },
  },
);

if (!response.ok) {
  throw new Error(`GitHub surfaces request failed: ${response.status}`);
}

const surfaces = (await response.json())
  .filter((repo) => repo.has_pages && !repo.fork)
  .map((repo) => ({
    repository: repo.name,
    path: `/${repo.name}/`,
    url: `https://animesh.kundus.in/${repo.name}/`,
    description: cleanText(repo.description ?? 'Public GitHub Pages surface.'),
    featured: featured.has(repo.name),
    excluded: excluded.has(repo.name) || repo.size === 0,
    sourceUrl: repo.html_url,
  }))
  .sort((a, b) => a.repository.localeCompare(b.repository));

const snapshot = {
  asOf: process.env.SNAPSHOT_DATE || new Date().toISOString().slice(0, 10),
  sourceUrl: `https://api.github.com/users/${username}/repos?per_page=100`,
  count: surfaces.length,
  surfaces,
};

await mkdir(new URL('../src/data/snapshots/', import.meta.url), { recursive: true });
await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Wrote ${surfaces.length} Pages surfaces to ${output.pathname}`);
