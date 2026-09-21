import Image from "next/image";
import { MapPin } from "lucide-react";
import { images } from "@/content/images";
import { copy } from "@/content/copy";

/** Embedded OSM map + interior photo. Sharp corners per card token. */
export default function MapCard() {
  return (
    <div>
      <div className="overflow-hidden rounded-[0px] border border-mist">
        <iframe
          title="Map — Éclat Beauty Institute, Thamel Kathmandu"
          src="https://www.openstreetmap.org/export/embed.html?bbox=85.3000%2C27.7080%2C85.3180%2C27.7230&layer=mapnik&marker=27.7155%2C85.3090"
          className="h-[240px] w-full"
          loading="lazy"
        />
      </div>
      <div className="mt-4 grid grid-cols-[1fr_120px] items-center gap-4">
        <div>
          <p className="font-basis-grotesque-pro text-[14px]">{copy.visitInstitute}</p>
          <p className="mt-1 flex items-center gap-1 font-basis-grotesque-pro text-[13px] text-stone">
            <MapPin size={13} strokeWidth={1.5} /> {copy.visitInstituteValue}
          </p>
        </div>
        <span className="block overflow-hidden rounded-[0px]">
          <Image
            src={images.admissionsInterior}
            alt="Botanical beauty flatlay"
            width={240}
            height={180}
            className="h-[90px] w-full object-cover"
          />
        </span>
      </div>
    </div>
  );
}
