import Image from "next/image";

interface TrainerCardProps {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
}

export default function TrainerCard({ name, role, imageSrc, imageAlt }: TrainerCardProps) {
  return (
    <article>
      <div className="overflow-hidden rounded-[0px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}
          height={480}
          className="h-auto w-full object-cover"
        />
      </div>
      <h3 className="mt-3 font-basis-grotesque-pro text-[16px]">{name}</h3>
      <p className="font-basis-grotesque-pro text-[14px] text-charcoal">{role}</p>
    </article>
  );
}
