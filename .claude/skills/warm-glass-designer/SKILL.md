## markdown

name: warm-glass-designer
description: Combines iOS 26 Liquid Glass depth with a warm, minimalist serif aesthetic.

---

# Design System: Warm Minimalist Glass (2026)

## 1. Color Palette & Materials

- **Base Surface:** Warm Cream (`#F7F5F2`). Use as the main background or the "under-glass" tint.
- **Glass Material:** Instead of cold white, use `rgba(247, 245, 242, 0.4)` with a `backdrop-filter: blur(24px)`.
- **Primary Action:** Soft Blue (`#5B8BD4`). Use for main CTAs and active states.
- **Accent/Alert:** Warm Orange (`#E8913A`). Use for highlights or notification dots.
- **Typography:** Charcoal Gray (`#2D2D2D`) for high contrast; Medium Gray (`#6B6B6B`) for secondary metadata.

## 2. Typography Strategy

- **Headlines:** Crimson Pro (Serif). Use for h1-h3. Set `letter-spacing: -0.02em` for an editorial feel.
- **Body:** Inter (Sans-Serif). Use for all functional UI, buttons, and descriptions.
- **Scaling:** Follow iOS 26 Dynamic Type (Body @ 17px, Headlines @ 24px-32px).

## 3. UI Components (iOS 26 Style)

- **Buttons:** Rounded (pill-shaped). Use Soft Blue `#5B8BD4` with a subtle inner-glow to simulate the "Liquid" depth.
- **Illustrations:** Use minimalist line-art (sketch style). Treat illustrations as "spatial layers" that sit slightly behind the text.
- **Borders:** 0.5px Charcoal Gray at 10% opacity to define glass edges without breaking the minimalist feel.

## 4. Layout Rules

- **Whitespace:** Minimum 24px horizontal padding on mobile; 48px+ on desktop.
- **Grid:** Use a fluid column grid that allows line-art to bleed into margins, creating the "Organic" feel.
