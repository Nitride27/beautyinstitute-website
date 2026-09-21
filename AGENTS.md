# AGENTS.md

Instructions for AI coding agents (Claude Code, Copilot, etc.) working in this repository.

## Project
Éclat Beauty Institute marketing/enrollment site — Next.js 15 (App Router) + TypeScript + Tailwind v4 + GSAP/ScrollTrigger (rich scroll motion) + Framer Motion (UI micro-interactions). See `ARCHITECTURE.md` for structure and `IMPLEMENTATION_PLAN.md` for phased build order. Read both before making structural changes.

## Setup
```bash
npm install
npm run dev        # http://localhost:3000
```

## Commands
```bash
npm run dev         # local dev server
npm run build        # production build — MUST pass before any PR
npm run lint          # eslint
npm run typecheck   # tsc --noEmit
```
Run `lint` and `typecheck` before considering a task done. Do not `git commit` with either failing.

## Design System Rules (non-negotiable)
All values come from `DESIGN.md` tokens, already ported into `app/globals.css`. Do not hardcode colors, spacing, or radii — use the CSS variables / Tailwind theme classes.

- Canvas is `--color-cream-linen` (`#fff5e6`), never pure white as page background.
- **Radius is meaningful, not decorative:** cards/product-course-journal images are always `--radius-cards` (0px, sharp). Buttons, nav pills, and circles are always `--radius-buttons`/`--radius-circles` (999px, full pill). Never mix these up — a sharp-cornered button or a rounded product card is off-brand.
- Coral (`--color-coral-pop`) is rationed: **one filled-coral surface per viewport maximum** (per `DESIGN.md`'s explicit component note on the Coral Pill Button). Everything else that wants coral emphasis uses `--color-terracotta-whisper` outline instead, or plain black.
- No `box-shadow`, no gradients, anywhere. Structure comes from 1px black (or Stone/Mist for quieter dividers) borders, never elevation.
- Headlines use the serif (`--font-gascognets`); everything else — nav, body, buttons, labels — uses the sans (`--font-basis-grotesque-pro`). Never put body copy in the serif or a headline in the sans.
- Eyebrow/label micro-text (e.g. "NEW"-style tags) uses the mono font at wide tracking (`--font-basisgrotesquepro-mono`, ~0.056em) — this is a specific, load-bearing pattern, not a general-purpose label style.
- Section vertical rhythm: `--section-gap` (64px). Page content max-width: `--page-max-width` (1200px).

## Animation Rules
- **Revised brief:** this project now uses a rich, editorial scroll-motion system — see `ARCHITECTURE.md` §6 for the full component-by-component spec (hero layered drift + blur, category mosaic drift, orbit rotation on circular imagery, diagonal-tile testimonial transitions, perspective-in card entrances, staggered radial reveals on stats). GSAP + ScrollTrigger owns every scroll-scrubbed effect; Framer Motion stays limited to hovers, menu open/close, route transitions, and the plain `whileInView` fallback fade used on sections §6 doesn't otherwise cover.
- Register `ScrollTrigger` once in `lib/gsap.ts` — don't instantiate a second GSAP context per component.
- Cap all rotation/tilt at ≤10deg. Richer than before, but still editorial — nothing should read as playful or bouncy. This is a beauty-institute brand, not a nightlife/crypto brand; keep the palette, serif type, and hairline-border language untouched even as the motion gets bolder.
- Every scroll-triggered animation needs a `prefers-reduced-motion` fallback (see `lib/motion-prefs.ts`) that fully disables drift/blur/rotation/tilt/pinning — fade-only, never a reduced version of the effect.
- Disable pinning, orbit rotation, and diagonal-tile transitions below 768px; keep the remaining treatments but reduce them to single-axis, cheaper transforms.

## Images
- Placeholder stock photography lives entirely in `content/images.ts`. Never hardcode an image URL inside a component — import from that map so the eventual real-asset swap touches one file.
- Course and article data (including thumbnails) live in `content/courses.ts` / `content/articles.ts`, not inline in page components.
- All images render through `next/image` with real `alt` text; radius follows the Design System Rules above (0px unless it's a circle/avatar).

## Content
- Copy lives in `content/copy.ts`, not inline in JSX, so non-engineers can edit it later.

## PR / Change Checklist
1. `npm run typecheck && npm run lint && npm run build` all pass.
2. Changed components respect the Design System Rules above — spot-check radius (cards=0/buttons=999), coral rationing (one filled surface per viewport), and font role assignment (serif=headline only).
3. If a change touches scroll/hover motion, manually verify with `prefers-reduced-motion: reduce` in devtools.
4. If a change touches layout, check 375 / 768 / 1440 breakpoints.
5. No new dependency added for something GSAP, Framer Motion, Tailwind, or Lucide already covers.

## Taste-Skill Audit Note
`design-taste-frontend`/`gpt-taste` (installed via `npx skills add Leonxlnx/taste-skill`) are generic anti-slop heuristics for when an agent is choosing an aesthetic itself — they are not a license to override this project's binding `DESIGN.md`. Where they conflict with `DESIGN.md`/the approved mockups, `DESIGN.md` wins:
- They ban Inter and discourage Lucide — this project keeps both (Inter is `DESIGN.md`'s named fallback, Lucide matches the thin-outline icon spec) because those are the client's actual brand, not an LLM default.
- They ban numbered meta-labels ("SECTION 01") — this project keeps the "01/06" numbering on `CourseRow`/`NumberedList` because it's in the approved mockups, not a lazy placeholder.
- Their motion-intensity dial (`MOTION_INTENSITY`) roughly corresponds to what `ARCHITECTURE.md` §6 already specifies in detail; treat §6 as authoritative over the dial defaults.
Where they don't conflict — hover physics on cards, `min-h-[100dvh]` over `h-screen` for the hero, CSS Grid over flex-percentage math, one-icon-family discipline, RSC/client-component isolation for anything using GSAP or scroll listeners — apply them; they're just good engineering.
`impeccable install` failed in this environment (`HTTP 403` on its signed-bundle release check — see github.com/pbakaus/impeccable/issues/479); it was not evaluated. Retry it locally before relying on it as a second gate.

## Out of Scope for Agents (ask first)

- Swapping the animation library (GSAP → something else), or pushing rotation/tilt angles past the ≤10deg cap
- Changing the color palette, type scale, or the card-vs-button radius convention
- Adding a CMS or backend without discussion — forms are stubbed intentionally per `IMPLEMENTATION_PLAN.md` Phase 3
