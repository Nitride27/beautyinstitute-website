interface StatBlockProps {
  value: string;
  label: string;
}

export default function StatBlock({ value, label }: StatBlockProps) {
  return (
    <div className="text-center md:text-left">
      <p className="font-gascognets text-[30px] font-medium leading-[1.2]">
        {value}
      </p>
      <p className="mt-1 font-basis-grotesque-pro text-[14px] text-charcoal">
        {label}
      </p>
    </div>
  );
}
