import { images } from "./images";

export type CourseCategory = "Skincare" | "Makeup" | "Hair" | "Nails" | "Wellness" | "Complete";

export interface Course {
  slug: string;
  index: string;
  title: string;
  category: CourseCategory;
  filter: "Skincare" | "Makeup" | "Hair" | "Wellness" | "All";
  duration: string;
  price: string;
  level: string;
  mode: string;
  certificate: string;
  thumbnail: string;
  thumbnailAlt: string;
  tagline: string;
  learn: string[];
  structure: string[];
  career: string;
}

export const courseFilters = ["All", "Skincare", "Makeup", "Hair", "Wellness"] as const;

export const courses: Course[] = [
  {
    slug: "professional-skincare",
    index: "01",
    title: "Professional Skincare",
    category: "Skincare",
    filter: "Skincare",
    duration: "3 Months",
    price: "NPR 120,000",
    level: "Beginner → Professional",
    mode: "Practical + Theory",
    certificate: "Yes",
    thumbnail: images.courseThumbSkincare,
    thumbnailAlt: "Close-up of an eyebrow shaping treatment",
    tagline: "Learn the science, technique and artistry behind professional skincare.",
    learn: [
      "Skin analysis",
      "Cleansing techniques",
      "Facial treatments",
      "Product knowledge",
      "Client consultation",
      "Professional hygiene",
    ],
    structure: [
      "Fundamentals",
      "Skin Analysis",
      "Treatment Techniques",
      "Advanced Practice",
      "Client Work",
      "Assessment",
    ],
    career:
      "Work in salons, spas, wellness centers or start your own business as a professional skincare expert.",
  },
  {
    slug: "makeup-artistry",
    index: "02",
    title: "Makeup Artistry",
    category: "Makeup",
    filter: "Makeup",
    duration: "3 Months",
    price: "NPR 100,000",
    level: "Beginner → Professional",
    mode: "Practical + Theory",
    certificate: "Yes",
    thumbnail: images.courseThumbMakeup,
    thumbnailAlt: "Hands holding an eyeshadow palette",
    tagline: "Master bridal, editorial and everyday makeup artistry.",
    learn: [
      "Color theory",
      "Bridal makeup",
      "Editorial looks",
      "Skin preparation",
      "Client consultation",
      "Kit hygiene",
    ],
    structure: [
      "Fundamentals",
      "Skin Prep & Base",
      "Bridal Artistry",
      "Editorial & Creative",
      "Client Work",
      "Assessment",
    ],
    career:
      "Work as a bridal artist, salon professional or freelance makeup artist for shoots and events.",
  },
  {
    slug: "hair-design",
    index: "03",
    title: "Hair Design",
    category: "Hair",
    filter: "Hair",
    duration: "3 Months",
    price: "NPR 100,000",
    level: "Beginner → Professional",
    mode: "Practical + Theory",
    certificate: "Yes",
    thumbnail: images.courseThumbHair,
    thumbnailAlt: "Hair mask treatment product",
    tagline: "Cutting, coloring and styling — the complete hair foundation.",
    learn: [
      "Hair science",
      "Precision cutting",
      "Coloring techniques",
      "Styling & finishing",
      "Client consultation",
      "Salon hygiene",
    ],
    structure: [
      "Fundamentals",
      "Cutting",
      "Color",
      "Styling",
      "Client Work",
      "Assessment",
    ],
    career:
      "Work in top salons as a stylist or colorist, or build your own chair and clientele.",
  },
  {
    slug: "nail-artistry",
    index: "04",
    title: "Nail Artistry",
    category: "Nails",
    filter: "Skincare",
    duration: "2 Months",
    price: "NPR 80,000",
    level: "Beginner → Professional",
    mode: "Practical + Theory",
    certificate: "Yes",
    thumbnail: images.courseThumbNails,
    thumbnailAlt: "Manicured hand with neutral polish",
    tagline: "Manicure, extensions and nail art, from classic to creative.",
    learn: [
      "Nail anatomy",
      "Manicure & pedicure",
      "Gel & acrylics",
      "Nail art design",
      "Client consultation",
      "Salon hygiene",
    ],
    structure: [
      "Fundamentals",
      "Manicure & Pedicure",
      "Extensions",
      "Nail Art",
      "Client Work",
      "Assessment",
    ],
    career:
      "Work in nail studios and salons, or start your own nail art business with a loyal client base.",
  },
  {
    slug: "beauty-wellness",
    index: "05",
    title: "Beauty & Wellness",
    category: "Wellness",
    filter: "Wellness",
    duration: "2 Months",
    price: "NPR 90,000",
    level: "Beginner → Professional",
    mode: "Practical + Theory",
    certificate: "Yes",
    thumbnail: images.courseThumbWellness,
    thumbnailAlt: "Body lotion product",
    tagline: "Holistic beauty, massage basics and wellness rituals.",
    learn: [
      "Wellness foundations",
      "Massage basics",
      "Aromatherapy",
      "Relaxation rituals",
      "Client care",
      "Professional hygiene",
    ],
    structure: [
      "Fundamentals",
      "Wellness Theory",
      "Massage Basics",
      "Rituals & Care",
      "Client Work",
      "Assessment",
    ],
    career:
      "Work in spas and wellness centers, or offer holistic beauty services as an independent practitioner.",
  },
  {
    slug: "complete-beauty-program",
    index: "06",
    title: "Complete Beauty Program",
    category: "Complete",
    filter: "All",
    duration: "6 Months",
    price: "NPR 250,000",
    level: "Beginner → Professional",
    mode: "Practical + Theory",
    certificate: "Yes",
    thumbnail: images.courseThumbComplete,
    thumbnailAlt: "Pink beauty product collection",
    tagline: "The full journey — skincare, makeup, hair, nails and wellness in one program.",
    learn: [
      "Skincare essentials",
      "Makeup artistry",
      "Hair fundamentals",
      "Nail care",
      "Wellness basics",
      "Salon business skills",
    ],
    structure: [
      "Skincare",
      "Makeup",
      "Hair",
      "Nails & Wellness",
      "Client Work",
      "Final Assessment",
    ],
    career:
      "Graduate as an all-round beauty professional ready for salons, spas, or your own studio.",
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
