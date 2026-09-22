"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, GraduationCap, HandHeart, Building2, Compass } from "lucide-react";
import Hero from "@/components/hero";
import CategoryCircle from "@/components/category-circle";
import IconFeature from "@/components/icon-feature";
import TestimonialCard from "@/components/testimonial-card";
import CTABanner from "@/components/cta-banner";
import ParallaxImage from "@/components/motion/parallax-image";
import { Reveal, RadialGroup, RadialItem } from "@/components/motion/reveal";
import { registerGsap, gsap } from "@/lib/gsap";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/motion-prefs";
import { images } from "@/content/images";
import { copy } from "@/content/copy";

const categories = [
  { label: "Skincare", src: images.categorySkincare, alt: "Facial skincare treatment" },
  { label: "Makeup", src: images.categoryMakeup, alt: "Makeup application" },
  { label: "Hair Design", src: images.categoryHair, alt: "Hair styling in salon" },
  { label: "Nail Artistry", src: images.categoryNails, alt: "Manicure nail art" },
  { label: "Wellness", src: images.categoryWellness, alt: "Spa wellness treatment" },
];

const testimonials = [
  {
    quote: copy.testimonialQuote,
    name: copy.testimonialName,
    src: images.testimonialPriya,
  },
  {
    quote:
      "The hands-on training set Éclat apart — I was working with real clients within weeks.",
    name: "Sneha Karki, Graduate",
    src: images.testimonialSecond,
  },
];

export default function HomePage() {
  const [[ti, dir], setTi] = useState<[number, number]>([0, 0]);
  const t = testimonials[ti];
  const reduce = usePrefersReducedMotion();
  const mobile = useIsMobile();
  // Rich treatment only after mount confirms a desktop viewport. SSR and
  // first paint render the simple fade everywhere, so phones never flash
  // the tilted enter state before the mobile flag flips.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const simpleAnim = reduce === true || mobile || !mounted;
  const mosaicRef = useRef<HTMLDivElement>(null);
  const testiRef = useRef<HTMLElement>(null);

  // "Stay Closer" — testimonial card drifts diagonally as the section scrolls through.
  const { scrollYProgress: tProg } = useScroll({
    target: testiRef,
    offset: ["start end", "end start"],
  });
  const tX = useTransform(tProg, [0, 1], [48, -48]);
  const tY = useTransform(tProg, [0, 1], [-24, 24]);

  // "Human Stories" mosaic drift: circles settle from off-grid offsets.
  useEffect(() => {
    if (reduce === true || !mosaicRef.current) return;
    registerGsap();
    const offsets = [34, -22, 44, -28, 24];
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".mosaic-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: offsets[i] ?? 0, x: mobile ? 0 : i % 2 === 0 ? 10 : -10 },
          {
            y: 0,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: mosaicRef.current,
              start: "top 85%",
              end: "center 45%",
              scrub: true,
            },
          }
        );
      });
    }, mosaicRef);
    return () => ctx.revert();
  }, [reduce, mobile]);

  const go = (d: number) =>
    setTi([(ti + d + testimonials.length) % testimonials.length, d]);

  return (
    <>
      <Hero
        eyebrow={copy.homeEyebrow}
        headline={copy.homeHeadline}
        body={copy.homeBody}
        ctaLabel={copy.homeCta}
        ctaHref="/courses"
      />

      <section className="mx-auto mt-[64px] w-full max-w-[1200px] px-4 md:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-basisgrotesquepro-mono text-[14px] uppercase tracking-[0.056em] text-coral-pop">
              {copy.programsEyebrow}
            </p>
            <h2 className="mt-2 font-gascognets text-[39px] font-medium leading-[1.1]">
              {copy.programsHeadline}
            </h2>
          </div>
            <Link
              href="/courses"
              className="font-basis-grotesque-pro text-[14px] text-terracotta-whisper transition-colors hover:text-ink-black"
            >
            {copy.viewAll} →
          </Link>
        </div>
        <div ref={mosaicRef} className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((c) => (
            <span key={c.label} className="mosaic-item will-change-transform">
              <CategoryCircle label={c.label} imageSrc={c.src} imageAlt={c.alt} />
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-[64px] grid w-full max-w-[1200px] gap-8 px-4 md:grid-cols-2 md:items-center md:px-6">
        <ParallaxImage
          src={images.trainingClassroom}
          alt="Students learning together in the Éclat classroom"
          width={1000}
          height={700}
        />
        <div>
          <p className="font-basisgrotesquepro-mono text-[14px] uppercase tracking-[0.056em] text-coral-pop">
            {copy.trainingEyebrow}
          </p>
          <h2 className="mt-2 font-gascognets text-[39px] font-medium leading-[1.1]">
            {copy.trainingHeadline}
          </h2>
          <p className="mt-3 max-w-[50ch] font-basis-grotesque-pro text-[16px] leading-[1.3] text-charcoal">
            {copy.trainingBody}
          </p>
          <RadialGroup className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: GraduationCap, title: "Expert Faculty", body: "Industry professionals with real-world experience." },
              { icon: HandHeart, title: "Hands-on Training", body: "Work with real clients and modern tools." },
              { icon: Building2, title: "Modern Facilities", body: "State-of-the-art studios and equipment." },
              { icon: Compass, title: "Career Support", body: "Guidance from enrollment to employment." },
            ].map((f, i) => (
              <RadialItem key={f.title} index={i} total={4}>
                <IconFeature icon={f.icon} title={f.title} body={f.body} />
              </RadialItem>
            ))}
          </RadialGroup>
        </div>
      </section>

      <section ref={testiRef} className="mx-auto mt-[64px] w-full max-w-[1200px] px-4 md:px-6">
        <p className="font-basisgrotesquepro-mono text-[14px] uppercase tracking-[0.056em] text-coral-pop">
          {copy.testimonialsEyebrow}
        </p>
        <div className="flex items-end justify-between">
          <h2 className="mt-2 font-gascognets text-[39px] font-medium leading-[1.1]">
            {copy.testimonialsHeadline}
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[999px] border border-ink-black bg-cream-linen transition-colors duration-300 hover:bg-ink-black hover:text-cream-linen active:scale-95"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[999px] border border-ink-black bg-cream-linen transition-colors duration-300 hover:bg-ink-black hover:text-cream-linen active:scale-95"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <motion.div
          className="mt-6 max-w-[640px] will-change-transform"
          style={simpleAnim ? undefined : { x: tX, y: tY }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={ti}
              custom={dir}
              variants={
                simpleAnim
                  ? {
                      enter: { opacity: 0 },
                      center: { opacity: 1 },
                      exit: { opacity: 0 },
                    }
                  : {
                      enter: (d: number) => ({ opacity: 0, x: 64 * (d >= 0 ? 1 : -1), y: -44 * (d >= 0 ? 1 : -1), rotate: 4 }),
                      center: { opacity: 1, x: 0, y: 0, rotate: 0 },
                      exit: (d: number) => ({ opacity: 0, x: -64 * (d >= 0 ? 1 : -1), y: 44 * (d >= 0 ? 1 : -1), rotate: -4 }),
                    }
              }
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <TestimonialCard
                quote={t.quote}
                name={t.name}
                avatarSrc={t.src}
                avatarAlt={`Portrait of ${t.name}`}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>

      <div className="mx-auto mt-[64px] w-full max-w-[1200px] px-4 md:px-6">
        <Reveal>
          <CTABanner
            eyebrow={copy.ctaBannerEyebrow}
            headline={copy.ctaBannerHeadline}
            body={copy.ctaBannerBody}
            ctaLabel={copy.applyNow}
            ctaHref="/admissions"
            imageSrc={images.ctaBanner}
            imageAlt="Dramatic beauty portrait with red lips"
          />
        </Reveal>
      </div>
    </>
  );
}
