"use client";

import { useEffect, useState } from "react";
import type { Proposal, OHLCBar } from "@/lib/types";

type Props = {
  proposal: Proposal;
  passData: OHLCBar[];
  failData: OHLCBar[];
};

export function ProposalResultsCard({ proposal, passData, failData }: Props) {
  const colClass = "grid grid-cols-[1fr_74px_81px_83px] items-center px-px";
  const cellClass = "font-['IBM_Plex_Mono',monospace] text-[11px] text-[#f7e7d3] leading-[18px] text-left whitespace-nowrap";

  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    if (frameIdx >= passData.length - 1) return;
    const progress = frameIdx / (passData.length - 1);
    const delay = 20 + Math.pow(progress, 3) * 500;
    const timer = setTimeout(() => setFrameIdx((i) => i + 1), delay);
    return () => clearTimeout(timer);
  }, [frameIdx, passData.length]);

  const rawPercents = passData.map((bar, i) => {
    const p = bar.close;
    const f = failData[i]?.close ?? p;
    return p / (p + f);
  });
  const minRaw = Math.min(...rawPercents);
  const maxRaw = Math.max(...rawPercents);

  const rawPass = rawPercents[frameIdx] ?? 0.5;
  const visualPass = maxRaw > minRaw
    ? 25 + ((rawPass - minRaw) / (maxRaw - minRaw)) * 50
    : 50;
  const visualFail = 100 - visualPass;
  const passPercent = visualPass;
  const failPercent = visualFail;

  const displayPassPct = rawPass * 100;
  const displayFailPct = 100 - displayPassPct;

  const passClose = passData[frameIdx]?.close ?? proposal.passMarket.price;
  const failClose = failData[frameIdx]?.close ?? proposal.failMarket.price;
  const passMarketCap = proposal.passMarket.marketCap * (passClose / proposal.passMarket.price);
  const failMarketCap = proposal.failMarket.marketCap * (failClose / proposal.failMarket.price);

  return (
    <div className="flex flex-col items-start">
      {/* Header */}
      <div className="flex h-[68px] items-center pt-[12px] pb-[5px] w-full">
        <span className="flex-1 text-[14px] text-[#f7e7d3] leading-[25px]">
          Proposal results
        </span>
      </div>

      {/* Table */}
      <div className="flex flex-col w-full">
        {/* Column headers */}
        <div className={`${colClass} border-b border-[#312d2a] py-[5px]`}>
          <span className="text-[11px] text-[#a99986] leading-[14px] tracking-[1px] uppercase whitespace-nowrap py-[11px]">
            P2P-USDC
          </span>
          <span className="text-[11px] text-[#a99986] leading-[18px] text-left whitespace-nowrap">%</span>
          <span className="text-[11px] text-[#a99986] leading-[18px] text-left whitespace-nowrap">Price</span>
          <span className="text-[11px] text-[#a99986] leading-[18px] text-left whitespace-nowrap">Market cap</span>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-[3px] pt-[8px]">
          {/* PASS */}
          <div className={`${colClass} h-[38px]`}>
            <div
              className="bg-[#52e05e] border border-[#362714] flex gap-[8px] items-center px-[7px] py-[5px] rounded-[4px] overflow-hidden transition-all duration-[200ms] ease-out"
              style={{ width: `${passPercent}%`, minWidth: "fit-content" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/badge-pass.svg" alt="" width={8} height={5} className="shrink-0" />
              <span className="font-medium text-[11px] text-white leading-[14px] tracking-[0.5px] uppercase whitespace-nowrap">
                PASS
              </span>
            </div>
            <span className={cellClass}>{displayPassPct.toFixed(2)}%</span>
            <span className={cellClass}>${passClose.toFixed(4)}</span>
            <span className={cellClass}>${(passMarketCap / 1_000_000).toFixed(1)}m</span>
          </div>

          {/* FAIL */}
          <div className={`${colClass} h-[38px]`}>
            <div
              className="bg-[#f63c67] border border-[#362714] flex gap-[8px] items-center px-[7px] py-[5px] rounded-[4px] overflow-hidden transition-all duration-[200ms] ease-out"
              style={{ width: `${failPercent}%`, minWidth: "fit-content" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/badge-fail.svg" alt="" width={5} height={5} className="shrink-0" />
              <span className="font-medium text-[11px] text-white leading-[14px] tracking-[0.5px] uppercase whitespace-nowrap">
                FAIL
              </span>
            </div>
            <span className={cellClass}>{displayFailPct.toFixed(2)}%</span>
            <span className={cellClass}>${failClose.toFixed(4)}</span>
            <span className={cellClass}>${(failMarketCap / 1_000_000).toFixed(1)}m</span>
          </div>

          {/* SPOT */}
          <div className={`${colClass} h-[38px]`}>
            <div className="bg-[#221d18] border border-[#362714] flex gap-[8px] items-center px-[7px] py-[5px] rounded-[4px] w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/badge-spot.svg" alt="" width={8} height={8} />
              <span className="font-medium text-[11px] text-white leading-[14px] tracking-[1px] uppercase whitespace-nowrap">
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
