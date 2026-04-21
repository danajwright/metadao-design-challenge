"use client";

type Props = {
  value: string;
  usdcBalance: number;
  onChange: (v: string) => void;
};

export function AmountInput({ value, usdcBalance, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-end">
        <span className="text-[11px] text-text-muted font-mono">
          USDC bal: ${usdcBalance.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center border border-brand-border rounded-md bg-bg-surface focus-within:border-accent-gold focus-within:ring-1 focus-within:ring-accent-gold/30 transition-all h-9">
        <span className="pl-3 text-text-muted text-sm font-mono">$</span>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm font-mono text-text-primary placeholder:text-text-muted outline-none px-2 py-1.5 h-full"
        />
      </div>
    </div>
  );
}
