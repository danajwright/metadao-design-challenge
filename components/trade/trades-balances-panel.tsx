"use client";

import { useState } from "react";
import { TradeTypeChip } from "@/components/ui/trade-type-chip";
import { cn } from "@/lib/utils";
import type { Trade, Balances } from "@/lib/types";

type Props = {
  trades: Trade[];
  balances: Balances;
};

function MarketPill({ market }: { market: "pass" | "fail" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium capitalize",
        market === "pass"
          ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
          : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
      )}
    >
      {market}
    </span>
  );
}

export function TradesBalancesPanel({ trades, balances }: Props) {
  const [tab, setTab] = useState<"trades" | "balances">("trades");

  return (
    <div className="flex flex-col border-t border-brand-border">
      {/* Tab bar */}
      <div className="flex border-b border-brand-border">
        {(["trades", "balances"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 py-2 text-xs font-semibold capitalize transition-colors duration-150 relative",
              tab === t
                ? "text-text-primary"
                : "text-text-muted hover:text-text-primary"
            )}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
            {tab === t && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold rounded-t" />
            )}
          </button>
        ))}
      </div>

      {tab === "trades" && (
        <div className="overflow-y-auto max-h-72">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-brand-border bg-bg-surface-2 sticky top-0">
                {["TYPE", "MARKET", "PRICE", "SIZE", "TIME"].map((h) => (
                  <th
                    key={h}
                    className="px-2 py-1.5 text-left font-semibold uppercase tracking-wide text-text-muted"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, i) => (
                <tr
                  key={trade.id}
                  className={cn(
                    "h-7 border-b border-brand-border/50 hover:bg-bg-surface-2/50 transition-colors",
                    i % 2 === 0 ? "" : "bg-bg-surface-2/30"
                  )}
                >
                  <td className="px-2">
                    <TradeTypeChip type={trade.type} />
                  </td>
                  <td className="px-2">
                    <MarketPill market={trade.market} />
                  </td>
                  <td className="px-2 font-mono text-text-primary text-right">
                    ${trade.price.toFixed(3)}
                  </td>
                  <td className="px-2 font-mono text-text-secondary text-right">
                    {trade.size.toFixed(2)}
                  </td>
                  <td className="px-2 font-mono text-text-muted text-right">
                    {trade.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "balances" && (
        <div className="flex flex-col gap-0 divide-y divide-brand-border">
          {[
            { label: "USDC", value: `$${balances.usdc.toFixed(2)}`, sublabel: "Available" },
            { label: "PASS", value: `${balances.pass.toFixed(4)} P2P`, sublabel: "Conditional tokens" },
            { label: "FAIL", value: `${balances.fail.toFixed(4)} P2P`, sublabel: "Conditional tokens" },
          ].map(({ label, value, sublabel }) => (
            <div key={label} className="flex items-center justify-between px-3 py-2.5">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-text-primary">{label}</span>
                <span className="text-[10px] text-text-muted">{sublabel}</span>
              </div>
              <span className="font-mono text-sm font-semibold text-text-primary">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
