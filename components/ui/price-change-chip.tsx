import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function PriceChangeChip({ pct }: { pct: number }) {
  const positive = pct >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-[10px] font-medium font-mono",
        positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
      )}
    >
      {positive ? (
        <TrendingUp className="size-2.5" />
      ) : (
        <TrendingDown className="size-2.5" />
      )}
      {Math.abs(pct).toFixed(2)}%
    </span>
  );
}
