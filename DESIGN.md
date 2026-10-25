---
name: White Hills Knives — Obsidian Atelier
description: Luxury hand-forged Damascus steel atelier design system with multi-theme support
colors:
  primary: "oklch(0.74 0.145 56)"
  primary-foreground: "oklch(0.14 0.01 60)"
  background: "oklch(0.135 0.01 260)"
  foreground: "oklch(0.94 0.012 85)"
  card: "oklch(0.175 0.012 260)"
  card-foreground: "oklch(0.94 0.012 85)"
  muted: "oklch(0.20 0.01 260)"
  muted-foreground: "oklch(0.68 0.018 80)"
  border: "oklch(0.94 0.012 85 / 12%)"
  ember: "oklch(0.78 0.16 62)"
  theme-obsidian-accent: "#e67e22"
  theme-obsidian-bg: "#17181f"
  theme-silver-accent: "#cbd5e1"
  theme-silver-bg: "#161b22"
  theme-nordic-accent: "#93532b"
  theme-nordic-bg: "#faf7f2"
  theme-imperial-accent: "#d4af37"
  theme-imperial-bg: "#200b11"
  swatch-stag: "#d5c3aa"
  swatch-bone: "#f2ebd9"
  swatch-burl: "#6b3e26"
  swatch-ram: "#2d241e"
  swatch-olive: "#a88854"
typography:
  display:
    fontFamily: "Cinzel, Georgia, serif"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "0.08em"
  body:
    fontFamily: "Jost, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.02em"
rounded:
  sm: "0.25rem"
  md: "0.5rem"
  lg: "0.75rem"
  full: "9999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "2rem"
  xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.sm}"
    padding: "16px 32px"
  card-product:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "20px"
---

# White Hills Knives — Design System

## Overview
The White Hills Knives visual identity is inspired by the ritual and metallurgy of ancient Damascus bladesmithing: fiery forge embers, water-etched high-carbon steel, obsidian stone, and hand-finished natural antler and hardwoods. The interface communicates uncompromising craftsmanship, tactile authenticity, and bespoke luxury.

## Colors
The system features four cohesive multi-theme palettes tailored to luxury knife collecting:

1. **Obsidian Forge (Signature Atelier — Default)**:
   - Deep midnight obsidian background (`oklch(0.135 0.01 260)` / `#17181f`)
   - Warm hammered ivory typography (`oklch(0.94 0.012 85)`)
   - Forged ember-copper accents (`oklch(0.74 0.145 56)` / `#e67e22`)
   - Soft heat-shimmer shadows and glowing border lines

2. **Silver Damascus (Steel Precision — Monochrome)**:
   - High-grade graphite slate background (`oklch(0.15 0.008 240)` / `#161b22`)
   - Razor-bright platinum foreground (`oklch(0.96 0.005 240)`)
   - Cold liquid chrome and stainless steel accents (`oklch(0.88 0.03 235)` / `#cbd5e1`)

3. **Nordic Frost (Alabaster Ivory — Light Luxury)**:
   - Warm bone ivory & sunlit atelier background (`oklch(0.975 0.008 75)` / `#faf7f2`)
   - Hand-stamped forge ink typography (`oklch(0.18 0.015 50)`)
   - Burnished saddle leather and antique bronze accents (`oklch(0.48 0.125 45)` / `#93532b`)

4. **Imperial Damascus (Royal Temper — Oxblood & Gold)**:
   - Rich royal garnet / velvet oxblood background (`oklch(0.14 0.032 15)` / `#200b11`)
   - 24k ceremonial gold leaf accents (`oklch(0.80 0.155 82)` / `#d4af37`)
   - Museum heirloom prestige

### Handle Swatches
- Stag Antler: `#d5c3aa`
- Camel Bone: `#f2ebd9`
- Stabilized Burl: `#6b3e26`
- Ram Horn: `#2d241e`
- Olive Wood: `#a88854`

## Typography
- **Display**: `Cinzel`, Georgia, serif — Used for titles, hero statements, category headers, and prices. Conveys historical gravity, roman inscription precision, and artisanal authority.
- **Body & Eyebrow**: `Jost`, sans-serif — Geometric yet warm, highly legible at small sizes, wide letter-spacing (`tracking-[0.2em]`) for uppercase tags and metadata.

## Layout
- **Max Content Width**: `max-w-7xl` (1280px) for tight focus and balance.
- **Rhythm**: Generous vertical whitespace (`py-24` to `py-32`) to let high-resolution photography breathe.
- **Card Grids**: 1-column mobile, 2-column tablet, 4-column desktop with 24px gutters.

## Elevation & Depth
- **Ember Glow**: Subtle radial and box-shadow glows (`0 10px 40px -12px oklch(0.74 0.145 56 / 45%)`) simulating forge radiation.
- **Hairline Dividers**: Micro-borders with gradient falloffs (`hairline` utility) mimicking blade bevels.
- **Backdrop Blur**: `backdrop-blur-xl` on sticky navigation and modals for floating translucent depth.

## Shapes
- **Crisp Geometry**: Minimal radii (`rounded-sm` or `rounded-md`) reflecting precision-ground blade angles, contrasting with `rounded-full` pills for badges and status indicators.

## Components
- **Site Header**: Sticky frosted navigation with brand atelier mark, category navigation, search trigger, cart badge, and live theme switch.
- **Theme Switcher**: Instant four-way selector with visual swatches and iconography, persisted in `localStorage`.
- **Product Card**: Micro-interactive card featuring blade tag, quick-add, Damascus layer count, star rating, handle material badges, and quick-view action.
- **Interactive Blade Inspector Modal**: Detailed breakdown of steel composition, Rockwell hardness, blade dimensions, and sharpening care.
- **Category Showcase**: Hall cards with subtle zoom, dark gradient overlays, and collection inventory counts.
- **Atelier Manifesto**: Chronological 3-stage forge story with numbered emblem badges.

## Do's and Don'ts
- **DO**: Use genuine Damascus terminology (billet, fold, etch, acid-wash, gut hook, full tang, 1095/15N20, VG-10).
- **DO**: Maintain high contrast and generous whitespace around blade images.
- **DO**: Keep theme transitions smooth without sudden layout shifts.
- **DON'T**: Use bright neon colors or generic saturated primary blues/reds.
- **DON'T**: Crowd multiple badges on product cards; keep hierarchy disciplined.
- **DON'T**: Hide pricing or core specifications behind unnecessary clicks.
