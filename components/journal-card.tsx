import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/content/articles";
import { PerspectiveIn } from "@/components/motion/reveal";

export default function JournalCard({ article }: { article: Article }) {
  return (
    <PerspectiveIn>
    <Link href={`/journal/${article.slug}`} className="group block">
      <span className="block overflow-hidden rounded-[0px]">
        <Image
          src={article.thumbnail}
          alt={article.thumbnailAlt}
          width={600}
          height={420}
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </span>
      <span className="mt-3 block font-gascognets text-[21px] font-medium leading-[1.2]">
        {article.title}
      </span>
      <span className="mt-1 block font-basis-grotesque-pro text-[13px] text-stone">
        {article.date}
      </span>
      <span className="mt-2 block font-basis-grotesque-pro text-[14px] text-terracotta-whisper transition-colors group-hover:text-ink-black">
        Read More →
      </span>
    </Link>
    </PerspectiveIn>
  );
}
