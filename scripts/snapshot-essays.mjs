import { mkdir, readFile, writeFile } from 'node:fs/promises';

const feedUrl = 'https://animesh.kundus.in/essays/rss.xml';
const output = new URL('../src/data/snapshots/essays.json', import.meta.url);
const fallback = new URL('../src/data/essays-fallback.json', import.meta.url);

const decode = (value) =>
  value
    .replaceAll('<![CDATA[', '')
    .replaceAll(']]>', '')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('\u2014', ',')
    .trim();

const valueOf = (item, tag) => {
  const match = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? decode(match[1].replace(/<[^>]+>/g, ' ')) : '';
};

let essays;
let source = 'feed';
let xml;

try {
  const response = await fetch(feedUrl);
  if (!response.ok) {
    throw new Error(`Essays feed request failed: ${response.status}`);
  }

  xml = await response.text();
} catch (error) {
  source = 'curated-fallback';
  essays = JSON.parse(await readFile(fallback, 'utf8')).essays;
  console.warn(error instanceof Error ? error.message : String(error));
}

if (source === 'feed') {
  essays = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((match, index) => {
    const item = match[1];
    const published = valueOf(item, 'pubDate');
    const timestamp = Date.parse(published);

    if (Number.isNaN(timestamp)) {
      throw new Error(`Essay ${index + 1} has an invalid publication date`);
    }

    return {
      title: valueOf(item, 'title'),
      url: valueOf(item, 'link'),
      summary: valueOf(item, 'description'),
      publishedAt: new Date(timestamp).toISOString(),
      category: valueOf(item, 'category') || 'Essay',
    };
  });

  if (essays.length === 0) {
    throw new Error('Essays feed contained no items');
  }
}

const snapshot = {
  asOf: process.env.SNAPSHOT_DATE || new Date().toISOString().slice(0, 10),
  sourceUrl: feedUrl,
  source,
  essays,
};

await mkdir(new URL('../src/data/snapshots/', import.meta.url), { recursive: true });
await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Wrote ${essays.length} essays from ${source} to ${output.pathname}`);
