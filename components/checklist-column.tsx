import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export default function ChecklistColumn({ items }: { items: string[] }) {
  return (
    <Reveal>
      <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-[999px] border border-ink-black">
            <Check size={12} strokeWidth={2} />
          </span>
          <span className="font-basis-grotesque-pro text-[16px]">{item}</span>
        </li>
        ))}
      </ul>
    </Reveal>
  );
}
