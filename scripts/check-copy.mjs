import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const roots = ['src', 'public', 'dist'];
const extensions = new Set([
  '.astro',
  '.css',
  '.html',
  '.json',
  '.svg',
  '.ts',
  '.tsx',
  '.txt',
  '.xml',
]);
const forbidden = [
  { label: 'em dash', pattern: /\u2014/u },
  { label: 'AI expert', pattern: /\bAI expert\b/iu },
  { label: 'thought leader', pattern: /\bthought leader\b/iu },
  { label: 'cofounder', pattern: /\bco-?founder\b/iu },
  { label: 'strong developer', pattern: /\bstrong developer\b/iu },
  { label: 'great developer', pattern: /\bgreat developer\b/iu },
  { label: 'AI-first', pattern: /\bAI-first\b/iu },
  { label: 'deep expertise', pattern: /\bdeep expertise\b/iu },
];

const files = [];

const walk = async (directory) => {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return;
    }
    throw error;
  }

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
    } else if (extensions.has(extname(entry.name))) {
      files.push(path);
    }
  }
};

await Promise.all(roots.map(walk));

const failures = [];
for (const file of files) {
  const content = await readFile(file, 'utf8');
  for (const rule of forbidden) {
    if (rule.pattern.test(content)) {
      failures.push(`${relative('.', file)}: ${rule.label}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Forbidden copy found:\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Copy check passed across ${files.length} source and built files.`);
}
