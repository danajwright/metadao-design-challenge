import type { Proposal } from "@/lib/types";

export function ProposalResultsCard({ proposal }: { proposal: Proposal }) {
  return (
    <div className="flex flex-col items-start">
      {/* Header */}
      <div className="flex h-[76px] items-start py-6 w-full">
        <span className="flex-1 text-[20px] text-[#f7e7d3] leading-7">
          Proposal results
        </span>
      </div>

      {/* Table */}
      <div className="flex flex-col items-start w-full">
        {/* Column headers */}
        <div className="border-b border-[#312d2a] w-full">
          <div className="flex items-center justify-between px-px py-[5px]">
            <div className="flex items-center py-3 rounded-[4px]">
              <span className="text-[14px] text-[#a99986] leading-[15px] tracking-[1px] uppercase whitespace-nowrap">
                P2P-USDC
              </span>
            </div>
            <div className="flex items-center w-[265px]">
              <div className="flex h-[42px] items-center w-[82px]">
                <span className="text-[14px] text-[#a99986] leading-5 text-center whitespace-nowrap">%</span>
              </div>
              <div className="flex h-[42px] items-center w-[90px]">
                <span className="text-[14px] text-[#a99986] leading-5 text-center whitespace-nowrap">Price</span>
              </div>
              <div className="flex h-[42px] items-center w-[92px]">
                <span className="text-[14px] text-[#a99986] leading-5 text-center whitespace-nowrap">Market cap</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-[3px] items-start pt-[9px]">
          {/* PASS */}
          <div className="flex h-[42px] items-center justify-between px-px w-full">
            <div className="bg-[#52e05e] border border-[#362714] flex gap-[9px] items-center px-2 py-[6px] rounded-[4px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/badge-pass.svg" alt="" width={9} height={6} />
              <span className="font-medium text-[12px] text-white leading-[15px] tracking-[0.5px] uppercase whitespace-nowrap">
                PASS
              </span>
            </div>
            <div className="flex items-center justify-end w-[293px]">
              <div className="flex h-[42px] items-center w-[82px]">
                <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f7e7d3] leading-5 text-center whitespace-nowrap">
                  {proposal.passMarket.priceChange24h.toFixed(2)}%
                </span>
              </div>
              <div className="flex h-[42px] items-center w-[90px]">
                <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f7e7d3] leading-5 text-center whitespace-nowrap">
                  ${proposal.passMarket.price.toFixed(4)}
                </span>
              </div>
              <div className="flex h-[42px] items-center w-[92px]">
                <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f7e7d3] leading-5 text-center whitespace-nowrap">
                  ${(proposal.passMarket.marketCap / 1_000_000).toFixed(1)}m
                </span>
              </div>
            </div>
          </div>

          {/* FAIL */}
          <div className="flex h-[42px] items-center justify-between px-px w-full">
            <div className="bg-[#f63c67] border border-[#362714] flex gap-[9px] items-center px-2 py-[6px] rounded-[4px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/badge-fail.svg" alt="" width={6} height={6} />
              <span className="font-medium text-[12px] text-white leading-[15px] tracking-[0.5px] uppercase whitespace-nowrap">
                FAIL
              </span>
            </div>
            <div className="flex items-center justify-end w-[293px]">
              <div className="flex h-[42px] items-center w-[82px]">
                <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f7e7d3] leading-5 text-center whitespace-nowrap">
                  {proposal.failMarket.priceChange24h.toFixed(2)}%
                </span>
              </div>
              <div className="flex h-[42px] items-center w-[90px]">
                <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f7e7d3] leading-5 text-center whitespace-nowrap">
                  ${proposal.failMarket.price.toFixed(4)}
                </span>
              </div>
              <div className="flex h-[42px] items-center w-[92px]">
                <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f7e7d3] leading-5 text-center whitespace-nowrap">
                  ${(proposal.failMarket.marketCap / 1_000_000).toFixed(1)}m
                </span>
              </div>
            </div>
          </div>

          {/* SPOT */}
          <div className="flex h-[42px] items-center justify-between px-px w-full">
            <div className="bg-[#221d18] border border-[#362714] flex gap-[9px] items-center px-2 py-[6px] rounded-[4px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/badge-spot.svg" alt="" width={9} height={9} />
              <span className="font-medium text-[12px] text-white leading-[15px] tracking-[1px] uppercase whitespace-nowrap">
                SPOT
              </span>
            </div>
            <div className="flex items-center justify-end w-[293px]">
              <div className="flex h-[42px] items-center w-[82px]">
                <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f7e7d3] leading-5 text-center whitespace-nowrap">
                  na
                </span>
              </div>
              <div className="flex h-[42px] items-center w-[90px]">
                <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f7e7d3] leading-5 text-center whitespace-nowrap">
                  ${proposal.spotPrice.toFixed(4)}
                </span>
              </div>
              <div className="flex h-[42px] items-center w-[92px]">
                <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f7e7d3] leading-5 text-center whitespace-nowrap">
                  ${(proposal.spotMarketCap / 1_000_000).toFixed(1)}m
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
