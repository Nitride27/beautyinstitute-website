import { notFound } from "next/navigation";
import RelatedArticleRow from "@/components/related-article-row";
import ParallaxImage from "@/components/motion/parallax-image";
import { articles, getArticle } from "@/content/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = article.related
    .map((s) => articles.find((a) => a.slug === s))
    .filter((a) => a !== undefined);

  return (
    <article className="mx-auto w-full max-w-[1200px] px-4 pt-10 md:px-6">
      <p className="font-basisgrotesquepro-mono text-[12px] uppercase tracking-[0.056em] text-coral-pop">
        {article.topic}
      </p>
      <h1 className="mt-2 max-w-[20ch] font-gascognets text-[39px] font-medium leading-[1.1]">
        {article.title}
      </h1>
      <p className="mt-2 font-basis-grotesque-pro text-[14px] text-stone">
        {article.date} · {article.readTime}
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_280px]">
        <div>
          <ParallaxImage
            src={article.thumbnail}
            alt={article.thumbnailAlt}
            width={1000}
            height={700}
          />
          <div className="mt-6 max-w-[70ch] space-y-4">
            {article.body.map((para, i) => (
              <p
                key={i}
                className="font-basis-grotesque-pro text-[16px] leading-[1.5] text-charcoal"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
        <aside>
          <h2 className="font-gascognets text-[21px] font-medium">
            Related Articles
          </h2>
          <div className="mt-4 space-y-4">
            {related.map((r) => (
              <RelatedArticleRow key={r.slug} article={r} />
            ))}
          </div>
        </aside>
      </div>
    </article>
  );
}
