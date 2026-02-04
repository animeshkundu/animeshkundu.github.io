# Animesh Kundu - Developer Portfolio

[![Build, Test, and Deploy](https://github.com/animeshkundu/animesh.kundu.in/actions/workflows/deploy.yml/badge.svg)](https://github.com/animeshkundu/animesh.kundu.in/actions/workflows/deploy.yml)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

A modern, elegant portfolio website showcasing my open source projects and developer tools.

**🚀 [Visit Live Site](https://animesh.kundu.in)**

## Features

- **🎨 Modern Design** - Clean, elegant UI with smooth animations
- **🌙 Dark Mode** - Automatic theme switching based on system preference
- **📱 Responsive** - Works beautifully on all devices
- **⚡ Fast** - Built with Vite for blazing fast performance
- **🔍 SEO Optimized** - Semantic HTML, structured data, and meta tags
- **🔄 Dynamic Content** - Automatically fetches repos from GitHub API
- **🖼️ Live Demos** - Interactive demos embedded directly in the page
- **✅ Tested** - Comprehensive test suite with Vitest

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Deployment**: GitHub Pages + GitHub Actions

## Featured Projects

### Web Tools (100% Client-Side)
- **[Mermaid Editor](https://animesh.kundu.in/mermaid-editor)** - Create diagrams with live preview
- **[Gist Preview](https://animesh.kundu.in/gist-preview)** - Render GitHub gists with React support
- **[SAZ Viewer](https://animesh.kundu.in/saz-viewer)** - Inspect Fiddler network captures
- **[HAR Viewer](https://animesh.kundu.in/har-viewer)** - Analyze HTTP archive files

### Popular Projects
- **[YouTube Audio](https://github.com/animeshkundu/youtube-audio)** - Firefox extension (167+ ⭐)
- **[Torrent DL](https://github.com/animeshkundu/torrent-dl)** - Streaming torrent client (33 ⭐)
- **[PyFlix](https://github.com/animeshkundu/pyflix)** - Torrent streaming library (14 ⭐)

## Development

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5000`.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | TypeScript type checking |

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `master` branch. The GitHub Actions workflow:

1. Checks out the code
2. Installs dependencies
3. Runs type checking
4. Runs tests
5. Builds for production
6. Deploys to GitHub Pages

## Project Structure

```
src/
├── App.tsx              # Main app component
├── main.tsx             # Entry point
├── index.css            # Global styles
├── components/
│   ├── Navbar.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── FeaturedProjects.tsx
│   ├── LiveDemos.tsx    # Interactive demo iframe
│   ├── AllRepositories.tsx  # Dynamic GitHub repos
│   ├── About.tsx
│   ├── FAQ.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── hooks/
│   ├── useGitHubRepos.ts
│   └── useTheme.ts
├── lib/
│   ├── github.ts        # GitHub API utilities
│   └── constants.ts     # Project data
└── types/
    └── index.ts         # TypeScript types
```

## Documentation

Comprehensive documentation is available in the `docs/` folder:

| Document | Description |
|----------|-------------|
| [PRD.md](./docs/PRD.md) | Product Requirements Document |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System architecture and technical decisions |
| [DESIGN.md](./docs/DESIGN.md) | Design system and UI guidelines |
| [AGENT.md](./docs/AGENT.md) | Instructions for LLM agents |
| [ADR/](./docs/ADR/) | Architectural Decision Records |
| [history/](./docs/history/) | Deprecated and removed features |

### For AI Agents

This repository includes configuration for GitHub Copilot and other AI coding agents:

- `.github/copilot-instructions.md` - Repository-wide Copilot instructions
- `.github/agents/` - Specialized agent definitions:
  - `planner.md` - Planning and research agent
  - `coder.md` - Implementation agent (TDD-focused)
  - `reviewer.md` - Code review and testing agent
  - `orchestrator.md` - Workflow coordination agent

## License

MIT License - See [LICENSE](./LICENSE) for details.

---

Built with ❤️ by [Animesh Kundu](https://github.com/animeshkundu)
