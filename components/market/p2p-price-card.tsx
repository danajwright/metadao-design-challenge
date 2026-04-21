type Props = {
  icoPrice: number;
  currentMarketPrice: number;
};

export function P2PPriceCard({ icoPrice, currentMarketPrice }: Props) {
  return (
    <div className="flex flex-col items-start">
      {/* Header */}
      <div className="flex h-[76px] items-center justify-between py-6 w-full">
        <div className="flex gap-[9px] items-center">
          <span className="text-[18px] text-[#f7e7d3] leading-7 whitespace-nowrap">
            P2P price
          </span>
          <div className="border border-[#8aea92] flex gap-[5px] items-center px-[7px] py-[4px] rounded-[21px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/icon-live.svg" alt="" width={10} height={14} />
            <span className="font-medium text-[12px] text-[#8aea92] leading-[15px] tracking-[1px] uppercase whitespace-nowrap">
              LIVE
            </span>
          </div>
        </div>
        <span className="text-[12px] text-[#a99986] leading-[18px] text-center whitespace-nowrap">
          Updating in 55s
        </span>
      </div>

      {/* Table */}
      <div className="flex flex-col items-start w-full">
        {/* Column headers */}
        <div className="border-b border-[#312d2a] w-full">
          <div className="flex items-center justify-between px-px py-[5px]">
            <div className="flex items-center py-3 rounded-[4px]">
              <span className="text-[12px] text-[#a99986] leading-[15px] whitespace-nowrap">
                ICO price
              </span>
            </div>
            <div className="flex items-center w-[265px]">
              <div className="flex h-[42px] items-center w-[92px]">
                <span className="text-[12px] text-[#a99986] leading-5 text-center whitespace-nowrap">
                  Current market price
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="w-full">
          <div className="flex items-center justify-between px-px py-[5px]">
            <div className="flex h-[42px] items-center w-[82px]">
              <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f7e7d3] leading-5 text-center whitespace-nowrap">
                ${icoPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center w-[263px]">
              <div className="flex h-[42px] items-center w-[82px]">
                <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#8aea92] leading-5 text-center whitespace-nowrap">
                  ${currentMarketPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
