"use client";

import { useTradeStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ApproveTwapBar() {
  const { approveState, setApproveState } = useTradeStore();

  return (
    <div className="flex items-center gap-2 px-6 py-3 border-t border-brand-border bg-bg-surface">
      <button
        onClick={() =>
          setApproveState(approveState === "approved" ? "pending" : "approved")
        }
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-150 active:scale-[0.98]",
          approveState === "approved"
            ? "bg-green-100 text-green-700 border border-green-300 hover:bg-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900"
            : "bg-bg-surface-2 text-text-secondary border border-brand-border hover:bg-muted"
        )}
      >
        <span
          className={cn(
            "size-1.5 rounded-full",
            approveState === "approved" ? "bg-green-500" : "bg-text-muted"
          )}
        />
        APPROVED
      </button>

      <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 transition-all duration-150 active:scale-[0.98] dark:bg-red-950 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900">
        ▲ FAIL
      </button>

      <span className="ml-auto text-[11px] text-text-muted">APPROVE TWAP</span>
    </div>
  );
}
