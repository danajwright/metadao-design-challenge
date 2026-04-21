import { cn } from "@/lib/utils";

export function TradeTypeChip({ type }: { type: "buy" | "sell" }) {
  return (
    <span
      className={cn(
        "text-xs font-medium capitalize",
        type === "buy"
          ? "text-green-600 dark:text-green-400"
          : "text-red-600 dark:text-red-400"
      )}
    >
      {type}
    </span>
  );
}
