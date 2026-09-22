import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Course } from "@/content/courses";
import { PerspectiveIn } from "@/components/motion/reveal";

export default function CourseRow({ course }: { course: Course }) {
  return (
    <PerspectiveIn>
    <Link
      href={`/courses/${course.slug}`}
      className="group grid grid-cols-[72px_1fr_auto] items-center gap-4 border-b border-mist py-4 md:grid-cols-[120px_1fr_auto_auto_auto]"
    >
      <span className="block overflow-hidden rounded-[0px]">
        <Image
          src={course.thumbnail}
          alt={course.thumbnailAlt}
          width={240}
          height={160}
          className="h-[72px] w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-[80px]"
        />
      </span>
      <span>
        <span className="font-basisgrotesquepro-mono text-[10px] tracking-[0.056em] text-stone">
          {course.index}
        </span>
        <span className="block font-gascognets text-[21px] font-medium leading-[1.2]">
          {course.title}
        </span>
        <span className="mt-1 block font-basis-grotesque-pro text-[13px] text-charcoal">
          {course.duration} &nbsp;|&nbsp; {course.price}
        </span>
      </span>
      <span className="hidden font-basis-grotesque-pro text-[14px] text-charcoal md:block">
        {course.duration}
      </span>
      <span className="hidden font-basis-grotesque-pro text-[14px] text-charcoal md:block">
        {course.price}
      </span>
      <span
        aria-hidden
        className="flex h-8 w-8 items-center justify-center rounded-[999px] border border-ink-black transition-colors group-hover:bg-ink-black group-hover:text-cream-linen"
      >
        <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-[3px]" />
      </span>
    </Link>
    </PerspectiveIn>
  );
}
