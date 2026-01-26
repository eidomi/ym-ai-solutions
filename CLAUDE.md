# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mindellect AI Solutions - A bilingual (Hebrew/English) single-page marketing website built with Tailwind CSS and SVG icon system.

## Development

### Principles

- TDD: red-green-refactor cycle
- Evidence > Assumptions | Measurements > Estimates
- New evidence contradicts → ADJUST immediately
- Robust solution > quick patch (except production fires)

### Commands

```bash
npm run dev    # Watch mode - auto-recompiles CSS on changes
npm run build  # Production build with minification
```

**Start dev server:** Use VS Code Live Server extension - right-click `index.html` → "Open with Live Server" (runs on `http://localhost:5500`)

**Debug:** Pre-configured launch configs in `.vscode/launch.json` for Chrome and Edge

## File Structure

```
ym-ai-solutions/
├── index.html              # HTML structure + JavaScript
├── main.js                 # JavaScript (unchanged)
├── icons.svg               # SVG sprite library
├── ym-ai-logo-icon.svg     # Favicon/logo icon
├── ym-ai-logo-v5.svg       # Full logo
├── src/
│   ├── input.css           # Tailwind directives + custom components
│   └── animations.css      # Complex keyframe animations
├── dist/
│   └── styles.css          # Compiled Tailwind output (linked in HTML)
├── styles.legacy.css       # Backup of original CSS (pre-Tailwind)
├── tailwind.config.js      # Custom theme configuration
├── postcss.config.js       # PostCSS config
└── package.json            # Dependencies + scripts
```

## Architecture

### Tailwind CSS Setup

- Custom breakpoints: `xs: 375px`, `sm: 480px`, `md: 600px`, `lg: 768px`, `xl: 1024px`
- Custom colors, fonts, and animations defined in `tailwind.config.js`
- Component classes (`.btn-primary`, `.glass-card`, etc.) in `src/input.css`
- Complex animations (25-30s durations) in `src/animations.css`

### SVG Icon System

Icons are defined as `<symbol>` elements in `icons.svg` and referenced via:

```html
<svg><use href="icons.svg#icon-name"></use></svg>
```

Available icons:

- `icon-rocket` - Hero badge
- `icon-chart`, `icon-message`, `icon-trending`, `icon-sync` - Service cards
- `icon-arrow-left`, `icon-arrow-right` - CTA buttons (swapped by language)
- `icon-whatsapp`, `icon-email`, `icon-phone` - Contact section

### Bilingual System

- Default language: Hebrew (RTL)
- Language toggle switches between Hebrew/English
- Translations use `data-he` and `data-en` attributes on elements
- `toggleLanguage()` function handles switching and updates `dir`, `lang`, body class, and arrow icons
- Hebrew uses 'Heebo' font, English uses 'Satoshi' font

### RTL/LTR Handling

- `body.en` class triggers LTR layout via `src/input.css`
- Tailwind logical properties: `ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`
- Arrow icons swap direction: `icon-arrow-left` (Hebrew) ↔ `icon-arrow-right` (English)
- Timeline and directional elements have RTL/LTR rules in component layer

### CSS Architecture (Tailwind)

- **Theme Colors**: Warm Glass palette with `accent-primary: #C4856A`, `accent-cta: #2A6B6B`
- **Glass Effects**: `.glass`, `.glass-card`, `.glass-nav` components with backdrop-blur
- **Custom Components**: Buttons, cards, badges defined in `@layer components`
- **Animations**: Float, fade-in, pulse, shimmer effects
- **Breakpoints**: Mobile-first at xs(375), sm(480), md(600), lg(768), xl(1024)

### Key Component Classes

```css
.btn-primary     /* Teal CTA button with shadow */
.btn-secondary   /* Glass secondary button */
.glass-card      /* Glass morphism card with glow */
.glass-nav       /* Navigation glass effect */
.service-card    /* Service grid cards with hover effects */
.faq-item        /* FAQ accordion items */
.stat-number     /* Gradient text stat numbers */
```

### JavaScript State Classes

These semantic classes are used by JavaScript and should be preserved:

- `.open` - FAQ accordion open state
- `.active` - Hamburger menu active state
- `.visible` - Drawer backdrop visibility
- `.drawer-open` - Body scroll lock when drawer open
