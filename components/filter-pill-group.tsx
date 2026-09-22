"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion-prefs";

interface FilterPillGroupProps {
  options: readonly string[];
  active: string;
  onChange: (value: string) => void;
}

/**
 * Filter pills with a sliding active indicator (layout-shared coral pill).
 * Reduced motion: instant state swap, no slide.
 */
export default function FilterPillGroup({ options, active, onChange }: FilterPillGroupProps) {
  const reduce = usePrefersReducedMotion();
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter">
      {options.map((opt) => {
        const selected = opt === active;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={selected}
            className={
              selected
                ? "group relative cursor-pointer rounded-[999px] px-[19px] py-[6px] font-basis-grotesque-pro text-[14px] text-pure-white active:scale-[0.97]"
                : "cursor-pointer rounded-[999px] border border-ink-black bg-transparent px-[19px] py-[6px] font-basis-grotesque-pro text-[14px] text-ink-black transition-colors hover:bg-ink-black hover:text-cream-linen active:scale-[0.97]"
            }
          >
            {selected && (
              <motion.span
                layoutId="filter-pill-active"
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-[999px] bg-coral-pop transition-colors duration-300 group-hover:bg-terracotta-whisper"
                aria-hidden
              />
            )}
            <span className="relative z-10">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}
