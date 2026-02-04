export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  created_at: string;
  has_pages: boolean;
  homepage: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
}

export interface FeaturedProject {
  id: string;
  name: string;
  title: string;
  description: string;
  language: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl: string;
  stars?: number;
  forks?: number;
  featured: boolean;
  category: 'web-tools' | 'browser-extensions' | 'python-utilities' | 'cli-tools' | 'other';
  highlights?: string[];
  previewType?: 'screenshot' | 'terminal' | 'animation';
  previewContent?: string; // SVG content for terminal animations, or image URL
}

export interface Demo {
  id: string;
  name: string;
  title: string;
  url: string;
  description: string;
}
