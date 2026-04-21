"use client";

import { cn } from "@/lib/utils";

type Props = {
  value: "pass" | "fail";
  onChange: (v: "pass" | "fail") => void;
};

export function TradeSideTabs({ value, onChange }: Props) {
  return (
    <div className="flex border-b border-brand-border">
      {(["pass", "fail"] as const).map((side) => (
        <button
          key={side}
          onClick={() => onChange(side)}
          className={cn(
            "flex-1 py-2.5 text-sm font-semibold transition-colors duration-150 relative",
            value === side
              ? side === "pass"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
              : "text-text-muted hover:text-text-primary"
          )}
        >
          If &ldquo;{side === "pass" ? "Pass" : "Fail"}&rdquo;
          {value === side && (
            <span
              className={cn(
                "absolute bottom-0 left-0 right-0 h-0.5 rounded-t",
                side === "pass" ? "bg-green-500" : "bg-red-500"
              )}
            />
          )}
        </button>
      ))}
    </div>
  );
}
