# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

YM AI Solutions - A bilingual (Hebrew/English) single-page marketing website. The entire site is contained in one HTML file (`index.html`) with embedded CSS and JavaScript.

## Development

**Start dev server:** Use VS Code Live Server extension - right-click `index.html` → "Open with Live Server" (runs on `http://localhost:5500`)

**Debug:** Pre-configured launch configs in `.vscode/launch.json` for Chrome and Edge

## Architecture

### Single-File Structure
- All HTML, CSS, and JavaScript in `index.html`
- CSS variables defined in `:root` for theming
- No build process or dependencies

### Bilingual System
- Default language: Hebrew (RTL)
- Language toggle switches between Hebrew/English
- Translations use `data-he` and `data-en` attributes on elements
- `toggleLanguage()` function handles switching and updates `dir`, `lang`, and body class
- Hebrew uses 'Heebo' font, English uses 'Space Grotesk' font

### RTL/LTR Handling
- `body.en` class triggers LTR layout
- Timeline and directional elements have separate RTL/LTR CSS rules (e.g., `body.en .journey-timeline`)

### CSS Architecture
- Dark theme with gradient accents (`--accent-primary: #00d4aa`, `--accent-secondary: #0099ff`)
- Ambient floating orbs create background effects
- Grid pattern overlay for visual texture
- Mobile responsive with breakpoint at 768px
