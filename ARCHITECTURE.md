# Éclat Beauty Institute — Architecture

## 1. Overview
Éclat is a beauty-education institute site: program enrollment, course catalog, journal/blog, and admissions. Six screens are shown in the mockups: Home, About Us, Courses (catalog + filter), Course Detail, Journal (list + article detail), and Admissions/Contact. Visual language follows `DESIGN.md` ("Beautiful™" system): warm cream-linen canvas, one coral accent rationed to CTAs/labels/banners, black hairline borders everywhere in place of shadows, GascogneTS serif for editorial headlines paired with Basis Grotesque Pro sans for everything else, pill-shaped (999px) buttons/circles, sharp-cornered (0px radius) product/course cards.

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Routing for catalog + dynamic course/article detail pages |
| Language | TypeScript | Typed course/article/testimonial data models |
| Styling | Tailwind CSS v4 (`@theme`) | Direct match to `DESIGN.md`'s Tailwind v4 token block |
| Animation | GSAP + ScrollTrigger (scroll-scrubbed sequences) + Framer Motion (discrete UI micro-interactions) | Revised: the brand now calls for rich, editorial scroll motion — layered drift, blur transitions, orbiting imagery, diagonal tile reveals — modeled on the reference reel in `motion-reference/` (see §6). GSAP owns anything scroll-scrubbed; Framer Motion stays limited to hovers, menu open/close, and route transitions |
| Stock imagery | Unsplash Source / Unsplash API (dev placeholders) | Placeholders tagged `skincare`, `spa`, `beauty salon`, `makeup artist`, `facial treatment`, `beauty students` — swap for licensed/shot photography before launch |
| Icons | Lucide (thin black outline) | Matches the black-outline, no-fill icon treatment in Why Choose Us / course meta rows |
| Fonts | Licensed GascogneTS + Basis Grotesque Pro if available, else Playfair Display + Inter via `next/font` | Style doc's named substitutes |
| Forms | React Hook Form + Zod | Admissions form has required fields, course-interest dropdown — needs real client validation |
| Deployment | Vercel | Zero-config Next.js hosting, image CDN |

## 3. Design Token Bridge
`DESIGN.md`'s CSS variables and Tailwind v4 `@theme` block are copied verbatim into `app/globals.css`. Component work references tokens only — e.g. `--radius-cards` (0px) vs `--radius-buttons` (999px) is the single most load-bearing distinction in this system and must never be confused (cards are always sharp, buttons/circles are always full pill).

## 4. Site Map / Routes

```
/                  → Home: hero + "Find Your Path" category row + expert-training block + testimonials + Apply CTA
/about             → About Us: story, stats bar, philosophy, why-choose-us, meet-the-trainers
/courses           → Courses: filterable catalog (All/Skincare/Makeup/Hair/Wellness), numbered list rows
/courses/[slug]    → Course Detail: hero + duration/level/mode/certificate meta + what-you'll-learn + course structure + career opportunities CTA
/journal           → Journal: filterable article list (All/Skincare/Makeup/Hair/Career)
/journal/[slug]    → Article Detail: full article + related articles rail
/admissions        → Admissions/Contact: "Ready to begin?" form + visit-us map + contact methods
```

Shared across all routes: `<NavBar>` (logo left, nav pills + Apply Now pill right, matches mock exactly), `<Footer>`.

## 5. Component Inventory

- `NavBar` — logo lockup, black-outline nav pills (About, Programs, Work, Journal), filled coral "Apply Now" pill on the far right
- `Hero` — split layout: serif display headline + body + coral outlined CTA on one side, full-bleed portrait photo on the other, small "01/05" carousel indicator bottom-right of image
- `CategoryCircle` — round photo (999px radius, black outline) + label below, used in "Find Your Path" row (Skincare, Makeup, Hair Design, Nail Artistry, Wellness)
- `StatBlock` — big serif number + label, used in About stats bar (5+, 500+, 10+, 100%) and course meta rows
- `IconFeature` — thin-line black icon + label + short blurb, used in "Why Choose Éclat" 4-up row
- `TrainerCard` — photo + short bio blurb, used in Meet Our Trainers
- `TestimonialCard` — avatar + quote + name, with carousel prev/next arrows (small circle, cream fill, black outline — matches Carousel Arrow Button spec)
- `CTABanner` — full-bleed coral or photo banner with headline + pill CTA (used for "Your beauty career starts here" and course-detail "Your future in beauty starts here")
- `CourseRow` — numbered (01–06) list row: thumbnail, title, duration, price, chevron link — used in Courses catalog
- `FilterPillGroup` — horizontal row of filter pills (All/Skincare/Makeup/…), one filled-coral active state, rest black-outline — reused identically on Courses and Journal
- `CourseMetaGrid` — 2x2 icon+label grid (Duration/Level/Mode/Certificate) on Course Detail
- `ChecklistColumn` — "What You'll Learn" checkmarked list
- `NumberedList` — "Course Structure" 01–06 numbered list (visually distinct from the checklist — circled numerals, not checkmarks)
- `JournalCard` — image + title + date, used in Journal grid and Home teaser
- `RelatedArticleRow` — small thumbnail + title + date, used in the article-detail sidebar
- `AdmissionsForm` — Full Name / Email / Phone / Course Interested In (select) / Message, filled coral submit pill
- `ContactMethodRow` — icon + label (Visit Us / Call Us / Email Us / Follow Us)
- `MapCard` — embedded map + a secondary interior photo, sharp corners (0px radius, per card token)

## 6. Motion — Rich Editorial Scroll System
Revised brief: motion is now a signature part of the Éclat experience, not an afterthought — modeled on a reference reel of hero-animation styles ("Between Frames," "Human Stories," "Momentum in Orbit," "Organic Motion," "Stay Closer," "Larger Than Life," "Luxury Details"). Éclat's own visual language (warm cream, serif editorial type, black hairline borders, one coral accent) stays exactly as specified elsewhere in this doc — only the *motion* gets richer, not the palette or the type system. Each treatment below is mapped to a specific Éclat component rather than copied wholesale, and all are scroll-scrubbed via GSAP ScrollTrigger unless noted.

1. **Hero — "Between Frames" layered drift.** The headline ("The Art of Beauty.") and the full-bleed portrait photo sit in a `perspective` stage as two independent layers: the photo drifts and very slightly scales on scroll, the headline drifts opposite and slower, and a soft cinematic blur (`filter: blur()` scrubbed 0→3px→0) sweeps across the photo edge as the layers cross — the same layered-depth-plus-blur read as the reference's "between frames" panel, restyled in Éclat's serif/cream palette instead of that panel's neon/violet one.
2. **"Find Your Path" category row — "Human Stories" mosaic drift.** The five `CategoryCircle` photos, instead of animating as one flat row, drift in at slightly different scroll speeds and settle a few px off-grid from each other (mirroring the offset photo-mosaic rhythm in the reference), then lock to the tidy aligned row once fully in view.
3. **About "Meet the Trainers" / course-detail certificate badge — "Momentum in Orbit" rotation.** A circular cropped image (trainer group photo, or a circular "Certified" badge on Course Detail) spins slowly and continuously, vinyl-style (one full turn every ~40s, linear, time-based rather than scroll-scrubbed) on all viewports including phones.
4. **Testimonial carousel — "Stay Closer" diagonal tile transition.** Instead of a flat crossfade, outgoing/incoming testimonial cards transition on a slight diagonal tile-slide (translate + small rotate on a shared diagonal axis), echoing the reference's tiled-photo-strip motion, scaled down to card-sized UI.
5. **Course/Journal thumbnails — "Larger Than Life" perspective-in.** As `CourseRow` and `JournalCard` thumbnails enter the viewport, they ease in from a very slightly zoomed/tilted perspective to their resting flat state (small `scale` 1.08→1 + `rotateX` 4deg→0), giving each row entrance a bit of dimensional weight instead of a flat fade.
6. **Stats / "Why Choose Éclat" — "Luxury Details" radial reveal.** The `StatBlock` row and `IconFeature` grid reveal with a staggered radial timing (center-out or a per-item stagger keyed to its position) rather than a uniform left-to-right fade, echoing the reference's radially-arranged reveal.
7. **Baseline everywhere else:** simple `whileInView` fade + translate-up (Framer Motion) for any section not covered by 1–6 above (form, footer, contact rows).

Guardrails (unchanged in spirit, expanded in scope):
- `perspective`/`transformStyle: preserve-3d` set once on a wrapping stage per section, not per element.
- Cap rotation and tilt angles at ≤10deg — richer than the previous "quiet" brief, but still editorial rather than kinetic; nothing here should read as playful or bouncy.
- Respect `prefers-reduced-motion`: every treatment above collapses to a plain opacity fade, no drift/blur/rotation/tilt, no pinning.
- Mobile (<768px): disable pinning and the orbit/tile treatments (3 and 4); keep 1, 2, 5, 6 but reduce to single-axis, cheaper transforms for performance.

## 7. Stock Photography Strategy (placeholder phase)
- Source: Unsplash, queried per section (`facial treatment`, `skincare routine`, `makeup application`, `nail art`, `spa interior`, `beauty students classroom`, `beauty product flatlay`)
- Store selected URLs in `content/images.ts` keyed by slot (`heroPortrait`, `categorySkincare`, `categoryMakeup`, …, `courseThumb-*`, `journalThumb-*`, `trainerPhoto-*`) so real institute photography is a one-file swap later
- All images pass through `next/image`; radius is 0px per the card token except `CategoryCircle` and avatar images, which use `--radius-circles` (999px)

## 8. Folder Structure

```
app/
  layout.tsx
  globals.css
  page.tsx                     # Home
  about/page.tsx
  courses/page.tsx
  courses/[slug]/page.tsx
  journal/page.tsx
  journal/[slug]/page.tsx
  admissions/page.tsx
components/
  nav-bar.tsx
  hero.tsx
  category-circle.tsx
  stat-block.tsx
  icon-feature.tsx
  trainer-card.tsx
  testimonial-card.tsx
  cta-banner.tsx
  course-row.tsx
  filter-pill-group.tsx
  course-meta-grid.tsx
  checklist-column.tsx
  numbered-list.tsx
  journal-card.tsx
  related-article-row.tsx
  admissions-form.tsx
  contact-method-row.tsx
  map-card.tsx
lib/
  gsap.ts                       # registers ScrollTrigger once
  motion-prefs.ts
content/
  images.ts
  copy.ts
  courses.ts                   # course data model (title, slug, duration, price, level, mode, certificate, what-you-learn[], structure[])
  articles.ts                  # journal article data model
public/
  fonts/
AGENTS.md
```
