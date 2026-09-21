# Éclat Beauty Institute — Implementation Plan

Phased so each phase produces something viewable. Assumes the stack and structure in `ARCHITECTURE.md`.

## Phase 0 — Project Setup
- [ ] `create-next-app` (TypeScript, App Router, Tailwind v4)
- [ ] Paste `DESIGN.md`'s CSS variables + Tailwind `@theme` block into `app/globals.css`
- [ ] Install `gsap`, `framer-motion`, `lucide-react`, `react-hook-form`, `zod`; register `ScrollTrigger` in `lib/gsap.ts`
- [ ] Add `next/font` fallback (Playfair Display for GascogneTS, Inter for Basis Grotesque Pro)
- [ ] Set up `content/images.ts` with placeholder Unsplash URLs covering every slot in `ARCHITECTURE.md` §7
- [ ] Define `content/courses.ts` and `content/articles.ts` data shapes (see §5's `CourseRow`/`JournalCard` needs)

## Phase 1 — Static Layout, No Animation
- [ ] Build `NavBar`, `Footer`, base page shells for all 7 routes
- [ ] Build `Hero` (static, no carousel motion yet)
- [ ] Build `CategoryCircle` row, `StatBlock` row, `IconFeature` grid, `TrainerCard`, `TestimonialCard` (static), `CTABanner`
- [ ] Build `CourseRow` + `FilterPillGroup` for `/courses`; `CourseMetaGrid` + `ChecklistColumn` + `NumberedList` for `/courses/[slug]`
- [ ] Build `JournalCard` grid for `/journal`; article body + `RelatedArticleRow` for `/journal/[slug]`
- [ ] Build `AdmissionsForm`, `ContactMethodRow`, `MapCard` for `/admissions`
- [ ] Verify token discipline: 0px radius on every card/product/course/journal image, 999px on every button/circle, coral used only on the single primary CTA per viewport
- [ ] Responsive pass at 375 / 768 / 1440

**Checkpoint:** site is fully navigable and on-brand with zero motion.

## Phase 2 — Motion Pass (rich editorial scroll system, per `ARCHITECTURE.md` §6)
- [ ] Baseline: Framer Motion `whileInView` fade + translate-up wired sitewide as the fallback layer for sections not covered below
- [ ] Hero: build the layered-drift + cinematic-blur treatment (headline layer / photo layer independently scrubbed, blur sweep on cross)
- [ ] "Find Your Path": mosaic-drift stagger on the five `CategoryCircle` items, settling to the aligned row
- [ ] Trainers / certificate badge: slow scroll-scrubbed orbit rotation on the circular image
- [ ] Testimonial carousel: diagonal tile-slide transition between cards, replacing the plain crossfade; working prev/next arrows
- [ ] `CourseRow` / `JournalCard`: perspective-in entrance (slight zoom + `rotateX` easing to flat) as each row/card enters view
- [ ] Stats bar / "Why Choose Éclat": staggered radial-reveal timing instead of uniform left-to-right fade
- [ ] Hover states: nav pill border-fill, outlined-button fill-on-hover, category-circle scale
- [ ] `prefers-reduced-motion` check: every treatment above collapses to fade-only, confirmed per-section in devtools
- [ ] Mobile (<768px) check: orbit and diagonal-tile treatments disabled, remaining treatments reduced to single-axis transforms
- [ ] Perf pass: 60fps target on a mid-tier laptop; `will-change`/`perspective` scoped per-section, not per-element

## Phase 3 — Data & Interactivity
- [ ] Wire `FilterPillGroup` filtering logic on both `/courses` (by category) and `/journal` (by topic) — client-side filter over the `content/` data arrays
- [ ] Wire `/courses/[slug]` and `/journal/[slug]` dynamic routes off slugs in `content/courses.ts` / `content/articles.ts`
- [ ] Wire `AdmissionsForm` with Zod validation + stub submit handler (log + success state); swap in real CRM/email endpoint later
- [ ] Wire "Course Interested In" select to pull live options from `content/courses.ts` (not a hardcoded list)

## Phase 4 — Polish
- [ ] Hover/focus states on every interactive element (accessibility: visible focus ring on cream background needs testing — black outline elements especially)
- [ ] Alt text on all stock images, semantic heading hierarchy, keyboard nav through carousels and filter pills
- [ ] Lighthouse pass (target 90+ desktop, 80+ mobile — revised down slightly from the original "quiet motion" target now that Phase 2 adds scroll-scrubbed GSAP sequences)
- [ ] Cross-browser check, especially serif font fallback rendering (GascogneTS → Playfair Display) on Windows/Linux

## Phase 5 — Handoff / Real-Asset Swap
- [ ] Replace every entry in `content/images.ts` with licensed Éclat photography — no component changes required
- [ ] Swap Playfair Display/Inter for licensed GascogneTS/Basis Grotesque Pro if/when acquired
- [ ] Populate `content/courses.ts` and `content/articles.ts` with real institute data (pricing, curricula, published articles)
- [ ] Final QA against `DESIGN.md` Do's/Don'ts and the Coral Pop rationing rule ("one filled coral surface per viewport maximum")

## Definition of Done (per phase)
A phase is complete when: it builds with no TS errors, passes the responsive checkpoints above, and (from Phase 2 onward) the reduced-motion fallback has been manually verified in devtools.
