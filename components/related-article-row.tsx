import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/content/articles";
import { Reveal } from "@/components/motion/reveal";

export default function RelatedArticleRow({ article }: { article: Article }) {
  return (
    <Reveal>
      <Link href={`/journal/${article.slug}`} className="group flex items-center gap-3">
      <span className="block h-14 w-14 shrink-0 overflow-hidden rounded-[0px]">
        <Image
          src={article.thumbnail}
          alt={article.thumbnailAlt}
          width={112}
          height={112}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </span>
      <span>
        <span className="block font-basis-grotesque-pro text-[14px] leading-[1.3] transition-colors group-hover:underline group-hover:underline-offset-4">
          {article.title}
        </span>
        <span className="mt-[2px] block font-basis-grotesque-pro text-[12px] text-stone">
          {article.date}
        </span>
      </span>
      </Link>
    </Reveal>
  );
}
