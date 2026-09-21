import { images } from "./images";

export type ArticleTopic = "Skincare" | "Makeup" | "Hair" | "Career";

export interface Article {
  slug: string;
  title: string;
  topic: ArticleTopic;
  date: string;
  readTime: string;
  thumbnail: string;
  thumbnailAlt: string;
  excerpt: string;
  body: string[];
  related: string[];
}

export const articleFilters = ["All", "Skincare", "Makeup", "Hair", "Career"] as const;

export const articles: Article[] = [
  {
    slug: "choose-right-beauty-course",
    title: "How to Choose the Right Beauty Course for You",
    topic: "Career",
    date: "Apr 18, 2026",
    readTime: "5 min read",
    thumbnail: images.journalThumbChoose,
    thumbnailAlt: "Beauty portrait in blue light",
    excerpt:
      "Choosing the right beauty course is an important step in building your career. Here are a few factors to consider before making your decision.",
    body: [
      "Choosing the right beauty course is an important step in building your career. With so many options available, it can feel overwhelming. Here are a few factors to consider before making your decision.",
      "1. Know Your Passion — Start by thinking about what excites you most — skincare, makeup, hair, nails, or overall wellness. Your passion will keep you motivated throughout the journey.",
      "2. Check the Curriculum — A good course balances theory with hands-on practice. Look for real client work, small class sizes and trainers who still work in the industry.",
      "3. Think About Your Future — Do you see yourself in a salon, running your own studio, or freelancing for shoots and weddings? Pick the course whose career paths match your goals.",
    ],
    related: ["skincare-habits", "makeup-looks", "career-opportunities"],
  },
  {
    slug: "skincare-habits",
    title: "5 Skincare Habits for Healthy, Glowing Skin",
    topic: "Skincare",
    date: "Apr 21, 2026",
    readTime: "4 min read",
    thumbnail: images.journalThumbHabits,
    thumbnailAlt: "Hands with healthy natural skin",
    excerpt:
      "Small daily habits — cleansing, moisturizing, sun protection — that keep skin healthy and glowing.",
    body: [
      "Healthy skin is built on small daily habits, not expensive miracles. Cleanse gently, moisturize consistently, protect from the sun every day, never sleep in makeup, and drink water like it is part of your routine — because it is.",
    ],
    related: ["choose-right-beauty-course", "makeup-looks", "career-opportunities"],
  },
  {
    slug: "makeup-looks",
    title: "Makeup Looks for Every Occasion",
    topic: "Makeup",
    date: "Apr 19, 2026",
    readTime: "4 min read",
    thumbnail: images.journalThumbMakeup,
    thumbnailAlt: "Makeup brushes and eyeshadow palette",
    excerpt:
      "From soft daytime looks to full bridal glam — a guide to matching your makeup to the moment.",
    body: [
      "Every occasion asks for a different face. Keep daytime soft and skin-like, build depth for evenings, and go full glam for bridal — always starting with well-prepped skin.",
    ],
    related: ["skincare-habits", "choose-right-beauty-course", "career-opportunities"],
  },
  {
    slug: "career-opportunities",
    title: "Career Opportunities",
    topic: "Career",
    date: "Apr 16, 2026",
    readTime: "3 min read",
    thumbnail: images.journalThumbCareer,
    thumbnailAlt: "Makeup brush set",
    excerpt:
      "Where an Éclat certificate can take you — salons, spas, freelance, and your own studio.",
    body: [
      "A beauty qualification opens more doors than most people expect: salons, spas, wellness centers, bridal freelancing, content creation — or your very own studio.",
    ],
    related: ["choose-right-beauty-course", "skincare-habits", "makeup-looks"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
