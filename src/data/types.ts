export interface Metric {
  label: string;
  value: string;
  asOf: string;
  sourceUrl: string;
}

export type ProjectCategory =
  | 'Shipped products'
  | 'Models and agents'
  | 'Browser tools'
  | 'Systems and libraries'
  | 'Early public work';

export type ArtifactSchema = 'SoftwareApplication' | 'SoftwareSourceCode';

export interface CreativeWorkEvidence {
  name: string;
  description: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  schemaType: ArtifactSchema;
  summary: string;
  highlights: string[];
  install: string[];
  usage: string;
  technologies: string[];
  sourceUrl: string;
  liveUrl?: string;
  selected: boolean;
  metrics: Metric[];
  updatedAt: string;
  creativeWork?: CreativeWorkEvidence;
}

export interface Tool {
  slug: string;
  name: string;
  purpose: string;
  embedUrl: string;
  fallbackUrl: string;
  sandboxTokens: string;
  referrerPolicy:
    | 'no-referrer'
    | 'origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin';
  privacyVerifiedSource: string;
  privacyNote: string;
}

export interface Essay {
  title: string;
  url: string;
  summary: string;
  publishedAt: string;
  category: string;
}
