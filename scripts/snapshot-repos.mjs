import { mkdir, writeFile } from 'node:fs/promises';

const username = 'animeshkundu';
const output = new URL('../src/data/snapshots/repositories.json', import.meta.url);
const excluded = new Set(['collabedit', 'Misc-Scripts', 'factory-selftest']);
const cleanText = (value) => value.replaceAll('\u2014', ',');

const response = await fetch(
  `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
  {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'animesh-kundus-in-snapshot',
    },
  },
);

if (!response.ok) {
  throw new Error(`GitHub repositories request failed: ${response.status}`);
}

const repositories = (await response.json())
  .filter((repo) => !repo.fork && repo.size > 0 && !excluded.has(repo.name))
  .map((repo) => ({
    name: repo.name,
    description: cleanText(repo.description ?? 'Public source repository.'),
    url: repo.html_url,
    homepage: repo.homepage || null,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics: repo.topics,
    updatedAt: repo.updated_at,
    hasPages: repo.has_pages,
  }));

const snapshot = {
  asOf: process.env.SNAPSHOT_DATE || new Date().toISOString().slice(0, 10),
  sourceUrl: `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
  repositories,
};

await mkdir(new URL('../src/data/snapshots/', import.meta.url), { recursive: true });
await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Wrote ${repositories.length} repositories to ${output.pathname}`);
