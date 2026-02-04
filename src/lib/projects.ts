/**
 * Comprehensive project data for individual project pages
 * Each project has detailed information for SEO and discoverability
 */

export interface ProjectData {
  id: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  language: string;
  technologies: string[];
  features: string[];
  installation?: string[];
  usage?: string;
  demoUrl?: string;
  githubUrl: string;
  stars: number;
  forks: number;
  category: 'web-tools' | 'browser-extensions' | 'python-utilities' | 'cli-tools' | 'php' | 'other';
  status: 'active' | 'maintained' | 'archived' | 'experimental';
  lastUpdated: string;
  topics: string[];
}

export const ALL_PROJECTS: ProjectData[] = [
  // ===== WEB TOOLS =====
  {
    id: 'mermaid-editor',
    name: 'mermaid-editor',
    title: 'Mermaid Editor',
    tagline: 'Create beautiful diagrams with live preview',
    description: 'Modern, client-side Mermaid diagram editor with Monaco editor, live preview, pan/zoom controls, and export to PNG/SVG/Markdown.',
    longDescription: `A modern, client-side editor for creating Mermaid diagrams with real-time preview. No account required, no server-side processing. Everything runs in your browser.

Features include a full Monaco code editor with syntax highlighting, smooth pan and zoom controls for navigating large diagrams, multiple themes (Default, Forest, Dark, Neutral), and export options including SVG, PNG (up to 4x scale), and Markdown.

Share diagrams via encoded URLs without any server. Supports 20+ diagram types including flowcharts, sequence diagrams, class diagrams, state diagrams, ER diagrams, Gantt charts, pie charts, mindmaps, timelines, and more.`,
    language: 'TypeScript',
    technologies: ['React 19', 'Vite', 'Monaco Editor', 'Tailwind CSS', 'shadcn/ui', 'Mermaid'],
    features: [
      'Live preview as you type',
      'Monaco editor with syntax highlighting',
      'Pan and zoom controls',
      '5 Mermaid themes',
      'Export to PNG, SVG, Markdown',
      'Copy diagram to clipboard',
      'Share via URL (no server)',
      'Keyboard shortcuts',
      'Undo/Redo support',
      'Dark mode',
      '20+ diagram types'
    ],
    installation: [
      'git clone https://github.com/animeshkundu/mermaid-editor.git',
      'cd mermaid-editor',
      'npm install',
      'npm run dev'
    ],
    usage: 'Open the editor, write Mermaid syntax in the left panel, see the diagram render in real-time on the right. Use the toolbar to export or share.',
    demoUrl: 'https://animesh.kundu.in/mermaid-editor',
    githubUrl: 'https://github.com/animeshkundu/mermaid-editor',
    stars: 0,
    forks: 0,
    category: 'web-tools',
    status: 'active',
    lastUpdated: '2025-12',
    topics: ['mermaid', 'diagram', 'editor', 'flowchart', 'typescript', 'react']
  },
  {
    id: 'har-viewer',
    name: 'har-viewer',
    title: 'HAR Viewer',
    tagline: 'Analyze HTTP archive files with waterfall charts',
    description: 'Client-side HTTP Archive analyzer with waterfall charts, request filtering, detailed timing visualization, and JSON formatting.',
    longDescription: `A 100% client-side web application for securely loading, parsing, and visualizing HTTP Archive (HAR) files for network debugging. Your sensitive HAR data never leaves your browser.

Features drag and drop upload, request statistics showing total requests and transferred size, advanced filtering by resource type and URL, a beautiful waterfall chart with color-coded timeline visualization of request phases, and detailed request view with headers, response, timings, query params, and POST data.

Built with privacy in mind: all processing happens in your browser using Web Workers for non-blocking parsing. No data storage or tracking. Perfect for debugging network issues without privacy concerns.`,
    language: 'TypeScript',
    technologies: ['React 19', 'Zustand', 'Tailwind CSS', 'Web Workers', 'shadcn/ui'],
    features: [
      '100% client-side processing',
      'Drag and drop file upload',
      'Request statistics',
      'Advanced filtering',
      'Waterfall chart visualization',
      'Detailed request inspection',
      'JSON auto-formatting',
      'Raw HAR inspector',
      '90%+ test coverage',
      'Dark mode'
    ],
    installation: [
      'git clone https://github.com/animeshkundu/har-viewer.git',
      'cd har-viewer',
      'npm install',
      'npm run dev'
    ],
    usage: 'Drag and drop a .har file onto the dropzone. Use filters to narrow down requests. Click any request to view detailed information.',
    demoUrl: 'https://animesh.kundu.in/har-viewer',
    githubUrl: 'https://github.com/animeshkundu/har-viewer',
    stars: 0,
    forks: 0,
    category: 'web-tools',
    status: 'active',
    lastUpdated: '2025-12',
    topics: ['har', 'network', 'debugging', 'waterfall', 'typescript', 'react']
  },
  {
    id: 'saz-viewer',
    name: 'saz-viewer',
    title: 'SAZ Viewer',
    tagline: 'Inspect Fiddler network captures securely',
    description: '100% client-side Fiddler SAZ file viewer. Inspect network sessions with syntax highlighting, multi-tab interface, and secure local processing.',
    longDescription: `A 100% client-side, serverless web application for inspecting Telerik Fiddler .saz files in-browser without uploading data or installing desktop software.

All parsing happens locally in your browser. No data leaves your machine. Features include drag and drop file loading, a multi-tab session inspector with auto-detection for Headers, Raw, JSON, XML, and Hex views, a professional grid with sortable columns and search filtering, and beautiful syntax highlighting for code rendering.

Fast and responsive, handles large files with async parsing. Perfect for developers who need to inspect Fiddler captures without installing the desktop application.`,
    language: 'TypeScript',
    technologies: ['React 19', 'Vite', 'Tailwind CSS', 'JSZip', 'shadcn/ui'],
    features: [
      '100% client-side',
      'Drag and drop upload',
      'Multi-tab session inspector',
      'Auto content detection',
      'Syntax highlighting',
      'Sortable columns',
      'Search and filter',
      'Method filtering',
      'Async parsing',
      '92%+ test coverage'
    ],
    installation: [
      'git clone https://github.com/animeshkundu/saz-viewer.git',
      'cd saz-viewer',
      'npm install',
      'npm run dev'
    ],
    usage: 'Drag and drop a .saz file. Browse sessions in the grid. Click a session to inspect its headers, body, and raw content.',
    demoUrl: 'https://animesh.kundu.in/saz-viewer',
    githubUrl: 'https://github.com/animeshkundu/saz-viewer',
    stars: 0,
    forks: 0,
    category: 'web-tools',
    status: 'active',
    lastUpdated: '2025-12',
    topics: ['saz', 'fiddler', 'network', 'debugging', 'typescript', 'react']
  },
  {
    id: 'gist-preview',
    name: 'gist-preview',
    title: 'Gist Preview',
    tagline: 'Render GitHub gists with React support',
    description: 'Elegant GitHub Gist renderer with React/JSX live transpilation, responsive previews, fullscreen mode, and smart content-aware rendering.',
    longDescription: `A modern, elegant web application that transforms GitHub Gists into beautifully rendered web pages. Supports smart URL parsing, content-aware rendering, and live React component execution.

Automatically detects HTML, Markdown, JSON, CSS, JavaScript, and React/JSX files. JSX components are transpiled live with Babel and rendered as interactive React applications. Features responsive preview modes (desktop, tablet, mobile), fullscreen mode for immersive viewing, and multi-file support with navigation.

Share gist previews with permanent links. When opened via shared link, the preview loads in locked fullscreen mode for a clean, distraction-free experience.`,
    language: 'TypeScript',
    technologies: ['React 19', 'Babel', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui'],
    features: [
      'Smart URL parsing',
      'Content-aware rendering',
      'Live React/JSX execution',
      'Responsive viewport toggles',
      'Fullscreen mode',
      'Multi-file support',
      'Recent history',
      'Shareable URLs',
      'Dark theme',
      '90%+ test coverage'
    ],
    installation: [
      'git clone https://github.com/animeshkundu/gist-preview.git',
      'cd gist-preview',
      'npm install',
      'npm run dev'
    ],
    usage: 'Paste a GitHub Gist URL or ID, click Preview. Use viewport controls to test responsive layouts. Share the URL for others to see.',
    demoUrl: 'https://animesh.kundu.in/gist-preview',
    githubUrl: 'https://github.com/animeshkundu/gist-preview',
    stars: 0,
    forks: 0,
    category: 'web-tools',
    status: 'active',
    lastUpdated: '2025-12',
    topics: ['gist', 'github', 'preview', 'react', 'jsx', 'typescript']
  },
  {
    id: 'pdf-viewer',
    name: 'pdf-viewer',
    title: 'PDF Viewer',
    tagline: 'View and annotate PDFs in your browser',
    description: 'Client-side PDF viewer and editor with annotations, page management, and export. Inspired by macOS Preview.',
    longDescription: `A client-side web application for viewing, annotating, and editing PDF documents with zero server dependency. Inspired by the minimalist excellence of macOS Preview.

All PDF processing happens in the browser. Your documents never leave your device. Features include smooth scrolling, zoom controls, page thumbnails, text selection, and search. Annotate with highlights, drawings, shapes, text boxes, sticky notes, and signatures.

Edit documents by reordering, deleting, and rotating pages. Export modified PDFs with embedded annotations. Built for privacy: no uploads, no tracking, complete control over your documents.`,
    language: 'TypeScript',
    technologies: ['React 19', 'PDF.js', 'pdf-lib', 'Tailwind CSS', 'shadcn/ui', 'Vite'],
    features: [
      '100% client-side',
      'Smooth scrolling and zoom',
      'Page thumbnails',
      'Text selection and search',
      'Highlight annotations',
      'Drawing tools',
      'Shapes and text boxes',
      'Sticky notes',
      'Signatures',
      'Page reorder/delete/rotate',
      'Export with annotations',
      '60fps scrolling',
      'Mobile responsive'
    ],
    installation: [
      'git clone https://github.com/animeshkundu/pdf-viewer.git',
      'cd pdf-viewer',
      'npm install',
      'npm run dev'
    ],
    usage: 'Open the app and drop a PDF file. Navigate pages, zoom in/out, add annotations, and export the modified PDF.',
    demoUrl: 'https://animesh.kundu.in/pdf-viewer',
    githubUrl: 'https://github.com/animeshkundu/pdf-viewer',
    stars: 0,
    forks: 0,
    category: 'web-tools',
    status: 'active',
    lastUpdated: '2025-12',
    topics: ['pdf', 'viewer', 'editor', 'annotations', 'typescript', 'react']
  },

  // ===== BROWSER EXTENSIONS =====
  {
    id: 'youtube-audio',
    name: 'youtube-audio',
    title: 'YouTube Audio',
    tagline: 'Listen to YouTube without video playback',
    description: 'Firefox extension to disable video playback on YouTube. Save bandwidth, battery life, and CPU usage. Perfect for music listening.',
    longDescription: `A Firefox extension that turns off video on YouTube so you can listen to audio only. Ideal for listening to music or podcasts while working without the video eating up your laptop's battery, data, and CPU.

YouTube does not provide this functionality natively. This extension fills that gap by disabling video playback while keeping the audio stream. Your laptop runs cooler, your battery lasts longer, and you save bandwidth.

One of the most popular projects with 167+ stars on GitHub and 39 forks. Available on Firefox Add-ons.`,
    language: 'JavaScript',
    technologies: ['WebExtensions API', 'Firefox Add-ons'],
    features: [
      'Disable video playback',
      'Keep audio streaming',
      'Save battery life',
      'Reduce bandwidth usage',
      'Lower CPU usage',
      'Perfect for music',
      '167+ GitHub stars'
    ],
    installation: [
      'Install from Firefox Add-ons: https://addons.mozilla.org/en-US/firefox/addon/youtube-audio/',
      'Or clone and load as temporary add-on in about:debugging'
    ],
    usage: 'Install the extension, navigate to YouTube. Videos will play audio only without the video component.',
    githubUrl: 'https://github.com/animeshkundu/youtube-audio',
    stars: 167,
    forks: 39,
    category: 'browser-extensions',
    status: 'maintained',
    lastUpdated: '2025-09',
    topics: ['youtube', 'audio', 'firefox', 'extension', 'bandwidth', 'battery']
  },

  // ===== PYTHON UTILITIES =====
  {
    id: 'torrent-dl',
    name: 'torrent-dl',
    title: 'Torrent DL',
    tagline: 'Stream torrents while downloading',
    description: 'Streaming torrent client for Python. Watch while you download with VLC integration. Supports random and incremental seek.',
    longDescription: `A port of the beloved peerflix to Python. Popcorn Time was a cool solution to play torrents directly while downloading, but getting it to work was often a challenge. Peerflix just works.

This streaming torrent client lets you simultaneously watch and download a torrent. It supports random and incremental seek functionality of the media player. Just run torrent-dl with a magnet link and it will automatically start playing once enough of the file is downloaded.

Built on the pyflix library. Available on PyPI for easy installation.`,
    language: 'Python',
    technologies: ['Python', 'libtorrent', 'VLC'],
    features: [
      'Stream while downloading',
      'Automatic VLC playback',
      'Random seek support',
      'Incremental seek support',
      'HTTP streaming server',
      'Custom download directory',
      'Verbose logging option',
      'PyPI package available'
    ],
    installation: [
      '# Ubuntu',
      'sudo apt-get install libtorrent-rasterbar8 python-libtorrent',
      'pip install torrent-dl',
      '',
      '# macOS (with Homebrew)',
      'brew install boost --build-from-source --with-python',
      'brew install libtorrent-rasterbar --enable-python-binding',
      'pip install torrent-dl'
    ],
    usage: 'torrent-dl "magnet:?xt=urn:btih:..." to start streaming. Use --serve to run as HTTP server without VLC.',
    githubUrl: 'https://github.com/animeshkundu/torrent-dl',
    stars: 32,
    forks: 8,
    category: 'python-utilities',
    status: 'maintained',
    lastUpdated: '2026-01',
    topics: ['torrent', 'streaming', 'python', 'vlc', 'peerflix', 'magnet']
  },
  {
    id: 'pyflix',
    name: 'pyflix',
    title: 'PyFlix',
    tagline: 'Core torrent streaming library for Python',
    description: 'Torrent streaming library for Python. The core library powering torrent-dl, designed for building streaming torrent applications.',
    longDescription: `The torrent streaming library that powers torrent-dl. PyFlix provides the core functionality for streaming torrents in Python applications.

Designed for developers who want to build their own streaming torrent applications. Handles the complexities of torrent downloading and streaming so you can focus on your application logic.

Used as a dependency by torrent-dl but can be used independently for custom streaming solutions.`,
    language: 'Python',
    technologies: ['Python', 'libtorrent'],
    features: [
      'Torrent streaming core',
      'Reusable library',
      'Stream support',
      'Seek functionality',
      'Used by torrent-dl'
    ],
    installation: [
      'pip install pyflix'
    ],
    usage: 'Import pyflix in your Python project to add torrent streaming capabilities.',
    githubUrl: 'https://github.com/animeshkundu/pyflix',
    stars: 14,
    forks: 3,
    category: 'python-utilities',
    status: 'maintained',
    lastUpdated: '2025-02',
    topics: ['torrent', 'streaming', 'python', 'library', 'popcorn-time']
  },
  {
    id: 'pyscrape',
    name: 'pyscrape',
    title: 'PyScrape',
    tagline: 'Headless web scraper with JavaScript rendering',
    description: 'Lightweight headless web scraper with JavaScript rendering in Python. Includes HTTP API for easy integration.',
    longDescription: `JavaScript frameworks are everywhere now. Unfortunately that means classic tools like wget and curl can not always get the job done. Loading a page in the browser and copying the source is too cumbersome for developers who live in the terminal.

PyScrape (and its HTTP sibling pyrun) solve this problem. They provide a seamless terminal experience for scraping JavaScript-heavy websites. Use pyscrape as a command-line tool or pyrun as an HTTP API server for integration with your scripts.

Navigate the unwieldy world of JavaScript rendering from your terminal or batch scripts.`,
    language: 'Python',
    technologies: ['Python', 'Qt5/WebKit', 'HTTP API', 'xvfb'],
    features: [
      'JavaScript rendering',
      'Command-line interface',
      'HTTP API server',
      'Easy scripting integration',
      'Terminal-friendly',
      'PyPI package (scrapejs)'
    ],
    installation: [
      'sudo apt-get install qt5-default libqt5webkit5-dev build-essential python-lxml xvfb',
      'pip install scrapejs'
    ],
    usage: 'pyscrape http://example.com/ to scrape a page. Run pyrun -p 1234 to start HTTP API, then curl localhost:1234/scrape?url=...',
    githubUrl: 'https://github.com/animeshkundu/pyscrape',
    stars: 4,
    forks: 0,
    category: 'python-utilities',
    status: 'maintained',
    lastUpdated: '2023-06',
    topics: ['scraper', 'headless', 'javascript', 'python', 'api', 'webkit']
  },
  {
    id: 'file-dl',
    name: 'file-dl',
    title: 'File DL',
    tagline: 'Download accelerator for the command line',
    description: 'File Download Accelerator supporting HTTP and FTP. CLI tool for any Unix system. Inspired by IDM on Windows.',
    longDescription: `A file download accelerator for the command line. Supports both HTTP and FTP downloads with parallel connections. Inspired by Internet Download Manager (IDM) on Windows but built for Unix systems.

Splits downloads into chunks and downloads them in parallel for faster speeds. Includes retry support, authentication, and configurable chunk sizes. Available on PyPI for easy installation.`,
    language: 'Python',
    technologies: ['Python'],
    features: [
      'HTTP and FTP support',
      'Parallel downloads',
      'Configurable parallelism',
      'Retry support',
      'Authentication support',
      'Custom download directory',
      'Chunk size control',
      'PyPI package available'
    ],
    installation: [
      'pip install file-dl'
    ],
    usage: 'file-dl https://example.com/file.zip -p 8 to download with 8 parallel connections.',
    githubUrl: 'https://github.com/animeshkundu/file-dl',
    stars: 3,
    forks: 2,
    category: 'python-utilities',
    status: 'maintained',
    lastUpdated: '2022-11',
    topics: ['downloader', 'accelerator', 'python', 'http', 'ftp', 'cli']
  },
  {
    id: 'media-server',
    name: 'media-server',
    title: 'Media Server',
    tagline: 'HTTP media server for wireless playback',
    description: 'HTTP Media Server for VLC. Stream media wirelessly without SMB hassles. Shows playlist directly in VLC.',
    longDescription: `An HTTP media server designed for wireless media playback. Created because SMB, AFP, and other network file sharing protocols were too slow and jittery for smooth media playback.

Shows the playlist directly in VLC so you can click and play. Supports both random and incremental seek. Can also play directly in the browser on HTML5-enabled devices.

Available on PyPI as 'videopy'. Perfect for streaming movies and music from a desktop with attached hard drives to other devices on the network.`,
    language: 'Python',
    technologies: ['Python', 'HTTP Server', 'VLC'],
    features: [
      'HTTP streaming',
      'VLC playlist integration',
      'Browser playback',
      'Random seek support',
      'Incremental seek support',
      'Background daemon mode',
      'PID file management',
      'PyPI package (videopy)'
    ],
    installation: [
      'pip install videopy'
    ],
    usage: 'videopy -d /path/to/media to serve. Open VLC with http://[ip]:1149/vlc to browse and play.',
    githubUrl: 'https://github.com/animeshkundu/media-server',
    stars: 3,
    forks: 3,
    category: 'python-utilities',
    status: 'maintained',
    lastUpdated: '2022-11',
    topics: ['media-server', 'vlc', 'streaming', 'python', 'http', 'video']
  },
  {
    id: 'yt-flask',
    name: 'yt-flask',
    title: 'YT Flask',
    tagline: 'Personal Flask framework',
    description: 'Custom Flask framework with personal conventions and utilities.',
    longDescription: `A personal Flask framework with custom conventions and utilities. Provides a structured way to build Flask applications following preferred patterns and practices.`,
    language: 'Python',
    technologies: ['Python', 'Flask'],
    features: [
      'Flask framework',
      'Custom conventions',
      'Utility functions'
    ],
    installation: [
      'git clone https://github.com/animeshkundu/yt-flask.git',
      'pip install -r requirements.txt'
    ],
    usage: 'Use as a base for Flask projects.',
    githubUrl: 'https://github.com/animeshkundu/yt-flask',
    stars: 0,
    forks: 0,
    category: 'python-utilities',
    status: 'maintained',
    lastUpdated: '2024-03',
    topics: ['flask', 'python', 'framework', 'web']
  },
  {
    id: 'msp_scraper_lib',
    name: 'msp_scraper_lib',
    title: 'MSP Scraper Lib',
    tagline: 'Simple MSP scraping library',
    description: 'Simple library for scraping MSP data in Python.',
    longDescription: `A simple Python library for scraping MSP (Managed Service Provider) data. Provides basic utilities for data extraction.`,
    language: 'Python',
    technologies: ['Python'],
    features: [
      'MSP data scraping',
      'Simple API'
    ],
    installation: [
      'git clone https://github.com/animeshkundu/msp_scraper_lib.git'
    ],
    usage: 'Import and use in your Python projects.',
    githubUrl: 'https://github.com/animeshkundu/msp_scraper_lib',
    stars: 0,
    forks: 0,
    category: 'python-utilities',
    status: 'archived',
    lastUpdated: '2016-09',
    topics: ['msp', 'scraper', 'python', 'library']
  },
  {
    id: 'msp_api',
    name: 'msp_api',
    title: 'MSP API',
    tagline: 'Unofficial MSP APIs',
    description: 'Unofficial API implementations for MSP services in Python.',
    longDescription: `Unofficial API implementations for interacting with MSP (Managed Service Provider) services. Provides Python bindings for various MSP operations.`,
    language: 'Python',
    technologies: ['Python'],
    features: [
      'Unofficial MSP APIs',
      'Python bindings'
    ],
    installation: [
      'git clone https://github.com/animeshkundu/msp_api.git'
    ],
    usage: 'Import and use in your Python projects.',
    githubUrl: 'https://github.com/animeshkundu/msp_api',
    stars: 0,
    forks: 0,
    category: 'python-utilities',
    status: 'archived',
    lastUpdated: '2016-10',
    topics: ['msp', 'api', 'python', 'unofficial']
  },

  // ===== CLI TOOLS =====
  {
    id: 'oops',
    name: 'oops',
    title: 'Oops',
    tagline: 'Fix command-line typos instantly',
    description: 'A blazingly fast command-line typo corrector written in Rust. 175+ correction rules, sub-50ms startup, cross-platform.',
    longDescription: `A blazingly fast command-line typo corrector written in Rust. When you mistype a command, just type 'oops' to get suggested corrections.

Includes 175+ correction rules for common CLI mistakes covering git, package managers (apt, brew, npm, pip, cargo), system commands, and development tools. With sub-50ms startup time, it is 10x faster than Python alternatives like thefuck.

Ships as a single binary with no runtime dependencies. Works on Linux, macOS, and Windows with shell integration for Bash, Zsh, Fish, PowerShell, and Tcsh.`,
    language: 'Rust',
    technologies: ['Rust', 'CLI'],
    features: [
      '175+ correction rules',
      'Sub-50ms startup',
      'Single binary',
      'No runtime dependencies',
      'Cross-platform',
      'Shell integration',
      'Git rules',
      'Package manager rules',
      'System command rules',
      'Configurable',
      'thefuck compatible'
    ],
    installation: [
      '# Download from GitHub Releases',
      'curl -LO https://github.com/animeshkundu/oops/releases/latest/download/oops-linux-x86_64',
      'chmod +x oops-linux-x86_64',
      'sudo mv oops-linux-x86_64 /usr/local/bin/oops',
      '',
      '# Or with Homebrew',
      'brew install animeshkundu/tap/oops',
      '',
      '# Or from source',
      'cargo install --git https://github.com/animeshkundu/oops'
    ],
    usage: 'Add eval "$(oops --alias)" to your shell config. After a typo, just type oops to see and run corrections.',
    githubUrl: 'https://github.com/animeshkundu/oops',
    stars: 1,
    forks: 0,
    category: 'cli-tools',
    status: 'active',
    lastUpdated: '2026-01',
    topics: ['cli', 'rust', 'typo', 'correction', 'thefuck', 'shell']
  },

  // ===== OTHER =====
  {
    id: 'funnel',
    name: 'funnel',
    title: 'Funnel',
    tagline: 'Network connection pooling in C',
    description: 'Connection pooling implementation in C. Experimental project for learning network programming.',
    longDescription: `An experimental connection pooling implementation in C. Created as a learning project for network programming concepts.

Note: This is an experimental project. Not recommended for production use. Working but needs cleanup and refactoring.`,
    language: 'C',
    technologies: ['C', 'Sockets', 'Network'],
    features: [
      'Connection pooling',
      'Network programming',
      'Experimental'
    ],
    installation: [
      'git clone https://github.com/animeshkundu/funnel.git',
      'make'
    ],
    usage: 'For learning and experimentation only.',
    githubUrl: 'https://github.com/animeshkundu/funnel',
    stars: 0,
    forks: 0,
    category: 'other',
    status: 'experimental',
    lastUpdated: '2014-04',
    topics: ['c', 'networking', 'connection-pooling', 'experimental']
  },
  {
    id: 'flake',
    name: 'flake',
    title: 'Flake',
    tagline: 'Lightweight PHP micro framework',
    description: 'PHP micro framework with forking and evented modes. Benchmarked at 1000+ concurrency.',
    longDescription: `A lightweight PHP micro framework supporting both forking and evented server modes. Built for high concurrency.

Benchmarks show forking mode handles 483 concurrent connections while evented mode can handle 1000+ connections, solving the c10k problem. Note: This is alpha software, not recommended for production.`,
    language: 'PHP',
    technologies: ['PHP'],
    features: [
      'Forking mode',
      'Evented mode',
      'High concurrency',
      'c10k solution',
      'Lightweight'
    ],
    installation: [
      'git clone https://github.com/animeshkundu/flake.git'
    ],
    usage: 'Include flake.php and use handlers for extensions.',
    githubUrl: 'https://github.com/animeshkundu/flake',
    stars: 0,
    forks: 0,
    category: 'php',
    status: 'archived',
    lastUpdated: '2019-12',
    topics: ['php', 'framework', 'micro-framework', 'forking', 'evented']
  },
  {
    id: 'ml',
    name: 'ml',
    title: 'ML Library',
    tagline: 'Machine learning library in PHP',
    description: 'Machine learning library implementation in PHP. Educational project.',
    longDescription: `A machine learning library implemented in PHP. Created as an educational project to understand ML algorithms by implementing them from scratch.`,
    language: 'PHP',
    technologies: ['PHP'],
    features: [
      'ML algorithms',
      'PHP implementation',
      'Educational'
    ],
    installation: [
      'git clone https://github.com/animeshkundu/ml.git'
    ],
    usage: 'Include the library in your PHP project.',
    githubUrl: 'https://github.com/animeshkundu/ml',
    stars: 0,
    forks: 0,
    category: 'php',
    status: 'archived',
    lastUpdated: '2014-04',
    topics: ['php', 'machine-learning', 'library', 'educational']
  },
  {
    id: 'html5_game',
    name: 'html5_game',
    title: 'Flood Fill Game',
    tagline: 'Classic flood fill puzzle game',
    description: 'Classic flood fill game built with CoffeeScript and HTML5. Simple and addictive color puzzle.',
    longDescription: `A classic flood fill puzzle game built with CoffeeScript and HTML5. The goal is to fill the entire board with one color in the minimum number of moves.

Simple, fun, and addictive. Play directly in your browser.`,
    language: 'CoffeeScript',
    technologies: ['CoffeeScript', 'HTML5', 'Canvas'],
    features: [
      'Classic flood fill',
      'Color puzzle',
      'Browser-based',
      'HTML5 Canvas'
    ],
    installation: [
      'git clone https://github.com/animeshkundu/html5_game.git',
      'Open index.html in browser'
    ],
    usage: 'Click colors to flood fill from the top-left corner. Try to fill the board in minimum moves.',
    demoUrl: 'https://animesh.kundu.in/html5_game',
    githubUrl: 'https://github.com/animeshkundu/html5_game',
    stars: 0,
    forks: 0,
    category: 'other',
    status: 'maintained',
    lastUpdated: '2016-10',
    topics: ['game', 'html5', 'coffeescript', 'puzzle', 'flood-fill']
  },
  {
    id: 'collabedit',
    name: 'collabedit',
    title: 'CollabEdit',
    tagline: 'Collaborative editing project',
    description: 'Collaborative editing project.',
    longDescription: `A collaborative editing project. Details pending documentation.`,
    language: 'Unknown',
    technologies: [],
    features: [
      'Collaborative editing'
    ],
    installation: [
      'git clone https://github.com/animeshkundu/collabedit.git'
    ],
    usage: 'Check repository for details.',
    githubUrl: 'https://github.com/animeshkundu/collabedit',
    stars: 0,
    forks: 0,
    category: 'other',
    status: 'archived',
    lastUpdated: '2017-07',
    topics: ['collaborative', 'editor']
  }
];

// Helper function to get project by slug
export function getProjectBySlug(slug: string): ProjectData | undefined {
  return ALL_PROJECTS.find(p => p.id === slug || p.name === slug);
}

// Helper function to get projects by category
export function getProjectsByCategory(category: ProjectData['category']): ProjectData[] {
  return ALL_PROJECTS.filter(p => p.category === category);
}

// Helper function to get featured projects (active with demos or high stars)
export function getFeaturedProjects(): ProjectData[] {
  return ALL_PROJECTS.filter(p => 
    p.status === 'active' || 
    p.stars >= 10 || 
    p.demoUrl
  );
}

// Category labels for display
export const CATEGORY_LABELS: Record<ProjectData['category'], string> = {
  'web-tools': 'Web Tools',
  'browser-extensions': 'Browser Extensions',
  'python-utilities': 'Python Utilities',
  'cli-tools': 'CLI Tools',
  'php': 'PHP',
  'other': 'Other Projects'
};

// Category descriptions
export const CATEGORY_DESCRIPTIONS: Record<ProjectData['category'], string> = {
  'web-tools': 'Client-side web applications for developers',
  'browser-extensions': 'Extensions for Firefox and Chrome',
  'python-utilities': 'Command-line tools and libraries for Python',
  'cli-tools': 'Fast command-line utilities',
  'php': 'PHP frameworks and libraries',
  'other': 'Games, experiments, and other projects'
};
