import type { Proposal } from "@/lib/types";

export function ProposalResultsCard({ proposal }: { proposal: Proposal }) {
  const colClass = "grid grid-cols-[1fr_82px_90px_92px] items-center px-px";
  const cellClass = "font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f7e7d3] leading-5 text-left whitespace-nowrap";

  return (
    <div className="flex flex-col items-start">
      {/* Header */}
      <div className="flex h-[76px] items-start py-6 w-full">
        <span className="flex-1 text-[18px] text-[#f7e7d3] leading-7">
          Proposal results
        </span>
      </div>

      {/* Table */}
      <div className="flex flex-col w-full">
        {/* Column headers */}
        <div className={`${colClass} border-b border-[#312d2a] py-[5px]`}>
          <span className="text-[12px] text-[#a99986] leading-[15px] tracking-[1px] uppercase whitespace-nowrap py-3">
            P2P-USDC
          </span>
          <span className="text-[12px] text-[#a99986] leading-5 text-left whitespace-nowrap">%</span>
          <span className="text-[12px] text-[#a99986] leading-5 text-left whitespace-nowrap">Price</span>
          <span className="text-[12px] text-[#a99986] leading-5 text-left whitespace-nowrap">Market cap</span>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-[3px] pt-[9px]">
          {/* PASS */}
          <div className={`${colClass} h-[42px]`}>
            <div className="bg-[#52e05e] border border-[#362714] flex gap-[9px] items-center px-2 py-[6px] rounded-[4px] w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/badge-pass.svg" alt="" width={9} height={6} />
              <span className="font-medium text-[12px] text-white leading-[15px] tracking-[0.5px] uppercase whitespace-nowrap">
                PASS
              </span>
            </div>
            <span className={cellClass}>{proposal.passMarket.priceChange24h.toFixed(2)}%</span>
            <span className={cellClass}>${proposal.passMarket.price.toFixed(4)}</span>
            <span className={cellClass}>${(proposal.passMarket.marketCap / 1_000_000).toFixed(1)}m</span>
          </div>

          {/* FAIL */}
          <div className={`${colClass} h-[42px]`}>
            <div className="bg-[#f63c67] border border-[#362714] flex gap-[9px] items-center px-2 py-[6px] rounded-[4px] w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/badge-fail.svg" alt="" width={6} height={6} />
              <span className="font-medium text-[12px] text-white leading-[15px] tracking-[0.5px] uppercase whitespace-nowrap">
                FAIL
              </span>
            </div>
            <span className={cellClass}>{proposal.failMarket.priceChange24h.toFixed(2)}%</span>
            <span className={cellClass}>${proposal.failMarket.price.toFixed(4)}</span>
            <span className={cellClass}>${(proposal.failMarket.marketCap / 1_000_000).toFixed(1)}m</span>
          </div>

          {/* SPOT */}
          <div className={`${colClass} h-[42px]`}>
            <div className="bg-[#221d18] border border-[#362714] flex gap-[9px] items-center px-2 py-[6px] rounded-[4px] w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/badge-spot.svg" alt="" width={9} height={9} />
              <span className="font-medium text-[12px] text-white leading-[15px] tracking-[1px] uppercase whitespace-nowrap">
                SPOT
              </span>
            </div>
            <span className={cellClass}>na</span>
            <span className={cellClass}>${proposal.spotPrice.toFixed(4)}</span>
            <span className={cellClass}>${(proposal.spotMarketCap / 1_000_000).toFixed(1)}m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
