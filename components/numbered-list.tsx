import { Reveal } from "@/components/motion/reveal";

export default function NumberedList({ items }: { items: string[] }) {
  return (
    <Reveal>
      <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[999px] border border-terracotta-whisper font-basisgrotesquepro-mono text-[12px] text-terracotta-whisper">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-basis-grotesque-pro text-[16px]">{item}</span>
        </li>
        ))}
      </ol>
    </Reveal>
  );
}
