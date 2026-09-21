import type { LucideIcon } from "lucide-react";

interface IconFeatureProps {
  icon: LucideIcon;
  title: string;
  body: string;
}

export default function IconFeature({ icon: Icon, title, body }: IconFeatureProps) {
  return (
    <div>
      <span className="flex h-10 w-10 items-center justify-center rounded-[999px] border border-ink-black">
        <Icon size={18} strokeWidth={1.5} />
      </span>
      <h3 className="mt-3 font-basis-grotesque-pro text-[16px] text-ink-black">
        {title}
      </h3>
      <p className="mt-1 font-basis-grotesque-pro text-[14px] leading-[1.3] text-charcoal">
        {body}
      </p>
    </div>
  );
}
