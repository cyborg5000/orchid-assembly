# Orchid Assembly Branding Guideline

## Purpose

This guideline is the source of truth for future AI-assisted edits to the Orchid Assembly website. It is written for a non-destructive workflow: preserve the current branding, preserve the current section sequencing, and layer improvements through enhancement files instead of rewriting the mirrored Canva export unless a redesign is explicitly requested.

## Brand Essence

- Positioning: premium experiential agency
- Personality: cinematic, immersive, high-tech, confident, polished
- Emotional tone: anticipation, spectacle, credibility, modern precision
- Visual metaphor: stage lighting meets future-facing brand systems

## Core Brand Signals

- Always keep the magenta + cyan + black atmosphere
- Preserve the nocturnal, event-lighting mood
- Favor glow, haze, soft glass, and light-beam effects over flat cards
- Keep typography feeling crisp, premium, and presentation-like
- Preserve the bold contrast between large headlines and restrained supporting copy

## Approved Color System

### Primary colors

- `#040507` `oa-ink`: base black
- `#09030b` `oa-ink-deep`: deep plum-black
- `#f6f7fb` `oa-white`: primary text white
- `#ff1387` `oa-magenta`: hero accent
- `#24dbff` `oa-cyan`: beam/light accent

### Supporting colors

- `rgba(255, 19, 135, 0.22)` `oa-magenta-soft`
- `rgba(36, 219, 255, 0.20)` `oa-cyan-soft`
- `rgba(7, 9, 14, 0.72)` `oa-panel`
- `rgba(255, 255, 255, 0.10)` `oa-line`

### Gradient recipes

- Hero ambient glow:
  - magenta radial glow from top-left
  - cyan radial glow from lower-mid or lower-left
  - black-to-deep-plum base gradient under both
- Interactive surfaces:
  - translucent dark panel with a magenta-to-cyan highlight wash
- Divider lines:
  - thin white line with optional magenta/cyan flare at interaction points

## Typography Guidance

- Keep the existing exported Canva typography unless a full type refresh is requested
- Headlines should remain bold, clean, modern, and legible at large scale
- Supporting copy should feel understated and editorial, not playful
- Avoid introducing casual, rounded, or generic startup fonts
- Maintain strong contrast and generous whitespace around key headlines

## UI Direction

### Navigation

- Use a dark translucent navigation bar
- Use subtle glass or blur effects, not opaque boxes
- Menu items can feel like soft pills on hover/focus, but should remain minimal
- Active and hover states should use magenta/cyan lighting, never unrelated colors

### Panels and surfaces

- Use layered transparency instead of solid gray cards
- Prefer soft borders and inner highlights
- Depth should come from shadow, blur, glow, and contrast, not heavy skeuomorphism

### Imagery

- Preferred imagery: stage setups, projection, event lighting, immersive installations, brand environments
- Placeholder shapes should echo petals, beams, grids, lines, and translucent overlays
- Avoid stock-photo clichés that break the premium experiential tone

### Motion

- Motion should feel fluid, premium, and controlled
- Default durations:
  - micro-interactions: `180ms` to `260ms`
  - reveal moments: `400ms` to `700ms`
- Prefer `transform` and `opacity`
- Respect `prefers-reduced-motion`
- Avoid noisy or overly fast looping animations

## Layout Rules

- Design for full-bleed sections with strong focal points
- Desktop should feel expansive and presentation-like
- Mobile should preserve drama without forcing horizontal overflow
- Homepage sections should behave like a deck: one section per viewport step
- The homepage should snap section-to-section on scroll, with each section filling the visible content area
- The brand lockup should live once in a sticky header instead of repeating inside every section
- Keep clear separation between spectacle sections and credibility sections
- Use negative space strategically so bright elements feel intentional

## Accessibility Rules

- Maintain readable white text against dark or tinted backgrounds
- Keep keyboard focus visible on menu items and buttons
- Touch targets must remain at least `44px x 44px`
- Do not rely on color alone for active or hover states
- Keep motion optional for reduced-motion users

## AI Implementation Rules

- Preserve the current magenta/cyan/black brand palette
- Preserve the current visual mood before introducing new effects
- Prefer enhancement layers in:
  - [public/ui-enhancements.css](/Users/samuelchan/Documents/Github/Client/orchid-assembly/public/ui-enhancements.css)
  - [public/ui-enhancements.js](/Users/samuelchan/Documents/Github/Client/orchid-assembly/public/ui-enhancements.js)
  - [public/mobile-overrides.css](/Users/samuelchan/Documents/Github/Client/orchid-assembly/public/mobile-overrides.css)
- Avoid editing the mirrored Canva structure unless necessary
- Do not replace brand colors with gold, purple, pastel, or generic SaaS palettes
- Do not flatten the page into plain white backgrounds
- Do not remove the cinematic atmosphere from the hero sections
- Keep hover, focus, and interaction polish consistent across desktop and mobile

## Preferred Enhancement Strategy

1. Add non-destructive CSS overlays first
2. Add DOM annotation or progressive enhancement JavaScript only when selectors are too obfuscated
3. Keep brand tokens centralized as CSS custom properties
4. Check desktop and mobile before making broader structural changes
5. If a future redesign is requested, keep this document as the palette and mood reference

## Current File Roles

- [index.html](/Users/samuelchan/Documents/Github/Client/orchid-assembly/index.html): mirrored Canva export entry point
- [public/mobile-overrides.css](/Users/samuelchan/Documents/Github/Client/orchid-assembly/public/mobile-overrides.css): mobile-fit corrections
- [public/ui-enhancements.css](/Users/samuelchan/Documents/Github/Client/orchid-assembly/public/ui-enhancements.css): visual polish and interaction styling
- [public/ui-enhancements.js](/Users/samuelchan/Documents/Github/Client/orchid-assembly/public/ui-enhancements.js): semantic class hooks for the mirrored DOM

## Quick Prompt For Future AI

Use Orchid Assembly’s existing magenta/cyan/black cinematic branding. Preserve the mirrored Canva layout and section order. Improve the UI through non-destructive enhancement layers, keep the atmosphere premium and immersive, and make sure any new interaction polish works on both desktop and mobile.
