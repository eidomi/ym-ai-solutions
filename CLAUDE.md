# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

YM AI Solutions - A bilingual (Hebrew/English) single-page marketing website with external CSS and SVG icon system.

## Development

### Principles

- TDD: red-green-refactor cycle
- Evidence > Assumptions | Measurements > Estimates
- New evidence contradicts → ADJUST immediately
- Robust solution > quick patch (except production fires)

**Start dev server:** Use VS Code Live Server extension - right-click `index.html` → "Open with Live Server" (runs on `http://localhost:5500`)

**Debug:** Pre-configured launch configs in `.vscode/launch.json` for Chrome and Edge

## File Structure

```
ym-ai-solutions/
├── index.html          # HTML structure + JavaScript
├── styles.css          # All CSS styles
├── icons.svg           # SVG sprite library
├── ym-ai-logo-icon.svg # Favicon/logo icon
└── ym-ai-logo-v5.svg   # Full logo
```

## Architecture

### Separation of Concerns

- `index.html` - HTML structure and JavaScript (~1,150 lines)
- `styles.css` - All CSS including responsive breakpoints (~1,370 lines)
- `icons.svg` - Reusable SVG icon sprites
- No build process or dependencies

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
- Hebrew uses 'Heebo' font, English uses 'Inter' font

### RTL/LTR Handling

- `body.en` class triggers LTR layout
- Arrow icons swap direction: `icon-arrow-left` (Hebrew) ↔ `icon-arrow-right` (English)
- Timeline and directional elements have separate RTL/LTR CSS rules (e.g., `body.en .journey-timeline`)

### CSS Architecture

- Warm Glass theme with gradient accents (`--accent-primary: #C4856A`, `--accent-secondary: #D4A088`)
- CSS variables defined in `:root` for theming
- Glass morphism effects with `backdrop-filter: blur()`
- Ambient floating orbs create background effects
- Grid pattern overlay for visual texture
- Mobile-first responsive design with breakpoints at 375px, 480px, 600px, 768px, 1024px
