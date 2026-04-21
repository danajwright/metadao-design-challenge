type Props = {
  failValue: number;
  passValue: number;
};

export function PositionSummary({ failValue, passValue }: Props) {
  return (
    <div className="flex items-center rounded-md border border-brand-border overflow-hidden">
      <div className="flex-1 flex flex-col items-start px-3 py-2 border-r border-brand-border">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
          FAIL
        </span>
        <span className="font-mono text-sm font-semibold text-red-600 dark:text-red-400">
          ${failValue.toFixed(2)}
        </span>
      </div>
      <div className="flex-1 flex flex-col items-end px-3 py-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
          PASS
        </span>
        <span className="font-mono text-sm font-semibold text-green-600 dark:text-green-400">
          {passValue.toFixed(2)} P2P
        </span>
      </div>
    </div>
  );
}
