"use client";

import { cn } from "@/lib/utils";

const PRESETS = [500, 1000, 2500] as const;

type Props = {
  usdcBalance: number;
  onSelect: (amount: string) => void;
};

export function QuickAmountSelector({ usdcBalance, onSelect }: Props) {
  return (
    <div className="flex gap-1.5">
      {PRESETS.map((amount) => (
        <button
          key={amount}
          onClick={() => onSelect(String(amount))}
          className="flex-1 rounded-full border border-brand-border bg-bg-surface py-1 text-[11px] font-medium text-text-secondary hover:border-accent-gold hover:text-accent-gold hover:bg-accent-gold/5 transition-all duration-150 active:scale-[0.97]"
        >
          {amount >= 1000 ? `$${amount / 1000}K` : `$${amount}`}
        </button>
      ))}
      <button
        onClick={() => onSelect(String(Math.floor(usdcBalance)))}
        className="flex-1 rounded-full border border-brand-border bg-bg-surface py-1 text-[11px] font-medium text-text-secondary hover:border-accent-gold hover:text-accent-gold hover:bg-accent-gold/5 transition-all duration-150 active:scale-[0.97]"
      >
        Max
      </button>
    </div>
  );
}
