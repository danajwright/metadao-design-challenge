type Props = {
  avgPrice: number;
  market: "pass" | "fail";
  positionBefore: number;
  positionAfter: number;
};

export function TradeStats({ avgPrice, market, positionBefore, positionAfter }: Props) {
  return (
    <div className="flex flex-col gap-1 text-[12px]">
      <div className="flex items-center justify-between">
        <span className="text-text-muted">Average price</span>
        <span className="font-mono text-text-primary">${avgPrice.toFixed(4)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-text-muted">Your &ldquo;{market}&rdquo; position</span>
        <span className="font-mono text-text-secondary">
          {positionBefore.toFixed(2)} P2P{" "}
          <span className="text-text-muted">→</span>{" "}
          {positionAfter.toFixed(2)} P2P
        </span>
      </div>
    </div>
  );
}
