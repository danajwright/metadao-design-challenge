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
      <div className="flex-1 min-w-0 overflow-y-auto flex flex-col">
        <div className="w-full max-w-[1215px] mx-auto flex flex-col">
          {/* Top header bar — sticky with frosted glass */}
          <div className="sticky top-0 z-50 flex items-center pl-[22px] py-[18px] backdrop-blur-md bg-[#141211]/80">
            <span className="flex-1 text-[16px] text-[#f7e7d3] leading-[25px]">Overview</span>
            <div className="flex gap-[7px] items-center pr-[22px]">
              {/* Token price */}
              <div className="rounded-[4px] px-[7px] py-1">
                <span className="font-['IBM_Plex_Mono',monospace] text-[10px] text-[#a99986] leading-[15px] whitespace-nowrap">
                  $0.09
                </span>
              </div>
              {/* Wallet button */}
              <div className="group bg-[#1a1a1a] rounded-[4px] h-[32px] w-[97px] flex items-center px-[11px] relative hover:bg-[#2e2924] cursor-pointer transition-colors duration-150 ease-in-out">
                <span className="text-[11px] text-[#b3afac] leading-[16px] text-center flex-1 transition-colors duration-150 ease-in-out group-hover:text-white">
                  8Cw...dhq
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/icon-chevron.svg" alt="" width={11} height={11} className="transition-all duration-150 ease-in-out group-hover:brightness-0 group-hover:invert" />
              </div>
              {/* Theme toggle */}
              <div className="group bg-[#1a1a1a] rounded-[4px] size-[32px] flex items-center justify-center hover:bg-[#2e2924] cursor-pointer transition-colors duration-150 ease-in-out">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/light-mode2.svg" alt="Toggle light mode" width={14} height={14} className="transition-all duration-150 ease-in-out group-hover:brightness-0 group-hover:invert" />
              </div>
            </div>
          </div>

          {/* Two-column content */}
          <div className="flex items-start pb-[29px]">
            {/* Left column */}
            <div className="flex-1 min-w-0 pl-[22px] pr-[12px] flex flex-col gap-[8px]">
              <ProposalHeader proposal={proposal} />
              <ProposalContent markdown={proposal.proposalMarkdown} />
            </div>

            {/* Right column — 425px */}
            <div className="w-[400px] shrink-0 flex flex-col gap-[16px] pl-[12px] pr-[22px]">
              <P2PPriceCard
                icoPrice={proposal.icoPrice}
                currentMarketPrice={proposal.currentMarketPrice}
              />
              <ProposalResultsCard
                proposal={proposal}
                passData={MOCK_PASS_OHLC}
                failData={MOCK_FAIL_OHLC}
              />
              <ProposalTradingCard
                passData={MOCK_PASS_OHLC}
                failData={MOCK_FAIL_OHLC}
                spotData={MOCK_SPOT_OHLC}
                createdAt={proposal.tradingPeriod}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
