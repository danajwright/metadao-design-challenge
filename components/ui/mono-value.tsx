import { cn } from "@/lib/utils";

type Props = {
  value: number;
  prefix?: string;
  decimals?: number;
  className?: string;
};

export function MonoValue({ value, prefix = "", decimals = 4, className }: Props) {
  const formatted = value.toFixed(decimals);
  const dotIdx = formatted.indexOf(".");
  const integer = dotIdx === -1 ? formatted : formatted.slice(0, dotIdx + 3);
  const trailing = dotIdx === -1 ? "" : formatted.slice(dotIdx + 3);

  return (
    <span className={cn("font-mono", className)}>
      {prefix}
      {integer}
      {trailing && (
        <span className="opacity-40">{trailing}</span>
      )}
    </span>
  );
}
