"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { registerGsap, gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect, usePrefersReducedMotion } from "@/lib/motion-prefs";
import { images } from "@/content/images";

interface HeroSlideshowProps {
  eyebrow: string;
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

const SLIDES = [
  { src: images.archPortrait, alt: "Professional skincare kit with jade roller" },
  { src: images.heroSlide2, alt: "Makeup artist applying lipstick during training" },
  { src: images.heroSlide3, alt: "Hairdresser styling a client's hair in the salon" },
  { src: images.heroSlide4, alt: "Therapist pouring aromatic oil for a wellness ritual" },
  { src: images.heroSlide5, alt: "Professional hairdryer at the styling station" },
];

/**
 * Mock-faithful split hero with a scroll-driven slideshow in the arch.
 * The hero pins while page scroll steps through the five institute shots
 * — each slides in horizontally with a soft crossfade. Only after the set
 * completes does the page scroll past. Live 01/05 indicator + progress
 * hairline; margin note set straight. Same pinned show on phones and
 * desktop; reduced motion gets the static single-arch hero, no pin.
 */
export default function Hero({ eyebrow, headline, body, ctaLabel, ctaHref }: HeroSlideshowProps) {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const still = reduce;
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useIsomorphicLayoutEffect(() => {
    if (still || !root.current) return;
    registerGsap();
    // Phones land one photo per scroll gesture: snap the scrubbed progress
    // to the nearest slide when scrolling stops. Desktop keeps the free
    // continuous scrub.
    // Locks the navbar once the pinned show ends (home only — other
    // pages keep their persistent bar). onRefresh covers a mid-page reload.
    const setNavStuck = (v: boolean) =>
      window.dispatchEvent(new CustomEvent("eclat:nav-stick", { detail: v }));
    const snapPhone = window.matchMedia("(max-width: 767px)").matches;
    // Longer pin on phones so one flick travels roughly one photo interval.
    const pinEnd = snapPhone ? "+=2400" : "+=1600";
    const ctx = gsap.context(() => {
      const proxy = { p: 0 };
      gsap.to(proxy, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: pinEnd,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          ...(snapPhone
            ? {
                snap: {
                  snapTo: 1 / (SLIDES.length - 1),
                  duration: { min: 0.2, max: 0.5 },
                  delay: 0.1,
                  ease: "power1.inOut",
                },
              }
            : {}),
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            const i = Math.min(SLIDES.length - 1, Math.round(self.progress * (SLIDES.length - 1)));
            if (i !== activeRef.current) {
              activeRef.current = i;
              setActive(i);
            }
          },
          onLeave: () => setNavStuck(true),
          onLeaveBack: () => setNavStuck(false),
          onRefresh: (self) => {
            if (self.progress >= 1) setNavStuck(true);
          },
        },
      });
      gsap.to(".hero-slideshow-intro", {
        y: -40,
        opacity: 0.2,
        ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: pinEnd,
            scrub: true,
          },
      });
    }, root);
    return () => ctx.revert();
  }, [still]);

  if (still) {
    return (
      <section aria-label="Introduction" className="mx-auto w-full max-w-[1200px] px-4 pt-10 md:px-6">
        <p className="font-basisgrotesquepro-mono text-[14px] uppercase tracking-[0.056em] text-coral-pop">
          {eyebrow}
        </p>
        <h1 className="mt-[15px] max-w-[430px] font-gascognets text-[clamp(2.75rem,6vw,4rem)] font-medium leading-[1] text-ink-black">
          {headline}
        </h1>
        <p className="mt-[15px] max-w-[45ch] font-basis-grotesque-pro text-[16px] leading-[1.3] text-charcoal">
          {body}
        </p>
        <Link
          href={ctaHref}
          className="mt-5 inline-block rounded-[999px] bg-coral-pop px-[19px] py-[6px] font-basis-grotesque-pro text-[16px] text-pure-white transition-colors duration-300 hover:bg-ink-black active:scale-[0.97]"
        >
          {ctaLabel} →
        </Link>
        <div className="mx-auto mt-8 w-[78%] max-w-[420px]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-b-[0px] rounded-t-[999px]">
            <Image
              src={SLIDES[0].src}
              alt={SLIDES[0].alt}
              width={800}
              height={1000}
              priority
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <p className="mt-3 font-gascognets text-[16px] italic">
            Learn, Practice, Transform
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={root}
      aria-label="Introduction"
      className="mx-auto grid w-full max-w-[1200px] gap-8 px-4 pt-10 md:grid-cols-2 md:items-center md:px-6"
      style={{ perspective: 1200 }}
    >
      <div className="hero-slideshow-intro will-change-transform">
        <p className="font-basisgrotesquepro-mono text-[14px] uppercase tracking-[0.056em] text-coral-pop">
          {eyebrow}
        </p>
        <h1 className="mt-[15px] max-w-[430px] font-gascognets text-[clamp(2.75rem,6vw,4rem)] font-medium leading-[1] text-ink-black">
          {headline}
        </h1>
        <p className="mt-[15px] max-w-[45ch] font-basis-grotesque-pro text-[16px] leading-[1.3] text-charcoal">
          {body}
        </p>
        <Link
          href={ctaHref}
          className="mt-5 inline-block rounded-[999px] bg-coral-pop px-[19px] py-[6px] font-basis-grotesque-pro text-[16px] text-pure-white transition-colors duration-300 hover:bg-ink-black active:scale-[0.97]"
        >
          {ctaLabel} →
        </Link>
        <p className="mt-8 font-basisgrotesquepro-mono text-[10px] tracking-[0.056em] text-stone md:mt-16">
          SCROLL →
        </p>
      </div>

      <div className="relative">
        <div className="relative mx-auto aspect-[3/4] w-[72%] max-w-[400px] overflow-hidden rounded-b-[0px] rounded-t-[999px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ x: 90, opacity: 0, scale: 1.04 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -90, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={SLIDES[active].src}
                alt={SLIDES[active].alt}
                width={800}
                height={1000}
                priority={active < 2}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mx-auto flex w-[72%] max-w-[400px] items-baseline justify-between">
          <p aria-hidden className="mt-2 font-basisgrotesquepro-mono text-[10px] tracking-[0.056em] text-stone">
            0{active + 1} / 05
          </p>
          <p className="sr-only">Scroll to view all {SLIDES.length} portraits</p>
          <p className="mt-2 font-gascognets text-[16px] italic">
            Learn, Practice, Transform
          </p>
        </div>
        <div aria-hidden className="mx-auto mt-2 h-px w-[72%] max-w-[400px] bg-mist">
          <div ref={bar} className="h-px origin-left bg-ink-black" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}
