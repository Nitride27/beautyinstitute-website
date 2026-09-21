import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  name: string;
  avatarSrc: string;
  avatarAlt: string;
}

export default function TestimonialCard({ quote, name, avatarSrc, avatarAlt }: TestimonialCardProps) {
  return (
    <figure className="rounded-[0px] border border-mist bg-pure-white p-[20px]">
      <div className="flex items-center gap-3">
        <span className="block h-12 w-12 overflow-hidden rounded-[999px] border border-ink-black">
          <Image
            src={avatarSrc}
            alt={avatarAlt}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </span>
        <figcaption className="font-basis-grotesque-pro text-[14px]">
          {name}
        </figcaption>
      </div>
      <blockquote className="mt-4 font-gascognets text-[21px] leading-[1.3]">
        “{quote}”
      </blockquote>
    </figure>
  );
}
