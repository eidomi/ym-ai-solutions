---
name: warm-glass-designer
description: Apply the Warm Minimalist Glass design system (iOS 26 Liquid Glass + warm serif aesthetic) to React/CSS components
user-invocable: true
---

# Warm Minimalist Glass Design System

A design system combining iOS 26 Liquid Glass depth effects with warm serif typography for sophisticated, modern interfaces.

## When to Use This Skill

Invoke this skill when:
- Creating new UI components that need a premium, modern look
- Redesigning existing components to match the warm glass aesthetic
- Building landing pages, dashboards, or form interfaces
- The user asks for "glass", "glassmorphism", "warm minimalist", or "premium" styling
- Applying consistent design tokens across a React/CSS codebase

## Color Palette

### Primary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Warm Ivory | `#FAF7F2` | rgb(250, 247, 242) | Primary background |
| Soft Cream | `#F5F0E8` | rgb(245, 240, 232) | Secondary background, cards |
| Warm Gray | `#E8E2D9` | rgb(232, 226, 217) | Borders, dividers |
| Muted Stone | `#9B9386` | rgb(155, 147, 134) | Secondary text, icons |
| Deep Charcoal | `#2C2825` | rgb(44, 40, 37) | Primary text |
| Rich Espresso | `#4A4238` | rgb(74, 66, 56) | Headings, emphasis |

### Accent Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Warm Terracotta | `#C4856A` | rgb(196, 133, 106) | Primary action, links |
| Soft Sage | `#8FA88B` | rgb(143, 168, 139) | Success states |
| Dusty Rose | `#C9A9A6` | rgb(201, 169, 166) | Highlights, badges |
| Muted Gold | `#BBA87E` | rgb(187, 168, 126) | Premium accents |

### Glass Colors (with alpha)
| Name | Value | Usage |
|------|-------|-------|
| Glass White | `rgba(255, 255, 255, 0.65)` | Glass card backgrounds |
| Glass White Light | `rgba(255, 255, 255, 0.45)` | Subtle glass overlays |
| Glass Border | `rgba(255, 255, 255, 0.3)` | Glass card borders |
| Glass Shadow | `rgba(44, 40, 37, 0.08)` | Soft shadows |

## Typography

### Font Families
```css
--font-serif: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
--font-sans: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', monospace;
```

### Type Scale
| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Display | 3rem (48px) | 300 | 1.1 | Hero headings |
| H1 | 2.25rem (36px) | 400 | 1.2 | Page titles |
| H2 | 1.75rem (28px) | 400 | 1.25 | Section headings |
| H3 | 1.25rem (20px) | 500 | 1.3 | Card titles |
| Body | 1rem (16px) | 400 | 1.6 | Paragraphs |
| Small | 0.875rem (14px) | 400 | 1.5 | Captions, labels |
| Tiny | 0.75rem (12px) | 500 | 1.4 | Badges, metadata |

### Typography Rules
- **Headings**: Use serif font (`--font-serif`) with light to regular weight
- **Body text**: Use sans-serif (`--font-sans`) for readability
- **Letter spacing**: Headings get `0.02em`, body text normal
- **Text rendering**: Use `text-rendering: optimizeLegibility` and `-webkit-font-smoothing: antialiased`

## Glass Material

### Base Glass Effect
```css
.glass {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow:
    0 4px 24px rgba(44, 40, 37, 0.08),
    0 1px 2px rgba(44, 40, 37, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
```

### Glass Variants
| Variant | Background Alpha | Blur | Use Case |
|---------|-----------------|------|----------|
| Solid | 0.75 | 24px | Primary cards |
| Medium | 0.65 | 20px | Default glass |
| Light | 0.45 | 16px | Overlays, modals |
| Subtle | 0.25 | 12px | Background layers |

### Layering Depth
```
Layer 0: Page background (Warm Ivory solid)
Layer 1: Subtle glass (25% opacity, 12px blur)
Layer 2: Light glass (45% opacity, 16px blur)
Layer 3: Medium glass (65% opacity, 20px blur) - DEFAULT
Layer 4: Solid glass (75% opacity, 24px blur) - Top layer cards
```

## Component Patterns

### Buttons

**Primary Button**
```css
.btn-primary {
  background: var(--color-terracotta);
  color: white;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 8px rgba(196, 133, 106, 0.3);
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background: #B5765B;
  box-shadow: 0 4px 12px rgba(196, 133, 106, 0.4);
  transform: translateY(-1px);
}
```

**Glass Button**
```css
.btn-glass {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: var(--color-charcoal);
  font-family: var(--font-sans);
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}
.btn-glass:hover {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(255, 255, 255, 0.5);
}
```

### Cards

**Glass Card**
```css
.card-glass {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow:
    0 4px 24px rgba(44, 40, 37, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
```

### Form Inputs

```css
.input-glass {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-warm-gray);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--color-charcoal);
  transition: all 0.2s ease;
}
.input-glass:focus {
  outline: none;
  border-color: var(--color-terracotta);
  box-shadow: 0 0 0 3px rgba(196, 133, 106, 0.15);
}
.input-glass::placeholder {
  color: var(--color-stone);
}
```

### Borders & Dividers

```css
/* Subtle divider */
.divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-warm-gray) 20%,
    var(--color-warm-gray) 80%,
    transparent
  );
}

/* Glass border highlight */
.glass-border {
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
```

## Layout Rules

### Spacing Scale
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.5rem;    /* 24px */
--space-6: 2rem;      /* 32px */
--space-7: 3rem;      /* 48px */
--space-8: 4rem;      /* 64px */
--space-9: 6rem;      /* 96px */
```

### Container Widths
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

### Whitespace Guidelines
- Cards: `padding: 1.5rem` (24px)
- Card sections: `gap: 1rem` (16px)
- Between cards: `gap: 1.5rem` (24px)
- Page sections: `margin-bottom: 4rem` (64px)
- Content max-width: 65ch for readability

## Animation & Transitions

### Standard Transitions
```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
--transition-spring: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Hover Effects
- Buttons: `transform: translateY(-1px)` + enhanced shadow
- Cards: `transform: translateY(-2px)` + subtle shadow increase
- Links: color transition + optional underline animation

## Implementation Checklist

When applying this design system to a component:

1. **Import design tokens** - Add CSS variables to your stylesheet root
2. **Set base background** - Apply `--color-ivory` to body/container
3. **Apply glass effects** - Use `.glass` class or equivalent CSS
4. **Typography first** - Set font families and type scale
5. **Color hierarchy** - Primary text in charcoal, secondary in stone
6. **Add spacing** - Use spacing scale for consistent rhythm
7. **Transitions** - Add smooth transitions to interactive elements
8. **Test backdrop-filter** - Verify blur works in target browsers

## Browser Support

- `backdrop-filter` requires modern browsers
- Include `-webkit-backdrop-filter` for Safari
- Fallback: solid semi-transparent background for older browsers

```css
/* Fallback for browsers without backdrop-filter */
@supports not (backdrop-filter: blur(20px)) {
  .glass {
    background: rgba(250, 247, 242, 0.95);
  }
}
```

## Reference Files

- **Design Tokens**: `references/design-tokens.css` - Copy-paste CSS variables
- **Component Examples**: `examples/components.jsx` - React implementations
