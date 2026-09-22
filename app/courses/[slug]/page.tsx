import Link from "next/link";
import { notFound } from "next/navigation";
import CourseMetaGrid from "@/components/course-meta-grid";
import ChecklistColumn from "@/components/checklist-column";
import NumberedList from "@/components/numbered-list";
import CTABanner from "@/components/cta-banner";
import { Reveal } from "@/components/motion/reveal";
import ParallaxImage from "@/components/motion/parallax-image";
import { courses, getCourse } from "@/content/courses";
import { images } from "@/content/images";
import { copy } from "@/content/copy";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <>
      <section className="mx-auto grid w-full max-w-[1200px] gap-8 px-4 pt-10 md:grid-cols-2 md:items-start md:px-6">
        <div>
          <p className="font-basisgrotesquepro-mono text-[12px] uppercase tracking-[0.056em] text-stone">
            {copy.courseDetailKicker}
          </p>
          <h1 className="mt-2 font-gascognets text-[39px] font-medium leading-[1.1]">
            {course.title}
          </h1>
          <p className="mt-3 max-w-[50ch] font-basis-grotesque-pro text-[16px] text-charcoal">
            {course.tagline}
          </p>
          <Link
            href="/admissions"
            className="mt-5 inline-block rounded-[999px] bg-coral-pop px-[19px] py-[6px] font-basis-grotesque-pro text-[16px] text-pure-white transition-colors duration-300 hover:bg-ink-black active:scale-[0.97]"
          >
            {copy.applyNow} →
          </Link>
          <div className="mt-8">
            <CourseMetaGrid
              duration={course.duration}
              level={course.level}
              mode={course.mode}
              certificate={course.certificate}
            />
          </div>
        </div>
        <ParallaxImage
          src={images.courseDetailSkincare}
          alt={course.thumbnailAlt}
          width={800}
          height={1000}
        />
      </section>

      <section className="mx-auto mt-[64px] grid w-full max-w-[1200px] gap-10 px-4 md:grid-cols-2 md:px-6">
        <div>
          <h2 className="font-gascognets text-[30px] font-medium leading-[1.2]">
            {copy.learnHeadline}
          </h2>
          <div className="mt-4">
            <ChecklistColumn items={course.learn} />
          </div>
        </div>
        <div>
          <h2 className="font-gascognets text-[30px] font-medium leading-[1.2]">
            {copy.structureHeadline}
          </h2>
          <div className="mt-4">
            <NumberedList items={course.structure} />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-[64px] w-full max-w-[1200px] px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-gascognets text-[30px] font-medium leading-[1.2]">
            {copy.careerHeadline}
          </h2>
          <Link
            href="/courses"
            className="font-basis-grotesque-pro text-[14px] text-terracotta-whisper transition-colors hover:text-ink-black"
          >
            {copy.careerCta} →
          </Link>
        </div>
        <p className="mt-2 max-w-[70ch] font-basis-grotesque-pro text-[16px] text-charcoal">
          {course.career}
        </p>
        <div className="mt-6">
          <Reveal>
            <CTABanner
              eyebrow=""
              headline={copy.detailCtaHeadline}
              ctaLabel={copy.applyNow}
              ctaHref="/admissions"
              imageSrc={images.courseDetailCta}
              imageAlt="Amber serum bottles"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
