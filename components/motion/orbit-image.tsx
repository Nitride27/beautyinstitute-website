"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { registerGsap, gsap } from "@/lib/gsap";

interface OrbitImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Circular crop speaks the CategoryCircle language and reads rotation as orbit, not tilt. */
  circle?: boolean;
}

/**
 * "Momentum in Orbit" — slow scroll-scrubbed rotation (≤10deg) on circular
 * imagery. Disabled under reduced motion and below 768px (static image).
 */
export default function OrbitImage({ src, alt, width, height, circle = false }: OrbitImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (reduce || mobile || !ref.current) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { rotate: -8 },
        {
          rotate: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={
        circle
          ? "relative mx-auto aspect-square w-full max-w-[440px] overflow-hidden rounded-[999px] border border-ink-black will-change-transform"
          : "overflow-hidden rounded-[0px] will-change-transform"
      }
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={circle ? "absolute inset-0 h-full w-full object-cover" : "h-auto w-full object-cover"}
      />
    </div>
  );
}
