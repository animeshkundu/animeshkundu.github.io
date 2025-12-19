# Architecture Documentation

## System Overview

This portfolio website is a modern, client-side rendered Single Page Application (SPA) built with React and TypeScript. It's designed to be fast, maintainable, and easy to deploy on static hosting platforms like GitHub Pages.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Client Browser                               │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    React Application                          │   │
│  │  ┌─────────────────────────────────────────────────────────┐ │   │
│  │  │                     App.tsx                              │ │   │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │ │   │
│  │  │  │ Navbar  │ │  Hero   │ │Featured │ │  Live   │       │ │   │
│  │  │  └─────────┘ └─────────┘ │Projects │ │ Demos   │       │ │   │
│  │  │  ┌─────────┐ ┌─────────┐ └─────────┘ └─────────┘       │ │   │
│  │  │  │  All    │ │  About  │ ┌─────────┐ ┌─────────┐       │ │   │
│  │  │  │  Repos  │ │         │ │   FAQ   │ │ Contact │       │ │   │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │ │   │
│  │  │  ┌─────────┐                                            │ │   │
│  │  │  │ Footer  │                                            │ │   │
│  │  │  └─────────┘                                            │ │   │
│  │  └─────────────────────────────────────────────────────────┘ │   │
│  │                              │                                │   │
│  │  ┌─────────────────────────────────────────────────────────┐ │   │
│  │  │                     Custom Hooks                         │ │   │
│  │  │  ┌─────────────────┐  ┌─────────────────┐               │ │   │
│  │  │  │ useGitHubRepos  │  │    useTheme     │               │ │   │
│  │  │  └─────────────────┘  └─────────────────┘               │ │   │
│  │  └─────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTPS
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         GitHub API                                   │
│                    api.github.com/users/animeshkundu                 │
└─────────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI Component Library |
| TypeScript | 5.9 | Type-safe JavaScript |
| Vite | 7 | Build Tool & Dev Server |

### Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 4 | Utility-first CSS |
| PostCSS | 8 | CSS Processing |
| Autoprefixer | 10 | CSS Vendor Prefixes |

### UI & Animation
| Technology | Purpose |
|------------|---------|
| Framer Motion | Animation Library |
| Lucide React | Icon Library |

### Testing
| Technology | Purpose |
|------------|---------|
| Vitest | Unit Testing Framework |
| React Testing Library | Component Testing |
| Playwright | E2E Testing |

### Code Quality
| Technology | Purpose |
|------------|---------|
| ESLint | Linting |
| TypeScript | Type Checking |

## Directory Structure

```
├── src/
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles & Tailwind imports
│   │
│   ├── components/          # React components
│   │   ├── index.ts         # Barrel exports
│   │   ├── Navbar.tsx       # Navigation component
│   │   ├── Hero.tsx         # Hero section
│   │   ├── FeaturedProjects.tsx
│   │   ├── LiveDemos.tsx
│   │   ├── AllRepositories.tsx
│   │   ├── About.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useGitHubRepos.ts
│   │   └── useTheme.ts
│   │
│   ├── lib/                 # Utilities & helpers
│   │   ├── github.ts        # GitHub API utilities
│   │   └── constants.ts     # Static data & configuration
│   │
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   │
│   ├── __tests__/           # Unit tests
│   │   ├── App.test.tsx
│   │   └── github.test.ts
│   │
│   └── test/                # Test utilities
│       └── setup.ts
│
├── e2e/                     # End-to-end tests
│   └── portfolio.spec.ts
│
├── public/                  # Static assets
│   └── ...
│
├── docs/                    # Documentation
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   ├── AGENT.md
│   ├── ADR/
│   └── history/
│
└── Configuration Files
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── tsconfig.json
    ├── eslint.config.js
    └── playwright.config.ts
```

## Key Architectural Decisions

### 1. Client-Side Rendering (CSR)

The application uses client-side rendering for simplicity and GitHub Pages compatibility. For details, see [ADR-0001](./ADR/0001-initial-tech-stack.md).

**Pros:**
- Simple deployment to static hosting
- No server infrastructure needed
- Rich interactivity

**Cons:**
- Initial load shows blank page
- SEO requires consideration
- Bundle size affects performance

### 2. Component-Based Architecture

The UI is built using React's component model with functional components and hooks.

**Principles:**
- Single Responsibility: Each component does one thing well
- Composition: Complex UIs built from simple components
- Reusability: Components are designed for reuse

### 3. Custom Hooks for State Logic

Business logic is extracted into custom hooks (`useGitHubRepos`, `useTheme`) to:
- Separate concerns
- Enable reuse
- Facilitate testing
- Keep components focused on rendering

### 4. TypeScript Throughout

TypeScript is used for all code to:
- Catch errors at compile time
- Improve IDE support and autocomplete
- Document code with types
- Enable safe refactoring

### 5. CSS-in-JS Alternative: Tailwind CSS

Tailwind CSS was chosen over CSS-in-JS solutions for:
- Smaller bundle size (purges unused CSS)
- Faster development with utility classes
- Consistent design system
- No runtime overhead

## Data Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   App.tsx    │────▶│    Hooks     │────▶│  Components  │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │  GitHub API  │
                    └──────────────┘
```

1. **App.tsx** mounts and renders the component tree
2. **Custom Hooks** manage state and side effects
3. **Components** receive props and render UI
4. **GitHub API** provides dynamic repository data

## Performance Considerations

### Bundle Optimization
- Tree shaking eliminates unused code
- Code splitting for lazy loading (future)
- Minification and compression

### Runtime Performance
- React 19's automatic optimizations
- Memoization where beneficial
- Lazy loading of images
- Efficient re-renders with hooks

### Loading Strategy
- Critical CSS inlined
- Fonts preloaded
- API calls deferred until needed

## Security Considerations

### Client-Side Security
- No sensitive data in client code
- Environment variables for configuration
- Content Security Policy headers (via GitHub Pages)

### API Security
- Read-only GitHub API access
- No authentication required
- Rate limiting handled gracefully

## Deployment Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Developer   │────▶│   GitHub     │────▶│GitHub Pages  │
│    Push      │     │   Actions    │     │   (CDN)      │
└──────────────┘     └──────────────┘     └──────────────┘
```

### CI/CD Pipeline
1. Push to `master`/`main` triggers workflow
2. Dependencies installed
3. Type checking & linting
4. Unit tests executed
5. Build created
6. E2E tests run against build
7. Deploy to GitHub Pages

## Scalability Considerations

### Current Limits
- GitHub API rate limits (60/hour unauthenticated)
- Static hosting limitations

### Future Scaling
- Consider API caching layer
- Implement service worker for offline support
- Add incremental static regeneration

## Related Documents

- [PRD](./PRD.md) - Product Requirements
- [Design](./DESIGN.md) - Design System
- [ADR](./ADR/) - Architectural Decision Records
