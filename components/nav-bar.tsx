"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { copy } from "@/content/copy";

const links = [
  { href: "/about", label: copy.navAbout },
  { href: "/courses", label: copy.navPrograms },
  { href: "/work", label: copy.navWork },
  { href: "/journal", label: copy.navJournal },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/beautyinstitute-website";
  // Home: the bar stays in flow over the hero and locks only after the
  // pinned show ends (the hero dispatches eclat:nav-stick). Other pages
  // have no hero, so the bar is persistent from the start.
  const [stuck, setStuck] = useState(!isHome);
  const headRef = useRef<HTMLElement>(null);
  const [ph, setPh] = useState(0);

  useEffect(() => {
    if (!isHome) {
      setStuck(true);
      return;
    }
    setStuck(false);
    const onStick = (e: Event) => setStuck((e as CustomEvent<boolean>).detail);
    window.addEventListener("eclat:nav-stick", onStick);
    return () => window.removeEventListener("eclat:nav-stick", onStick);
  }, [isHome]);

  useEffect(() => {
    const measure = () => setPh(headRef.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const floating = isHome && stuck;

  return (
    <>
    {floating && <div aria-hidden style={{ height: ph }} />}
    <header
      ref={headRef}
      className={
        floating
          ? "fixed inset-x-0 top-0 z-50 bg-cream-linen"
          : isHome
            ? "relative bg-cream-linen"
            : "sticky top-0 z-50 bg-cream-linen"
      }
    >
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-3 pt-4 md:px-6">
      <nav
        aria-label="Primary"
        className="flex items-center justify-between gap-3"
      >
        <Link
          href="/"
          className="font-gascognets text-[28px] font-medium leading-none text-ink-black"
        >
          {copy.brand}
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <Link
              key={l.label + l.href}
              href={l.href}
              className="rounded-[999px] border border-ink-black bg-transparent px-[19px] py-[6px] font-basis-grotesque-pro text-[14px] text-ink-black transition-colors hover:bg-ink-black hover:text-cream-linen active:scale-[0.97]"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/admissions"
            className="rounded-[999px] bg-coral-pop px-[19px] py-[6px] font-basis-grotesque-pro text-[14px] text-pure-white transition-colors duration-300 hover:bg-ink-black active:scale-[0.97]"
          >
            {copy.applyNow} →
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-[999px] border border-ink-black transition-transform active:scale-95 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-3 flex flex-col gap-2 rounded-[20px] border border-ink-black bg-pure-white p-4 md:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.label + l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-[999px] border border-ink-black px-[19px] py-[8px] text-center font-basis-grotesque-pro text-[14px] transition-colors active:bg-bone"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/admissions"
              onClick={() => setOpen(false)}
              className="rounded-[999px] bg-coral-pop px-[19px] py-[8px] text-center font-basis-grotesque-pro text-[14px] text-pure-white transition-colors duration-300 hover:bg-ink-black active:scale-[0.97]"
            >
              {copy.applyNow} →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </header>
    </>
  );
}
