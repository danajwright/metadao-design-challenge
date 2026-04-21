type Props = {
  open: number;
  high: number;
  low: number;
  close: number;
};

export function OHLCStrip({ open, high, low, close }: Props) {
  const items = [
    { label: "OPEN", value: open },
    { label: "HIGH", value: high },
    { label: "LOW", value: low },
    { label: "CLOSE", value: close },
  ];
  return (
    <div className="flex items-center gap-4 px-6 py-1.5 border-t border-brand-border bg-bg-surface">
      {items.map(({ label, value }) => (
        <span key={label} className="flex items-center gap-1 text-[11px]">
          <span className="text-text-muted font-medium">{label}</span>
          <span className="font-mono text-text-primary">${value.toFixed(4)}</span>
        </span>
      ))}
    </div>
  );
}
