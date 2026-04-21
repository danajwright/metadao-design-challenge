import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ProposalHeader } from "@/components/proposal/proposal-header";
import { ProposalContent } from "@/components/proposal/proposal-content";
import { P2PPriceCard } from "@/components/market/p2p-price-card";
import { ProposalResultsCard } from "@/components/proposal/proposal-results-card";
import { ProposalTradingCard } from "@/components/chart/proposal-trading-card";
import {
  MOCK_PROPOSAL,
  MOCK_PASS_OHLC,
  MOCK_FAIL_OHLC,
  MOCK_SPOT_OHLC,
} from "@/lib/mock-data";

export default function ProposalPage() {
  const proposal = MOCK_PROPOSAL;

  return (
    <div className="bg-[#141211] flex h-screen overflow-hidden relative">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main area */}
      <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
        <div className="w-full max-w-[1350px] mx-auto flex flex-col flex-1 min-h-0">
          {/* Top header bar */}
          <div className="flex items-start pl-6 py-6 shrink-0">
            <span className="flex-1 text-[18px] text-[#f7e7d3] leading-7">Overview</span>
            <div className="flex gap-2 items-center pr-6">
              {/* Token price */}
              <div className="rounded-[4.8px] px-2 py-1">
                <span className="font-['IBM_Plex_Mono',monospace] text-[11px] text-[#a99986] leading-[16.5px] whitespace-nowrap">
                  $0.09
                </span>
              </div>
              {/* Wallet button */}
              <div className="bg-[#1a1a1a] rounded-[4.8px] h-9 w-[108px] flex items-center px-3 relative hover:bg-[#2e2924] cursor-pointer transition-colors duration-150 ease-in-out">
                <span className="text-[12px] text-[#b3afac] leading-[18px] text-center flex-1">
                  8Cw...dhq
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/icon-chevron.svg" alt="" width={12} height={12} />
              </div>
              {/* Theme toggle */}
              <div className="bg-[#1a1a1a] rounded-[4.8px] size-9 flex items-center justify-center hover:bg-[#2e2924] cursor-pointer transition-colors duration-150 ease-in-out">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/light-mode2.svg" alt="Toggle light mode" width={16} height={16} />
              </div>
            </div>
          </div>

          {/* Two-column content */}
          <div className="flex items-stretch flex-1 min-h-0 overflow-hidden">
            {/* Left column — scrollable */}
            <div className="flex-1 min-w-0 overflow-y-auto pl-6 pr-6 pb-8 flex flex-col gap-[9px]">
              <ProposalHeader proposal={proposal} />
              <ProposalContent markdown={proposal.proposalMarkdown} />
            </div>

            {/* Right column — scrollable, 472px */}
            <div className="w-[472px] shrink-0 overflow-y-auto flex flex-col gap-[18px] pl-6 pr-6 pb-8">
              <P2PPriceCard
                icoPrice={proposal.icoPrice}
                currentMarketPrice={proposal.currentMarketPrice}
              />
              <ProposalResultsCard proposal={proposal} />
              <ProposalTradingCard
                passData={MOCK_PASS_OHLC}
                failData={MOCK_FAIL_OHLC}
                spotData={MOCK_SPOT_OHLC}
                createdAt={proposal.createdAt}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
