import { Award, Clock, BarChart3, Layers } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

interface CourseMetaGridProps {
  duration: string;
  level: string;
  mode: string;
  certificate: string;
}

const rows = [
  { icon: Clock, label: "Duration" },
  { icon: BarChart3, label: "Level" },
  { icon: Layers, label: "Mode" },
  { icon: Award, label: "Certificate" },
] as const;

export default function CourseMetaGrid({ duration, level, mode, certificate }: CourseMetaGridProps) {
  const values = [duration, level, mode, certificate];
  return (
    <Reveal>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {rows.map((r, i) => (
        <div key={r.label} className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[999px] border border-ink-black">
            <r.icon size={15} strokeWidth={1.5} />
          </span>
          <span>
            <dt className="font-basis-grotesque-pro text-[13px] text-stone">
              {r.label}
            </dt>
            <dd className="font-basis-grotesque-pro text-[14px] text-ink-black">
              {values[i]}
            </dd>
          </span>
        </div>
        ))}
      </dl>
    </Reveal>
  );
}
