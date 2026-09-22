import type { LucideIcon } from "lucide-react";

interface ContactMethodRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

export default function ContactMethodRow({ icon: Icon, label, value, href }: ContactMethodRowProps) {
  const inner = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[999px] border border-ink-black">
        <Icon size={17} strokeWidth={1.5} />
      </span>
      <span>
        <span className="block font-basis-grotesque-pro text-[13px] text-stone">
          {label}
        </span>
        <span className="block font-basis-grotesque-pro text-[14px] text-ink-black group-hover:underline group-hover:underline-offset-4">
          {value}
        </span>
      </span>
    </>
  );
  return href ? (
    <a href={href} className="group flex items-center gap-3">
      {inner}
    </a>
  ) : (
    <div className="flex items-center gap-3">{inner}</div>
  );
}
