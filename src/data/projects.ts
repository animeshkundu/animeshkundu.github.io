import repositorySnapshot from './snapshots/repositories.json';
import type {
  ArtifactSchema,
  CreativeWorkEvidence,
  Project,
  ProjectCategory,
} from './types';

interface ProjectDefinition {
  slug: string;
  title: string;
  category: ProjectCategory;
  schemaType: ArtifactSchema;
  summary: string;
  highlights: string[];
  liveUrl?: string;
  selected?: boolean;
  install?: string[];
  usage?: string;
  creativeWork?: CreativeWorkEvidence;
}

const definitions: ProjectDefinition[] = [
  {
    slug: 'youtube-audio',
    title: 'YouTube Audio',
    category: 'Shipped products',
    schemaType: 'SoftwareApplication',
    summary:
      'A Firefox extension that turns off YouTube video playback to save bandwidth and battery.',
    highlights: [
      '14,484 average daily users reported by Mozilla Add-ons',
      '527 ratings and 224 written reviews',
      'A small utility kept useful through a long public life',
    ],
    liveUrl: 'https://addons.mozilla.org/en-US/firefox/addon/youtube-audio/',
    selected: true,
    install: ['Install from Mozilla Add-ons for Firefox.'],
    usage: 'Open a YouTube page and use the extension to keep the audio stream.',
  },
  {
    slug: 'fix',
    title: 'Fix',
    category: 'Models and agents',
    schemaType: 'SoftwareSourceCode',
    summary:
      'A Rust command correction CLI powered by a small, self-trained model that runs locally.',
    highlights: [
      'No API key or hosted inference dependency',
      'Published through Homebrew, WinGet, and Cargo',
      'Connects model training work directly to a fast command-line product',
    ],
    liveUrl: 'https://animesh.kundus.in/fix/',
    selected: true,
    install: [
      'brew install animeshkundu/fix/fix',
      'winget install animeshkundu.fix',
      'cargo install --git https://github.com/animeshkundu/fix',
    ],
    usage: 'Pass a failed shell command to get an offline correction.',
    creativeWork: {
      name: 'cmd-correct',
      description:
        'A Qwen3 LoRA command correction model trained with MLX on roughly 135,000 synthetic examples and published as GGUF.',
      url: 'https://huggingface.co/animeshkundu/cmd-correct',
    },
  },
  {
    slug: 'oops',
    title: 'Oops',
    category: 'Shipped products',
    schemaType: 'SoftwareSourceCode',
    summary: 'A compact Rust command-line typo corrector built for quick feedback.',
    highlights: ['Rust implementation', 'Fast local correction', 'Single-purpose CLI'],
    liveUrl: 'https://animesh.kundus.in/oops/',
    selected: true,
  },
  {
    slug: 'condukt',
    title: 'Condukt',
    category: 'Models and agents',
    schemaType: 'SoftwareSourceCode',
    summary:
      'A composable workflow framework for agent execution, state, orchestration, runtimes, and UI.',
    highlights: [
      'Separates workflow definition from runtime',
      'Treats state and orchestration as first-class concerns',
      'Built for composing agent systems rather than one-off prompts',
    ],
    selected: true,
  },
  {
    slug: 'github-router',
    title: 'GitHub Router',
    category: 'Models and agents',
    schemaType: 'SoftwareSourceCode',
    summary:
      'A local router for using Claude Code, Codex CLI, and related coding tools with a Copilot subscription.',
    highlights: [
      'Connects multiple coding CLIs to one subscription',
      'Public TypeScript source and live Pages surface',
      'Four repository stars as of the dated snapshot',
    ],
    liveUrl: 'https://animesh.kundus.in/github-router/',
    selected: true,
  },
  {
    slug: 'ai-or-die',
    title: 'AI or Die',
    category: 'Models and agents',
    schemaType: 'SoftwareApplication',
    summary:
      'A browser surface for Claude, Codex, Gemini, and Copilot command-line workflows.',
    highlights: ['Multiple coding systems in one web surface', 'Public live app', 'JavaScript implementation'],
    liveUrl: 'https://animesh.kundus.in/ai-or-die/',
  },
  {
    slug: 'kusto-mcp',
    title: 'Kusto MCP',
    category: 'Models and agents',
    schemaType: 'SoftwareSourceCode',
    summary: 'A Python MCP server for Kusto and Azure Data Explorer work.',
    highlights: ['MCP tool surface', 'Kusto query workflow', 'Python implementation'],
    liveUrl: 'https://animesh.kundus.in/kusto-mcp/',
  },
  {
    slug: 'runnerize',
    title: 'Runnerize',
    category: 'Systems and libraries',
    schemaType: 'SoftwareSourceCode',
    summary:
      'A dispatcher that mints an ephemeral JIT GitHub Actions runner for each queued job in a throwaway rootless container.',
    highlights: [
      'One runner per queued job',
      'Rootless container isolation',
      'Stateless, on-demand execution',
    ],
    liveUrl: 'https://animesh.kundus.in/runnerize/',
    selected: true,
  },
  {
    slug: 'mermaid-editor',
    title: 'Mermaid Editor',
    category: 'Browser tools',
    schemaType: 'SoftwareApplication',
    summary: 'A local Mermaid editor with live preview, sharing, and export.',
    highlights: ['Live diagram feedback', 'Local editing', 'Share and export paths'],
    liveUrl: 'https://animesh.kundus.in/mermaid-editor/',
    selected: true,
  },
  {
    slug: 'pdf-viewer',
    title: 'PDF Viewer',
    category: 'Browser tools',
    schemaType: 'SoftwareApplication',
    summary: 'A browser-local PDF viewer and editor with annotation and export.',
    highlights: ['Local document processing', 'Annotation tools', 'PDF export'],
    liveUrl: 'https://animesh.kundus.in/pdf-viewer/',
  },
  {
    slug: 'gist-preview',
    title: 'Gist Preview',
    category: 'Browser tools',
    schemaType: 'SoftwareApplication',
    summary: 'A focused renderer for public GitHub Gists, including interactive previews.',
    highlights: ['Public Gist rendering', 'Shareable preview URLs', 'Responsive preview modes'],
    liveUrl: 'https://animesh.kundus.in/gist-preview/',
  },
  {
    slug: 'har-viewer',
    title: 'HAR Viewer',
    category: 'Browser tools',
    schemaType: 'SoftwareApplication',
    summary: 'A client-side HTTP archive inspector for requests, timings, and responses.',
    highlights: ['Local HAR parsing', 'Request filters', 'Timing inspection'],
    liveUrl: 'https://animesh.kundus.in/har-viewer/',
  },
  {
    slug: 'saz-viewer',
    title: 'SAZ Viewer',
    category: 'Browser tools',
    schemaType: 'SoftwareApplication',
    summary: 'A browser-local viewer for Fiddler SAZ capture files.',
    highlights: ['Local archive parsing', 'Session inspection', 'No desktop install'],
    liveUrl: 'https://animesh.kundus.in/saz-viewer/',
  },
  {
    slug: 'sanger-viewer',
    title: 'Sanger Viewer',
    category: 'Browser tools',
    schemaType: 'SoftwareApplication',
    summary:
      'A high-performance browser viewer for AB1 and SCF sequencing chromatograms.',
    highlights: ['Chromatogram rendering', 'Base calls and quality scores', 'Client-side files'],
    liveUrl: 'https://animesh.kundus.in/sanger-viewer/',
    selected: true,
  },
  {
    slug: 'media-tools',
    title: 'Media Tools',
    category: 'Browser tools',
    schemaType: 'SoftwareApplication',
    summary: 'Offline audio cutting for Firefox and Chrome.',
    highlights: ['Local audio work', 'Firefox and Chrome', 'No file upload'],
    liveUrl: 'https://animesh.kundus.in/media-tools/',
  },
  {
    slug: 'file-tools',
    title: 'File Tools',
    category: 'Browser tools',
    schemaType: 'SoftwareApplication',
    summary: 'Offline ZIP extraction for Firefox and Chrome.',
    highlights: ['Local archive extraction', 'Firefox and Chrome', 'No file upload'],
    liveUrl: 'https://animesh.kundus.in/file-tools/',
  },
  {
    slug: 'photo-tools',
    title: 'Photo Tools',
    category: 'Browser tools',
    schemaType: 'SoftwareApplication',
    summary: 'Offline photo collage tools that keep image work in the browser.',
    highlights: ['Local photo processing', 'Collage workflow', 'No image upload'],
    liveUrl: 'https://animesh.kundus.in/photo-tools/',
  },
  {
    slug: 'torrent-dl',
    title: 'Torrent DL',
    category: 'Systems and libraries',
    schemaType: 'SoftwareSourceCode',
    summary: 'A streaming torrent client for Python.',
    highlights: ['32 repository stars', 'Streaming-oriented API', 'Public Python source'],
    liveUrl: 'https://animesh.kundus.in/torrent-dl/',
    selected: true,
  },
  {
    slug: 'pyflix',
    title: 'PyFlix',
    category: 'Systems and libraries',
    schemaType: 'SoftwareSourceCode',
    summary: 'A Python torrent streaming library.',
    highlights: ['14 repository stars', 'Reusable streaming layer', 'Public Python source'],
    liveUrl: 'https://animesh.kundus.in/pyflix/',
  },
  {
    slug: 'media-server',
    title: 'Media Server',
    category: 'Systems and libraries',
    schemaType: 'SoftwareSourceCode',
    summary: 'An HTTP media server for VLC playback.',
    highlights: ['HTTP media delivery', 'VLC workflow', 'Python implementation'],
  },
  {
    slug: 'pyscrape',
    title: 'PyScrape',
    category: 'Systems and libraries',
    schemaType: 'SoftwareSourceCode',
    summary: 'A lightweight headless web scraper with JavaScript rendering and an HTTP API.',
    highlights: ['Headless rendering', 'HTTP API', 'Python implementation'],
  },
  {
    slug: 'file-dl',
    title: 'File DL',
    category: 'Systems and libraries',
    schemaType: 'SoftwareSourceCode',
    summary: 'A parallel file download accelerator in Python.',
    highlights: ['Parallel downloads', 'Command-line workflow', 'Public Python source'],
  },
  {
    slug: 'yt-flask',
    title: 'YT Flask',
    category: 'Early public work',
    schemaType: 'SoftwareSourceCode',
    summary: 'An early Flask framework experiment.',
    highlights: ['Python and Flask', 'Public historical source', 'Part of a longer build record'],
  },
  {
    slug: 'funnel',
    title: 'Funnel',
    category: 'Early public work',
    schemaType: 'SoftwareSourceCode',
    summary: 'An early connection pooling project.',
    highlights: ['Shell implementation', 'Connection pooling', 'Public historical source'],
    liveUrl: 'https://animesh.kundus.in/funnel/',
  },
  {
    slug: 'flake',
    title: 'Flake',
    category: 'Early public work',
    schemaType: 'SoftwareSourceCode',
    summary: 'A small PHP web framework.',
    highlights: ['PHP framework work', 'Public historical source', '2014-era trajectory'],
    liveUrl: 'https://animesh.kundus.in/flake/',
  },
  {
    slug: 'ml',
    title: 'ML',
    category: 'Early public work',
    schemaType: 'SoftwareSourceCode',
    summary: 'A 2014 PHP machine learning library experiment.',
    highlights: ['Early model-oriented work', 'PHP implementation', 'Public historical source'],
  },
  {
    slug: 'msp_api',
    title: 'MSP API',
    category: 'Early public work',
    schemaType: 'SoftwareSourceCode',
    summary: 'An unofficial API exploration written in Python.',
    highlights: ['API reverse engineering', 'Python implementation', 'Public historical source'],
  },
  {
    slug: 'msp_scraper_lib',
    title: 'MSP Scraper Library',
    category: 'Early public work',
    schemaType: 'SoftwareSourceCode',
    summary: 'A small public Python scraping library.',
    highlights: ['Reusable scraper layer', 'Python implementation', 'Public historical source'],
  },
  {
    slug: 'html5_game',
    title: 'Flood Fill Game',
    category: 'Early public work',
    schemaType: 'SoftwareApplication',
    summary: 'An early HTML flood-fill game that remains playable.',
    highlights: ['Playable browser artifact', 'HTML implementation', 'Public historical source'],
    liveUrl: 'https://animesh.kundus.in/html5_game/',
  },
];

const repositories = new Map(
  repositorySnapshot.repositories.map((repository) => [
    repository.name,
    repository,
  ]),
);

const defaultInstall = (slug: string) => [
  `git clone https://github.com/animeshkundu/${slug}.git`,
  `cd ${slug}`,
  'Follow the public README for the project-specific setup.',
];

export const projects: Project[] = definitions.map((definition) => {
  const repository = repositories.get(definition.slug);

  if (!repository) {
    throw new Error(`Missing public repository snapshot for ${definition.slug}`);
  }

  const technologies = [
    repository.language,
    ...repository.topics.slice(0, 5),
  ].filter((technology): technology is string => Boolean(technology));

  const metrics =
    definition.slug === 'youtube-audio'
      ? [
          {
            label: 'Average daily users',
            value: '14,484',
            asOf: '2026-07-21',
            sourceUrl:
              'https://addons.mozilla.org/api/v5/addons/addon/youtube-audio/',
          },
          {
            label: 'Mozilla ratings',
            value: '527',
            asOf: '2026-07-21',
            sourceUrl:
              'https://addons.mozilla.org/api/v5/addons/addon/youtube-audio/',
          },
        ]
      : [
          {
            label: 'GitHub stars',
            value: String(repository.stars),
            asOf: repositorySnapshot.asOf,
            sourceUrl: repository.url,
          },
        ];

  return {
    ...definition,
    selected: definition.selected ?? false,
    install: definition.install ?? defaultInstall(definition.slug),
    usage:
      definition.usage ??
      'Read the public README for commands, examples, and current limitations.',
    technologies,
    sourceUrl: repository.url,
    metrics,
    updatedAt: repository.updatedAt,
  };
});

export const selectedProjects = projects.filter((project) => project.selected);

export const projectCategories: ProjectCategory[] = [
  'Shipped products',
  'Models and agents',
  'Browser tools',
  'Systems and libraries',
  'Early public work',
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
