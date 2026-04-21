"use client";

import { cn } from "@/lib/utils";

type Props = {
  amount: string;
  market: "pass" | "fail";
  direction: "buy" | "sell";
  onConfirm: () => void;
};

export function ConfirmTradeButton({ amount, market, direction, onConfirm }: Props) {
  const hasAmount = parseFloat(amount) > 0;

  const activeClass =
    direction === "buy"
      ? market === "pass"
        ? "bg-green-600 hover:bg-green-700 text-white"
        : "bg-red-600 hover:bg-red-700 text-white"
      : "bg-gray-700 hover:bg-gray-800 text-white";

  return (
    <button
      onClick={hasAmount ? onConfirm : undefined}
      disabled={!hasAmount}
      className={cn(
        "w-full h-11 rounded-md text-sm font-semibold transition-all duration-150 active:scale-[0.99]",
        hasAmount
          ? activeClass
          : "bg-red-100 text-red-300 cursor-not-allowed dark:bg-red-950/40 dark:text-red-700"
      )}
    >
      Confirm trade
    </button>
  );
}
