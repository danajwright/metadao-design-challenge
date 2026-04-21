"use client";

import { cn } from "@/lib/utils";

type Props = {
  direction: "buy" | "sell";
  buyPrice: number;
  sellPrice: number;
  market: "pass" | "fail";
  onChange: (d: "buy" | "sell") => void;
};

export function BuySellToggle({ direction, buyPrice, sellPrice, market, onChange }: Props) {
  const activeColor =
    market === "pass"
      ? "bg-green-600 text-white hover:bg-green-700"
      : "bg-red-600 text-white hover:bg-red-700";

  return (
    <div className="flex rounded-md overflow-hidden border border-brand-border">
      <button
        onClick={() => onChange("buy")}
        className={cn(
          "flex-1 flex flex-col items-center py-2 text-xs font-semibold transition-all duration-150 active:scale-[0.98]",
          direction === "buy"
            ? activeColor
            : "bg-bg-surface text-text-secondary hover:bg-bg-surface-2"
        )}
      >
        <span className="text-[10px] uppercase tracking-wide opacity-70">Buy</span>
        <span className="font-mono text-sm">${buyPrice.toFixed(4)}</span>
      </button>
      <div className="w-px bg-brand-border" />
      <button
        onClick={() => onChange("sell")}
        className={cn(
          "flex-1 flex flex-col items-center py-2 text-xs font-semibold transition-all duration-150 active:scale-[0.98]",
          direction === "sell"
            ? "bg-gray-700 text-white hover:bg-gray-800"
            : "bg-bg-surface text-text-secondary hover:bg-bg-surface-2"
        )}
      >
        <span className="text-[10px] uppercase tracking-wide opacity-70">Sell</span>
        <span className="font-mono text-sm">${sellPrice.toFixed(4)}</span>
      </button>
    </div>
  );
}
