"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/**
 * Layout effect on the client, passive effect on the server (avoids the
 * useLayoutEffect SSR warning). Use for GSAP pin setups: layout-effect
 * cleanup runs synchronously before React removes DOM, so ctx.revert()
 * unwraps pin-spacers while the tree is still intact. A passive-effect
 * cleanup can flush after removal, which throws removeChild NotFoundError.
 */
export const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Deterministic reduced-motion flag. Starts false (matches SSR), then syncs
 * to the real matchMedia value on mount and follows live changes. Use this
 * instead of framer-motion's useReducedMotion, which snapshots once and can
 * disagree with the browser when markup is server-rendered.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia(REDUCED_MOTION_QUERY);
    setReduced(m.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** True below the 768px breakpoint: orbit/tile treatments off, single-axis transforms. */
export function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(max-width: 767px)");
    setMobile(m.matches);
    const onChange = (e: MediaQueryListEvent) => setMobile(e.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  return mobile;
}

/** CSS media-query string constants for non-hook usage. */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
export const MOBILE_QUERY = "(max-width: 767px)";
