import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { InstagramIcon, FacebookIcon } from "@/components/social-icons";
import { copy } from "@/content/copy";

export default function Footer() {
  return (
    <footer className="mt-[64px] border-t border-bone">
      <Reveal>
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:justify-between md:px-6">
        <div>
          <p className="font-gascognets text-[28px] font-medium leading-none">
            {copy.brand}
          </p>
          <p className="mt-1 font-basisgrotesquepro-mono text-[10px] uppercase tracking-[0.056em] text-stone">
            {copy.brandSub}
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-6 gap-y-2 font-basis-grotesque-pro text-[14px]"
        >
          <Link href="/about" className="transition-colors hover:text-terracotta-whisper">{copy.navAbout}</Link>
          <Link href="/courses" className="transition-colors hover:text-terracotta-whisper">{copy.navPrograms}</Link>
          <Link href="/work" className="transition-colors hover:text-terracotta-whisper">{copy.navWork}</Link>
          <Link href="/journal" className="transition-colors hover:text-terracotta-whisper">{copy.navJournal}</Link>
          <Link href="/admissions" className="transition-colors hover:text-terracotta-whisper">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-[999px] border border-ink-black text-ink-black transition-colors hover:bg-ink-black hover:text-cream-linen active:scale-95"
          >
            <InstagramIcon />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-[999px] border border-ink-black text-ink-black transition-colors hover:bg-ink-black hover:text-cream-linen active:scale-95"
          >
            <FacebookIcon />
          </a>
          <a
            href="#"
            aria-label="X"
            className="flex h-9 w-9 items-center justify-center rounded-[999px] border border-ink-black font-basis-grotesque-pro text-[14px] transition-colors hover:bg-ink-black hover:text-cream-linen active:scale-95"
          >
            X
          </a>
        </div>
      </div>
      </Reveal>
      <div className="mx-auto w-full max-w-[1200px] px-4 pb-8 md:px-6">
        <p className="font-basis-grotesque-pro text-[13px] text-stone">
          {copy.footerRights}
        </p>
      </div>
    </footer>
  );
}
