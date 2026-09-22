import Image from "next/image";
import Link from "next/link";

interface CTABannerProps {
  eyebrow: string;
  headline: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc?: string;
  imageAlt?: string;
}

/** Coral banner (photo variant when imageSrc given). One per viewport max. */
export default function CTABanner({
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt = "",
}: CTABannerProps) {
  return (
    <section className="grid overflow-hidden rounded-[0px] bg-coral-pop md:grid-cols-2">
      {imageSrc && (
        <div className="relative min-h-[240px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col items-start justify-center p-8 md:p-12">
        <p className="font-basisgrotesquepro-mono text-[14px] uppercase tracking-[0.056em] text-pure-white">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-gascognets text-[39px] font-medium leading-[1.1] text-pure-white">
          {headline}
        </h2>
        {body && (
          <p className="mt-2 font-basis-grotesque-pro text-[16px] text-pure-white">
            {body}
          </p>
        )}
        <Link
          href={ctaHref}
          className="mt-5 inline-block rounded-[999px] bg-pure-white px-[19px] py-[6px] font-basis-grotesque-pro text-[16px] text-ink-black transition-colors duration-300 hover:bg-ink-black hover:text-pure-white active:scale-[0.97]"
        >
          {ctaLabel} →
        </Link>
      </div>
    </section>
  );
}
