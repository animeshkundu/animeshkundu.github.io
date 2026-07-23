import snapshot from './snapshots/essays.json';
import type { Essay } from './types';

export const essaysAsOf = snapshot.asOf;
export const essaysSourceUrl = snapshot.sourceUrl;
export const essays: Essay[] = snapshot.essays;

const featuredTitles = new Set([
  'No One at the Next Desk',
  "What the Agent Can't Guess",
  'The Safe Place to Be Bad',
  'The Meeting Grew a Memory',
  'The Best Paper in the Class',
  'Never Left Hanging',
]);

export const featuredEssays = [
  ...essays.filter((essay) => featuredTitles.has(essay.title)),
  ...essays,
]
  .filter(
    (essay, index, all) =>
      all.findIndex((candidate) => candidate.url === essay.url) === index,
  )
  .slice(0, 6);
