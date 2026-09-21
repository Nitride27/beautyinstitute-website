"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile, usePrefersReducedMotion as useReducedMotion } from "@/lib/motion-prefs";

interface ParallaxImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

/** Gentle scroll parallax for editorial images. Fade-only when reduced motion. */
export default function ParallaxImage({ src, alt, width, height, className }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], mobile ? [-16, 16] : [-44, 44]);

  return (
    <div ref={ref} className={`overflow-hidden rounded-[0px] ${className ?? ""}`}>
      <motion.div style={reduce === true ? undefined : { y }} className="will-change-transform">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full scale-[1.12] object-cover"
        />
      </motion.div>
    </div>
  );
}
