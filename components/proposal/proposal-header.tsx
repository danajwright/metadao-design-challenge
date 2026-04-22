import { formatUSD } from "@/lib/format";
import type { Proposal } from "@/lib/types";

export function ProposalHeader({ proposal }: { proposal: Proposal }) {
  return (
    <div className="border border-[#312d2a] rounded-[3px] relative w-full overflow-hidden shrink-0">
      <div className="flex flex-col gap-[47px] items-start px-[22px] py-[14px] relative">
        {/* MetaDAO watermark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/metadao-watermark.svg" alt="" className="absolute right-0 bottom-0 w-[207px] h-[171px] pointer-events-none z-0" />

        {/* Content sits above watermark */}
        <div className="relative z-10 flex gap-[5px] items-center py-[3px] rounded-[5px]">
          <div className="bg-[#8aea92] rounded-full size-[5px]" />
          <span className="font-['Inter',sans-serif] font-medium text-[11px] text-[#8aea92] leading-[14px]">
            {proposal.status === "passed"
              ? "Passed"
              : proposal.status === "failed"
              ? "Failed"
              : "Active"}
          </span>
        </div>

        <h2 className="relative z-10 font-['IBM_Plex_Mono',monospace] text-[19px] text-[#f7e7d3] leading-[29px] whitespace-nowrap">
          {proposal.title.toUpperCase()}
        </h2>

        <div className="relative z-10 flex gap-[38px] items-start">
          <div className="flex flex-col gap-[2px] items-start">
            <span className="text-[10px] text-[#6e6357] leading-[15px] tracking-[1px]">
              Total Volume
            </span>
            <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f4e4cf] leading-[25px]">
              {formatUSD(proposal.totalVolume, true)}
            </span>
          </div>
          <div className="flex flex-col gap-[2px] items-start">
            <span className="text-[10px] text-[#6e6357] leading-[15px] tracking-[1px]">
              Created
            </span>
            <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f4e4cf] leading-[25px]">
              {proposal.createdAt}
            </span>
          </div>
          <div className="flex flex-col gap-[2px] items-start">
            <span className="text-[10px] text-[#6e6357] leading-[15px] tracking-[1px]">
              Author
            </span>
            <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f4e4cf] leading-[25px]">
              P2P Team
            </span>
          </div>
          <div className="flex flex-col gap-[2px] items-start">
            <span className="text-[10px] text-[#6e6357] leading-[15px] tracking-[1px] whitespace-nowrap">
              Type
            </span>
            <span className="font-['IBM_Plex_Mono',monospace] text-[12px] text-[#f4e4cf] leading-[25px] w-[194px]">
              {proposal.proposalType}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
