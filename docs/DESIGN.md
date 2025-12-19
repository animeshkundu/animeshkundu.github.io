# Design Documentation

## Design Philosophy

This portfolio follows a **minimal, modern, and functional** design philosophy. The focus is on content—letting the projects speak for themselves while providing a polished, professional presentation.

### Core Principles

1. **Clarity Over Decoration** - Every element serves a purpose
2. **Content First** - Design supports the content, not the other way around
3. **Progressive Disclosure** - Show essential info first, details on demand
4. **Consistent Experience** - Same feel across all devices and themes

## Design System

### Color Palette

#### Light Theme
```css
--background:       #ffffff    /* Pure white */
--foreground:       #0f172a    /* Slate 900 */
--muted:            #f1f5f9    /* Slate 100 */
--muted-foreground: #64748b    /* Slate 500 */
--accent:           #3b82f6    /* Blue 500 */
--accent-hover:     #2563eb    /* Blue 600 */
```

#### Dark Theme
```css
--background:       #0f172a    /* Slate 900 */
--foreground:       #f8fafc    /* Slate 50 */
--muted:            #1e293b    /* Slate 800 */
--muted-foreground: #94a3b8    /* Slate 400 */
--accent:           #60a5fa    /* Blue 400 */
--accent-hover:     #3b82f6    /* Blue 500 */
```

### Typography

#### Font Stack
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, 'Helvetica Neue', 
             Arial, sans-serif;
```

#### Type Scale
| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 3rem (48px) | 700 | 1.2 | Hero title |
| H2 | 2.25rem (36px) | 600 | 1.3 | Section headers |
| H3 | 1.5rem (24px) | 600 | 1.4 | Card titles |
| Body | 1rem (16px) | 400 | 1.6 | Paragraphs |
| Small | 0.875rem (14px) | 400 | 1.5 | Captions, meta |

### Spacing

Using Tailwind's default spacing scale based on 4px grid:

| Token | Size | Usage |
|-------|------|-------|
| 1 | 4px | Tight spacing |
| 2 | 8px | Related elements |
| 4 | 16px | Standard gap |
| 6 | 24px | Section padding |
| 8 | 32px | Component spacing |
| 12 | 48px | Section margins |
| 16 | 64px | Large sections |

### Border Radius

```css
--radius-sm:  0.25rem  /* 4px - buttons, inputs */
--radius-md:  0.5rem   /* 8px - cards */
--radius-lg:  1rem     /* 16px - containers */
--radius-full: 9999px  /* circular */
```

### Shadows

```css
--shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

## Component Design

### Buttons

#### Primary Button
```
┌─────────────────────────┐
│   View Projects  →      │  Blue background, white text
└─────────────────────────┘
- Rounded corners (8px)
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
- Background: muted color
- Border radius: 12px
- Padding: 24px
- Shadow: subtle on hover
- Transition: 200ms ease

### Navigation

```
┌─────────────────────────────────────────────────────────────┐
│  🏠 Animesh Kundu    Projects  About  FAQ  Contact   [🌙]  │
└─────────────────────────────────────────────────────────────┘
```

**Navbar Specifications:**
- Fixed position (sticky)
- Backdrop blur effect
- Height: 64px
- Links: smooth scroll
- Mobile: hamburger menu

### Hero Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                     Hi, I'm Animesh 👋                      │
│                                                             │
│              Developer & Open Source Creator                │
│                                                             │
│    I build tools that make developers' lives easier.        │
│    Check out my projects below or say hello!                │
│                                                             │
│       ┌─────────────┐    ┌─────────────┐                   │
│       │ View Work   │    │  Contact    │                   │
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
  * {
    animation-duration: 0.01ms !important;
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
