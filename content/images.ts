/**
 * Placeholder stock photography — one-file swap for real Éclat photography.
 * RULE: every slot uses a distinct photo ID (no repeats site-wide).
 * All IDs were verified (HTTP 200) and subject-checked via contact sheets
 * before assignment. Never hardcode a URL in a component.
 */
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const images = {
  // Home hero slideshow set (5 fresh portraits)
  archPortrait: u("photo-1488426862026-3ee34a7d66df", 1000),
  heroSlide2: u("photo-1594744803329-e58b31de8bf5", 800),
  heroSlide3: u("photo-1580489944761-15a19d654956", 800),
  heroSlide4: u("photo-1524250502761-1ac6f2e30d43", 800),
  heroSlide5: u("photo-1570172619644-dfd03ed5d881", 800),

  // Find Your Path — 5 category thumbnails
  categorySkincare: u("photo-1616394584738-fc6e612e71b9", 400),
  categoryMakeup: u("photo-1500840216050-6ffa99d75160", 400),
  categoryHair: u("photo-1595476108010-b4d1f102b1b1", 400),
  categoryNails: u("photo-1522337660859-02fbefca4702", 400),
  categoryWellness: u("photo-1540555700478-4be289fbecef", 400),

  // Expert training block
  trainingClassroom: u("photo-1600948836101-f9ffda59d250", 1200),

  // Testimonial avatars (must be faces)
  testimonialPriya: u("photo-1531746020798-e6953c6e8e04", 200),
  testimonialSecond: u("photo-1508214751196-bcfd4ca60f91", 200),

  // Home CTA banner
  ctaBanner: u("photo-1616683693504-3ea7e9ad6fec", 1200),

  // About
  aboutSalon: u("photo-1580618672591-eb180b1a973f", 1000),
  aboutPhilosophy: u("photo-1544161515-4ab6ce6db874", 800),
  trainerAnjali: u("photo-1487412720507-e7ab37603c6f", 600),
  trainerRina: u("photo-1492106087820-71f1a00d2b11", 600),
  trainerSneha: u("photo-1524504388940-b1c1722653e1", 600),
  orbitStudio: u("photo-1559599101-f09722fb4948", 1000),

  // Courses
  coursesHero: u("photo-1560066984-138dadb4c035", 800),
  courseThumbSkincare: u("photo-1512290923902-8a9f81dc236c", 600),
  courseThumbMakeup: u("photo-1596704017254-9b121068fb31", 600),
  courseThumbHair: u("photo-1608248543803-ba4f8c70ae0b", 600),
  courseThumbNails: u("photo-1607779097040-26e80aa78e66", 600),
  courseThumbWellness: u("photo-1620916566398-39f1143ab7be", 600),
  courseThumbComplete: u("photo-1583209814683-c023dd293cc6", 600),

  // Course detail
  courseDetailSkincare: u("photo-1512496015851-a90fb38ba796", 1000),
  courseDetailCta: u("photo-1631730359585-38a4935cbec4", 1200),

  // Journal
  journalHero: u("photo-1522338242992-e1a54906a8da", 800),
  journalThumbHabits: u("photo-1610992015732-2449b76344bc", 600),
  journalThumbMakeup: u("photo-1596462502278-27bfdc403348", 600),
  journalThumbChoose: u("photo-1534528741775-53994a69daeb", 600),
  journalThumbCareer: u("photo-1516975080664-ed2fc6a32937", 600),

  // Work gallery
  workStudio: u("photo-1521590832167-7bcbfaa6381f", 1200),
  workProducts: u("photo-1631729371254-42c2892f0e6e", 600),
  workSalon: u("photo-1633681926035-ec1ac984418a", 600),
  workFacial: u("photo-1552693673-1bf958298935", 600),
  workBrushes: u("photo-1526045478516-99145907023c", 600),

  // Admissions
  admissionsInterior: u("photo-1571875257727-256c39da42af", 600),
} as const;

export type ImageSlot = keyof typeof images;
