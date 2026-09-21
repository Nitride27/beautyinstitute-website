"use client";

import { useState } from "react";
import FilterPillGroup from "@/components/filter-pill-group";
import CourseRow from "@/components/course-row";
import ParallaxImage from "@/components/motion/parallax-image";
import { courses, courseFilters } from "@/content/courses";
import { images } from "@/content/images";
import { copy } from "@/content/copy";

export default function CoursesPage() {
  const [active, setActive] = useState<string>("All");
  const visible =
    active === "All" ? courses : courses.filter((c) => c.filter === active);

  return (
    <>
      <section className="mx-auto grid w-full max-w-[1200px] gap-8 px-4 pt-10 md:grid-cols-2 md:items-center md:px-6">
        <div>
          <p className="font-basisgrotesquepro-mono text-[14px] uppercase tracking-[0.056em] text-coral-pop">
            {copy.coursesEyebrow}
          </p>
          <h1 className="mt-2 font-gascognets text-[39px] font-medium leading-[1.1]">
            {copy.coursesHeadline}
          </h1>
          <p className="mt-3 max-w-[50ch] font-basis-grotesque-pro text-[16px] leading-[1.3] text-charcoal">
            {copy.coursesBody}
          </p>
        </div>
        <ParallaxImage
          src={images.coursesHero}
          alt="Stylists at work in a beauty salon"
          width={800}
          height={600}
        />
      </section>

      <section className="mx-auto mt-[64px] w-full max-w-[1200px] px-4 md:px-6">
        <FilterPillGroup options={courseFilters} active={active} onChange={setActive} />
        <div className="mt-6 border-t border-mist">
          {visible.map((c) => (
            <CourseRow key={c.slug} course={c} />
          ))}
        </div>
      </section>
    </>
  );
}
