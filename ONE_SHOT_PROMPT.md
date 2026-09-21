# One-Shot Build Prompt — Éclat Beauty Institute Website

Paste this whole prompt into your agentic coding tool (Claude Code / equivalent) at the repo root, after `ARCHITECTURE.md`, `IMPLEMENTATION_PLAN.md`, `AGENTS.md`, and `DESIGN.md` are present in the repo.

---

## Prompt

You are building the Éclat Beauty Institute website end-to-end in one pass. Read `ARCHITECTURE.md`, `IMPLEMENTATION_PLAN.md`, `AGENTS.md`, and `DESIGN.md` fully before writing any code — they are binding, not inspiration. Do not ask me clarifying questions; make the most reasonable call yourself and note assumptions in a final summary.

**Work through this as a pipeline of sub-agents, each with a narrow mandate. Use the Task tool to spin up a fresh sub-agent per stage below — don't do all seven stages in one undifferentiated pass.** Each sub-agent should receive only the context it needs (its stage's brief + the relevant source docs), do its work, write its own short handoff note (what it built, what it assumed, what the next stage needs to know), and stop. The orchestrating agent (you, at the top level) sequences the stages, passes handoff notes forward, and owns the final QA gate.

### Stage 1 — Scaffold Agent
Mandate: project setup only.
- `create-next-app` per `ARCHITECTURE.md` §2 (TypeScript, App Router, Tailwind v4)
- Port `DESIGN.md`'s CSS variables and Tailwind `@theme` block into `app/globals.css` verbatim
- Install `gsap`, `framer-motion`, `lucide-react`, `react-hook-form`, `zod`; set up `lib/gsap.ts` (registers `ScrollTrigger` once) and `lib/motion-prefs.ts`
- Create the empty folder structure from `ARCHITECTURE.md` §8
- Handoff note: confirm build runs clean (`npm run dev`) before passing on

### Stage 2 — Content & Data Agent
Mandate: `content/images.ts`, `content/copy.ts`, `content/courses.ts`, `content/articles.ts` only, nothing else.
- Source stock photography for every slot named in `ARCHITECTURE.md` §7 (hero portrait, 5 category circles, trainer photos, 6 course thumbnails, journal thumbnails, spa/interior shots for About and Admissions) — warm, editorial, soft-lit beauty/skincare/salon imagery, nothing clinical or harsh
- Write all headline/body copy for the 7 routes, matching the tone and actual line content visible in the mockups (e.g. "The Art of Beauty.", "More than a school, it's a community.", "Build your skills. Shape your future.")
- Populate `content/courses.ts` with the six courses shown (Professional Skincare, Makeup Artistry, Hair Design, Nail Artistry, Beauty & Wellness, Complete Beauty Program) including duration, price, level, mode, certificate, what-you'll-learn items, and course-structure steps
- Populate `content/articles.ts` with the journal articles shown, including the "How to Choose the Right Beauty Course for You" detail content and its related-articles set
- Handoff note: list every image/data slot filled and its source, flag anything you couldn't find strong source material for

### Stage 3 — Component Agent
Mandate: build every component in `ARCHITECTURE.md` §5 as static, unanimated, fully responsive React components using only the design tokens (no hardcoded colors/spacing/radii — see `AGENTS.md` Design System Rules, especially the cards=0px-radius vs buttons=999px-radius distinction and the one-filled-coral-surface-per-viewport rule).
- Build in this order: `NavBar`, `Footer`, `StatBlock`, `IconFeature`, `CategoryCircle`, `Hero`, `TrainerCard`, `TestimonialCard`, `CTABanner`, `FilterPillGroup`, `CourseRow`, `CourseMetaGrid`, `ChecklistColumn`, `NumberedList`, `JournalCard`, `RelatedArticleRow`, `AdmissionsForm`, `ContactMethodRow`, `MapCard`
- Assemble all 7 routes from `ARCHITECTURE.md` §4 using these components and Stage 2's content/data
- Responsive check at 375 / 768 / 1440
- **Before marking this stage done, invoke the installed `design-taste-frontend` skill (and `impeccable`, if its install has been fixed — see `AGENTS.md`'s Taste-Skill Audit Note) against every assembled page** — treat findings as advisory, not blocking, and defer to `DESIGN.md`/the mockups wherever the skill's generic anti-slop defaults (banned fonts/icons, banned numbered labels, etc.) conflict with this project's actual approved brand. Fix genuine spacing/hierarchy/alignment issues it flags. If neither skill is available, do a manual self-review against `DESIGN.md`'s Do's/Don'ts list instead and say so in the handoff note.
- Handoff note: confirm zero hardcoded style values, confirm taste review passed (or manual equivalent) with any DESIGN.md-vs-skill conflicts noted and resolved in DESIGN.md's favor, list any deviations from the mockups and why

### Stage 4 — Motion Agent
Mandate: implement `ARCHITECTURE.md` §6's full rich editorial scroll system — GSAP/ScrollTrigger for every scroll-scrubbed effect, Framer Motion for the rest — component by component:
- Hero: layered drift (headline vs. photo, independent scroll speeds) + cinematic blur sweep at the crossover
- "Find Your Path": mosaic-drift stagger on the five `CategoryCircle` items, settling to the aligned row
- Trainers / certificate badge: slow scroll-scrubbed orbit rotation on the circular image
- Testimonial carousel: diagonal tile-slide transition between cards, with working prev/next arrows
- `CourseRow` / `JournalCard`: perspective-in entrance (slight zoom + `rotateX` easing to flat)
- Stats bar / "Why Choose Éclat": staggered radial-reveal timing
- Baseline `whileInView` fade + translate-up (Framer Motion) for every remaining section
- Hover states: nav pill fill, outlined-button fill, category-circle scale
- Implement and verify the `prefers-reduced-motion` fallback for every one of the above — full fade-only collapse, not a toned-down version of the effect
- Verify the mobile (<768px) fallback: orbit and diagonal-tile treatments off, remaining treatments reduced to single-axis
- Cap all rotation/tilt at ≤10deg per `AGENTS.md`

### Stage 5 — Interactivity Agent
Mandate: `IMPLEMENTATION_PLAN.md` Phase 3 — data wiring, independent of the motion work in Stage 4.
- Wire `FilterPillGroup` filtering on `/courses` and `/journal`; wire dynamic `[slug]` routes; wire `AdmissionsForm` with Zod validation and a stub submit handler
- Wire "Course Interested In" select to pull live options from `content/courses.ts`
- Handoff note: confirm filters and dynamic routes work against Stage 2's data, confirm form validation errors display correctly

### Stage 6 — Polish Agent
Mandate: `IMPLEMENTATION_PLAN.md` Phase 4 in full — hover/focus states, accessibility pass (alt text, focus rings, semantic headings, keyboard nav through carousels/filters/pinned or scroll-scrubbed sections), Lighthouse pass, cross-browser serif-fallback and GSAP/Safari sticky-interaction check.
- **Re-invoke `design-taste-frontend` (and `impeccable`, if available) on the fully animated, fully polished site** — same advisory rule as Stage 3: fix genuine issues, defer to `DESIGN.md` on any conflict. This is the final visual-quality gate before QA. Iterate until clean.
- Handoff note: Lighthouse scores, any accessibility issues found and fixed, any font-fallback or Safari-specific fixes applied

### Stage 7 — QA Agent (orchestrator-run, not delegated)
- Run `npm run typecheck && npm run lint && npm run build` — must all pass clean
- Walk `AGENTS.md`'s PR/Change Checklist item by item
- Walk `DESIGN.md`'s Do's/Don'ts and the coral-rationing rule, confirming compliance across every page
- Produce a final summary for me: what was built, all assumptions made across stages, any taste-skill findings that were overridden in favor of `DESIGN.md` and why, and a short list of anything deferred to `IMPLEMENTATION_PLAN.md` Phase 5 (real-asset swap, licensed fonts, real course/article content)

### Global constraints (apply to every stage)
- Follow `AGENTS.md` without exception — design tokens only, GSAP owns scroll-scrubbed motion, Framer Motion is UI micro-interactions and the plain fallback fade, rotation/tilt capped at ≤10deg, images only via `content/images.ts`, copy only via `content/copy.ts`, course/article data only via `content/courses.ts`/`content/articles.ts`
- Don't skip ahead to later stages to "save time" — each stage's handoff note is how the next stage gets context, and skipping breaks that chain
- If a stage's sub-agent hits a genuine ambiguity `ARCHITECTURE.md`/`DESIGN.md` doesn't resolve, it should make the most on-brand call itself (cream canvas, serif headlines only, sharp cards, pill buttons, coral used sparingly, motion editorial rather than playful) rather than stall

Begin with Stage 1.
