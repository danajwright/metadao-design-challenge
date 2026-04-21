import { formatUSD } from "@/lib/format";
import type { Proposal } from "@/lib/types";

export function ProposalHeader({ proposal }: { proposal: Proposal }) {
  return (
    <div className="border border-[#312d2a] rounded-[3px] relative w-full overflow-hidden">
      <div className="flex flex-col gap-[52px] items-start px-6 py-4 relative">
        {/* Status badge */}
        <div className="flex gap-[6px] items-center py-[3px] rounded-[5px]">
          <div className="bg-[#8aea92] rounded-full size-[6px]" />
          <span className="font-['Geist',sans-serif] font-medium text-[12px] text-[#8aea92] leading-4">
            {proposal.status === "passed"
              ? "Passed"
              : proposal.status === "failed"
              ? "Failed"
              : "Active"}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-['IBM_Plex_Mono',monospace] text-[24px] text-[#f7e7d3] leading-8 whitespace-nowrap">
          {proposal.title.toUpperCase()}
        </h2>

        {/* Stats row */}
        <div className="flex gap-[42px] items-start">
          <div className="flex flex-col gap-[2px] items-start">
            <span className="text-[12px] text-[#6e6357] leading-[16.5px] tracking-[1px]">
              Total Volume
            </span>
            <span className="font-['IBM_Plex_Mono',monospace] text-[15px] text-[#f4e4cf] leading-7">
              {formatUSD(proposal.totalVolume, true)}
            </span>
          </div>
          <div className="flex flex-col gap-[2px] items-start">
            <span className="text-[12px] text-[#6e6357] leading-[16.5px] tracking-[1px]">
              Created
            </span>
            <span className="font-['IBM_Plex_Mono',monospace] text-[15px] text-[#f4e4cf] leading-7">
              {proposal.createdAt}
            </span>
          </div>
          <div className="flex flex-col gap-[2px] items-start">
            <span className="text-[12px] text-[#6e6357] leading-[16.5px] tracking-[1px]">
              Author
            </span>
            <span className="font-['IBM_Plex_Mono',monospace] text-[15px] text-[#f4e4cf] leading-7">
              P2P Team
            </span>
          </div>
          <div className="flex flex-col gap-[2px] items-start">
            <span className="text-[12px] text-[#6e6357] leading-[16.5px] tracking-[1px] whitespace-nowrap">
              Type
            </span>
            <span className="font-['IBM_Plex_Mono',monospace] text-[15px] text-[#f4e4cf] leading-7 w-[216px]">
              {proposal.proposalType}
            </span>
          </div>
        </div>

        {/* MetaDAO watermark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/metadao-watermark.svg" alt="" className="absolute right-6 top-[37.5px] h-[190px] w-[230px] object-contain object-right pointer-events-none opacity-30" />
      </div>
    </div>
  );
}
