"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/motion-prefs";

const EASE = [0.16, 1, 0.3, 1] as const;
const useReducedMotion = usePrefersReducedMotion;

/** Baseline everywhere else: plain whileInView fade + translate-up. */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [...EASE] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * "Larger Than Life" perspective-in for CourseRow / JournalCard thumbnails:
 * slight zoom + rotateX easing to flat. Fade-only under reduced motion or
 * on mobile (single-axis, cheaper transforms).
 */
export function PerspectiveIn({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const simple = reduce === true || mobile;
  return (
    <motion.div
      className={className}
      style={simple ? undefined : { perspective: 800 }}
      initial={simple ? { opacity: 0 } : { opacity: 0, y: 32, scale: 1.08, rotateX: 4 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [...EASE] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * "Luxury Details" staggered radial reveal for StatBlock / IconFeature grids.
 * Delay is keyed to distance from center (center-out), not left-to-right.
 * NOTE: this component renders the grid element itself (it must generate a
 * box — display:contents would give IntersectionObserver a zero-area target
 * and whileInView would never fire). Pass grid classes via className.
 */
export function RadialGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export function RadialItem({
  children,
  index,
  total,
  className,
}: {
  children: ReactNode;
  index: number;
  total: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const center = (total - 1) / 2;
  const delay = Math.abs(index - center) * 0.09;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, delay, ease: [...EASE] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
