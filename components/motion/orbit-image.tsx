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
 * "Momentum in Orbit" — slow continuous vinyl-style spin (one full turn
 * every 40s, linear and seamless). Runs on all viewports, phones included;
 * static image under reduced motion.
 */
export default function OrbitImage({ src, alt, width, height, circle = false }: OrbitImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !ref.current) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
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
