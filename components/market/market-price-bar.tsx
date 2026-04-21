import { Activity } from "lucide-react";
import { PriceChangeChip } from "@/components/ui/price-change-chip";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { formatUSD } from "@/lib/format";
import type { ConditionalMarket } from "@/lib/types";

type Props = {
  passMarket: ConditionalMarket;
  failMarket: ConditionalMarket;
  spotPrice: number;
  spotMarketCap: number;
};

function MarketRow({
  label,
  icon,
  iconColor,
  price,
  pct,
  marketCap,
  showPct = true,
}: {
  label: string;
  icon: React.ReactNode;
  iconColor: string;
  price: number;
  pct?: number;
  marketCap: number;
  showPct?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5 px-2 py-2.5 hover:bg-bg-surface-2 transition-colors cursor-default border-b border-brand-border last:border-b-0">
      <div className="flex items-center gap-1 text-[10px] font-medium text-text-secondary uppercase tracking-wide">
        <span className={iconColor}>{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      <div className="flex items-center justify-between gap-1">
        {showPct && pct !== undefined ? (
          <PriceChangeChip pct={pct} />
        ) : (
          <span className="text-[10px] text-text-muted">SPOT</span>
        )}
      </div>
      <Tooltip>
        <TooltipTrigger>
          <span className="font-mono text-[13px] font-semibold text-text-primary text-left">
            ${price.toFixed(4)}
          </span>
        </TooltipTrigger>
        <TooltipContent side="left">Current price</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <span className="font-mono text-[10px] text-text-muted text-left">
            {formatUSD(marketCap, true)}
          </span>
        </TooltipTrigger>
        <TooltipContent side="left">{formatUSD(marketCap)} market cap</TooltipContent>
      </Tooltip>
    </div>
  );
}

export function MarketPriceBar({ passMarket, failMarket, spotPrice, spotMarketCap }: Props) {
  return (
    <div className="flex flex-col border-l border-brand-border bg-bg-surface">
      <div className="px-2 py-2 border-b border-brand-border">
        <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
          P2P-USDC
        </span>
      </div>

      <MarketRow
        label="PASS"
        icon={<span className="size-2 rounded-full bg-green-500 inline-block" />}
        iconColor="text-green-600"
        price={passMarket.price}
        pct={passMarket.priceChange24h}
        marketCap={passMarket.marketCap}
        showPct
      />
      <MarketRow
        label="SPOT"
        icon={<Activity className="size-2.5" />}
        iconColor="text-text-muted"
        price={spotPrice}
        marketCap={spotMarketCap}
        showPct={false}
      />
      <MarketRow
        label="FAIL"
        icon={<span className="size-2 rounded-full bg-red-500 inline-block" />}
        iconColor="text-red-600"
        price={failMarket.price}
        pct={failMarket.priceChange24h}
        marketCap={failMarket.marketCap}
        showPct
      />
    </div>
  );
}
