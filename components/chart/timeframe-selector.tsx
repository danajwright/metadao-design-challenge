"use client";

import { cn } from "@/lib/utils";

const TIMEFRAMES = ["1H", "4H", "1D", "MAX"] as const;
export type Timeframe = (typeof TIMEFRAMES)[number];

type Props = {
  value: Timeframe;
  onChange: (v: Timeframe) => void;
};

export function TimeframeSelector({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-0.5">
      {TIMEFRAMES.map((tf) => (
        <button
          key={tf}
          onClick={() => onChange(tf)}
          className={cn(
            "px-2 py-0.5 rounded text-[11px] font-semibold transition-colors duration-150",
            value === tf
              ? "bg-accent-gold text-white"
              : "text-text-muted hover:text-text-primary hover:bg-bg-surface-2"
          )}
        >
          {tf}
        </button>
      ))}
    </div>
  );
}
