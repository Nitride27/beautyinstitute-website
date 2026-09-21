import Image from "next/image";
import Link from "next/link";

interface CategoryCircleProps {
  label: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
}

/** Mock-faithful "Find Your Path" thumbnail: portrait, softly rounded, label + Learn More. */
export default function CategoryCircle({
  label,
  imageSrc,
  imageAlt,
  href = "/courses",
}: CategoryCircleProps) {
  return (
    <Link href={href} className="group flex w-full flex-col items-start">
      <span className="block aspect-[3/4] w-full overflow-hidden rounded-[10px] transition-transform duration-500 group-hover:scale-[1.03]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}
          height={520}
          className="h-full w-full object-cover"
        />
      </span>
      <span className="mt-3 font-basis-grotesque-pro text-[14px] text-ink-black">
        {label}
      </span>
      <span className="font-basis-grotesque-pro text-[13px] text-terracotta-whisper">
        Learn More →
      </span>
    </Link>
  );
}
