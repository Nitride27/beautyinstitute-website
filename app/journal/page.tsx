"use client";

import { useState } from "react";
import FilterPillGroup from "@/components/filter-pill-group";
import JournalCard from "@/components/journal-card";
import ParallaxImage from "@/components/motion/parallax-image";
import { articles, articleFilters } from "@/content/articles";
import { images } from "@/content/images";
import { copy } from "@/content/copy";

export default function JournalPage() {
  const [active, setActive] = useState<string>("All");
  const visible =
    active === "All" ? articles : articles.filter((a) => a.topic === active);

  return (
    <>
      <section className="mx-auto grid w-full max-w-[1200px] gap-8 px-4 pt-10 md:grid-cols-2 md:items-center md:px-6">
        <div>
          <p className="font-basisgrotesquepro-mono text-[12px] uppercase tracking-[0.056em] text-stone">
            {copy.journalKicker}
          </p>
          <h1 className="mt-2 font-gascognets text-[39px] font-medium leading-[1.1]">
            {copy.journalHeadline}
          </h1>
          <p className="mt-3 max-w-[50ch] font-basis-grotesque-pro text-[16px] leading-[1.3] text-charcoal">
            {copy.journalBody}
          </p>
        </div>
        <ParallaxImage
          src={images.journalHero}
          alt="Beauty products styled with natural light"
          width={800}
          height={600}
        />
      </section>

      <section className="mx-auto mt-[64px] w-full max-w-[1200px] px-4 md:px-6">
        <FilterPillGroup options={articleFilters} active={active} onChange={setActive} />
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((a) => (
            <JournalCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </>
  );
}
