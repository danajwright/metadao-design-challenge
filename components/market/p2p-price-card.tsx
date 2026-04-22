"use client";

import { useEffect, useState } from "react";

type Props = {
  icoPrice: number;
  currentMarketPrice: number;
};

export function P2PPriceCard({ icoPrice, currentMarketPrice }: Props) {
  const priceSequence = [0.40, 0.41, 0.42, 0.43, 0.42, 0.41];
  const [seconds, setSeconds] = useState(15);
  const [priceStep, setPriceStep] = useState(0);
  const [flashColor, setFlashColor] = useState<string | null>(null);

  const animatedPrice = priceSequence[priceStep];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setPriceStep((p) => {
            const next = (p + 1) % priceSequence.length;
            const direction = priceSequence[next] > priceSequence[p] ? "up" : "down";
            setFlashColor(direction === "up" ? "#8aea92" : "#f7567c");
            setTimeout(() => setFlashColor(null), 600);
            return next;
          });
          return 15;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-start">
      {/* Header */}
      <div className="flex h-[68px] items-center justify-between pt-[12px] pb-[5px] w-full">
        <div className="flex gap-[8px] items-center">
          <span className="text-[14px] text-[#f7e7d3] leading-[25px] whitespace-nowrap">
            P2P price
          </span>
          <div className="border border-[#8aea92] flex gap-[5px] items-center px-[5px] py-[2px] rounded-[19px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/icon-live.svg" alt="" width={7} height={10} />
            <span className="font-medium text-[10px] text-[#8aea92] leading-[14px] tracking-[1px] uppercase whitespace-nowrap">
              LIVE
            </span>
          </div>
        </div>
        <span className="text-[11px] text-[#a99986] leading-[16px] text-center whitespace-nowrap">
          Updating in {seconds}s
        </span>
      </div>

      {/* Table */}
      <div className="flex flex-col items-start w-full">
        {/* Column headers */}
        <div className="border-b border-[#312d2a] w-full">
          <div className="flex items-center justify-between px-px py-[5px]">
            <div className="flex items-center py-[11px] rounded-[4px]">
              <span className="text-[11px] text-[#a99986] leading-[14px] whitespace-nowrap">
                ICO price
              </span>
            </div>
            <div className="flex items-center w-[239px]">
              <div className="flex h-[38px] items-center w-[83px]">
                <span className="text-[11px] text-[#a99986] leading-[18px] text-center whitespace-nowrap">
                  Current market price
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="w-full">
          <div className="flex items-center justify-between px-px py-[5px]">
            <div className="flex h-[38px] items-center w-[74px]">
              <span className="font-['IBM_Plex_Mono',monospace] text-[11px] text-[#f7e7d3] leading-[18px] text-center whitespace-nowrap">
                ${icoPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center w-[237px]">
              <div className="flex h-[38px] items-center w-[74px]">
                <span
                  className="font-['IBM_Plex_Mono',monospace] text-[11px] leading-[18px] text-center whitespace-nowrap transition-colors duration-300"
                  style={{ color: flashColor ?? "#f7e7d3" }}
                >
                  ${animatedPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
