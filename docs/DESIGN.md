# Design Documentation

## Design Philosophy

This portfolio follows a **calm, tactile, and product-focused** design philosophy. The interface uses editorial scale, generous negative space, quiet material depth, and precise interaction feedback so the projects remain the focus.

### Core Principles

1. **Clarity Over Decoration** - Every element serves a purpose
2. **Material Restraint** - Depth comes from subtle surfaces, hairlines, and light
3. **Content First** - Design supports the work rather than competing with it
4. **Progressive Disclosure** - Show essential information first and details on demand
5. **Inclusive by Default** - Contrast, focus, touch targets, and reduced motion are foundational
6. **Consistent Experience** - The same hierarchy works across devices and themes

## Design System

### Color Palette

#### Light Theme
```css
--background:       #f6f3ee    /* Warm canvas */
--surface:          #fffdfa    /* Elevated surface */
--foreground:       #1a1814    /* Warm ink */
--muted-foreground: #6f6a62    /* Secondary ink */
--primary:          #c84f32    /* Terracotta action */
--accent:           #0f766e    /* Privacy/status teal */
--border:           #ded8cf    /* Hairline */
```

#### Dark Theme
```css
--background:       #11100f    /* Near-black canvas */
--surface:          #1b1a18    /* Graphite surface */
--foreground:       #f2efea    /* Warm white */
--muted-foreground: #b7b1a9    /* Secondary warm gray */
--primary:          #ef8b70    /* Light terracotta */
--accent:           #5eead4    /* Privacy/status teal */
--border:           #393633    /* Hairline */
```

### Typography

#### Font Stack
```css
font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont,
             'Segoe UI', sans-serif;
```

#### Type Scale
| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | clamp(3rem, 8vw, 7.5rem) | 600 | 0.94 | Hero statement |
| H2 | clamp(2.25rem, 5vw, 4.75rem) | 600 | 1.0 | Section headers |
| H3 | 1.5rem–2rem | 600 | 1.2 | Card titles |
| Body | 1rem–1.25rem | 400 | 1.65 | Paragraphs |
| Small | 0.875rem (14px) | 400 | 1.5 | Captions, meta |

### Spacing

Using Tailwind's default spacing scale based on 4px grid:

| Token | Size | Usage |
|-------|------|-------|
| 1 | 4px | Tight spacing |
| 2 | 8px | Related elements |
| 4 | 16px | Standard gap |
| 6 | 24px | Mobile gutters |
| 8 | 32px | Component spacing |
| 12 | 48px | Card padding |
| 24 | 96px | Mobile section rhythm |
| 32 | 128px | Desktop section rhythm |

### Border Radius

```css
--radius-sm:  0.75rem  /* 12px - compact controls */
--radius-md:  1.25rem  /* 20px - inputs and compact cards */
--radius-lg:  2rem     /* 32px - feature surfaces */
--radius-full: 9999px  /* circular */
```

### Shadows

```css
--shadow-sm:  0 1px 2px rgba(26, 24, 20, 0.04);
--shadow-md:  0 18px 50px -30px rgba(26, 24, 20, 0.28);
--shadow-lg:  0 32px 90px -42px rgba(26, 24, 20, 0.32);
```

## Component Design

### Buttons

#### Primary Button
```
┌─────────────────────────┐
│   Explore Projects  →   │  Terracotta background, white text
└─────────────────────────┘
- Pill-shaped control
- Hover: darken 10%
- Active: scale 98%
- Padding: 12px 24px
```

#### Secondary Button
```
┌─────────────────────────┐
│   Contact Me            │  Outlined, themed text
└─────────────────────────┘
- Border: 1px solid
- Hover: light fill
- Same sizing as primary
```

### Cards

```
┌─────────────────────────────────────────┐
│ ┌───────────────────────────────────┐   │
│ │         [Optional Icon]           │   │
│ └───────────────────────────────────┘   │
│                                         │
│  Project Title                          │
│  ─────────────────                      │
│  Description text that explains         │
│  what this project does...              │
│                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐               │
│  │ JS  │ │React│ │ TS  │  Tech tags    │
│  └─────┘ └─────┘ └─────┘               │
│                                         │
│  ⭐ 42 stars          View →            │
└─────────────────────────────────────────┘
```

**Card Specifications:**
- Background: elevated semantic surface
- Border radius: 24–32px
- Padding: 24–32px
- Shadow: soft ambient depth on hover
- Transition: 200ms ease-out

### Navigation

```
┌─────────────────────────────────────────────────────────────┐
│  🏠 Animesh Kundu    Projects  About  FAQ  Contact   [🌙]  │
└─────────────────────────────────────────────────────────────┘
```

**Navbar Specifications:**
- Fixed floating capsule on desktop, edge-to-edge glass bar on mobile
- Backdrop blur and low-contrast border
- Minimum control size: 44px
- Links: smooth scroll
- Mobile: hamburger menu

### Hero Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    I build tools that          ┌───────────────────────┐     │
│    developers love             │ Browser-first tools   │     │
│                                │ Privacy / Speed / OSS  │     │
│    Privacy-first developer     └───────────────────────┘     │
│    tools that run locally.                                   │
│                                                             │
│       ┌─────────────┐    ┌─────────────┐                   │
│       │ Explore Work│    │ Live Demos  │                   │
│       └─────────────┘    └─────────────┘                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Animation Guidelines

### Principles
- **Purpose**: Animations should guide attention, not distract
- **Subtlety**: Small, refined movements
- **Performance**: Use transforms and opacity only
- **Accessibility**: Respect `prefers-reduced-motion`

### Motion Values

| Property | Duration | Easing |
|----------|----------|--------|
| Hover states | 150ms | ease-out |
| Enter animations | 300ms | ease-out |
| Exit animations | 200ms | ease-in |
| Page transitions | 400ms | ease-in-out |

### Common Animations

#### Fade In Up (Section entrance)
```javascript
{
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}
```

#### Scale on Hover (Cards)
```javascript
{
  whileHover: { scale: 1.02 },
  transition: { type: 'spring', stiffness: 300 }
}
```

## Responsive Design

### Breakpoints

| Name | Min Width | Typical Devices |
|------|-----------|-----------------|
| xs | 320px | Small phones |
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large displays |

### Grid System

```
Desktop (lg+):      Tablet (md):        Mobile (sm-):
┌───┬───┬───┬───┐   ┌─────┬─────┐       ┌───────────┐
│   │   │   │   │   │     │     │       │           │
├───┼───┼───┼───┤   ├─────┼─────┤       ├───────────┤
│   │   │   │   │   │     │     │       │           │
└───┴───┴───┴───┘   └─────┴─────┘       └───────────┘
4 columns           2 columns           1 column
```

### Mobile Considerations

- Touch targets: minimum 44x44px
- Font sizes: minimum 16px for body
- Spacing: increased for touch
- Navigation: hamburger menu below 768px

## Accessibility

### Color Contrast

All text must meet WCAG 2.1 AA standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### Screen Reader Support

- Semantic HTML elements
- ARIA labels where needed
- Skip navigation link
- Descriptive alt text

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Icons

Using Lucide React icon library for consistency:

| Icon | Usage |
|------|-------|
| `<Github />` | GitHub links |
| `<ExternalLink />` | External navigation |
| `<Star />` | Repository stars |
| `<Moon />` / `<Sun />` | Theme toggle |
| `<Menu />` / `<X />` | Mobile menu |
| `<Mail />` | Contact |
| `<ArrowRight />` | CTAs |

## Dark Mode Implementation

### Toggle Behavior
1. Check system preference on initial load
2. Apply saved preference if exists
3. Toggle updates localStorage
4. CSS variables switch instantly
5. Theme controls expose their pressed state and retain tested accessible labels
6. Motion follows the operating-system reduced-motion preference through `MotionConfig`

### Theme Toggle
```
Light: ☀️ (Sun icon)
Dark:  🌙 (Moon icon)
```

## Assets

### Image Optimization
- WebP format preferred
- Fallback to PNG/JPG
- Lazy loading for below-fold
- Responsive srcset

### Favicon
- ICO for legacy browsers
- PNG for modern browsers
- Apple touch icon
- Web manifest icons

## Related Documents

- [PRD](./PRD.md) - Product Requirements
- [Architecture](./ARCHITECTURE.md) - Technical Architecture
- [ADR](./ADR/) - Design Decisions
