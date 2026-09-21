import Image from "next/image";
import CTABanner from "@/components/cta-banner";
import { Reveal, PerspectiveIn } from "@/components/motion/reveal";
import { images } from "@/content/images";
import { copy } from "@/content/copy";

const works = [
  {
    src: images.workStudio,
    alt: "Makeup studio with styled chair and beauty portraits",
    caption: "Studio Session",
    span: "md:col-span-4",
  },
  {
    src: images.workProducts,
    alt: "Minimal skincare bottles",
    caption: "Skincare Ritual",
    span: "md:col-span-2",
  },
  {
    src: images.workFacial,
    alt: "Facial treatment in progress",
    caption: "Bridal Artistry",
    span: "md:col-span-2",
  },
  {
    src: images.workSalon,
    alt: "Éclat salon interior",
    caption: "Salon Craft",
    span: "md:col-span-2",
  },
  {
    src: images.workBrushes,
    alt: "Professional makeup brush set",
    caption: "Editorial Look",
    span: "md:col-span-2",
  },
];

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1200px] px-4 pt-10 md:px-6">
        <p className="font-basisgrotesquepro-mono text-[14px] uppercase tracking-[0.056em] text-coral-pop">
          {copy.workEyebrow}
        </p>
        <h1 className="mt-2 max-w-[16ch] font-gascognets text-[39px] font-medium leading-[1.1]">
          {copy.workHeadline}
        </h1>
        <p className="mt-3 max-w-[60ch] font-basis-grotesque-pro text-[16px] leading-[1.3] text-charcoal">
          {copy.workBody}
        </p>
      </section>

      <section className="mx-auto mt-[64px] grid w-full max-w-[1200px] grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-6 md:px-6">
        {works.map((w) => (
          <PerspectiveIn key={w.src} className={w.span}>
            <figure>
              <span className="block aspect-[4/3] overflow-hidden rounded-[0px]">
                <Image
                  src={w.src}
                  alt={w.alt}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </span>
              <figcaption className="mt-2 flex items-baseline justify-between">
                <span className="font-basis-grotesque-pro text-[14px]">{w.caption}</span>
                <span className="font-basisgrotesquepro-mono text-[10px] tracking-[0.056em] text-stone">
                  ÉCLAT STUDIO
                </span>
              </figcaption>
            </figure>
          </PerspectiveIn>
        ))}
      </section>

      <div className="mx-auto mt-[64px] w-full max-w-[1200px] px-4 md:px-6">
        <Reveal>
          <CTABanner
            eyebrow={copy.ctaBannerEyebrow}
            headline={copy.ctaBannerHeadline}
            body={copy.ctaBannerBody}
            ctaLabel={copy.applyNow}
            ctaHref="/admissions"
          />
        </Reveal>
      </div>
    </>
  );
}
