import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProposalStatus } from "@/lib/types";

const configs: Record<
  ProposalStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  passed: {
    label: "Passed",
    icon: <CheckCircle2 className="size-3.5" />,
    className: "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800",
  },
  failed: {
    label: "Failed",
    icon: <XCircle className="size-3.5" />,
    className: "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800",
  },
  active: {
    label: "Active",
    icon: (
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-blue-500" />
      </span>
    ),
    className: "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950 dark:border-blue-800",
  },
  pending: {
    label: "Pending",
    icon: <Clock className="size-3.5" />,
    className: "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950 dark:border-amber-800",
  },
};

export function StatusBadge({ status }: { status: ProposalStatus }) {
  const { label, icon, className } = configs[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        className
      )}
    >
      {icon}
      {label}
    </span>
  );
}
