"use client";

const navItems = [
  { label: "Overview", active: true, icon: "/assets/icon-overview.svg" },
  { label: "Trade", active: false, icon: "/assets/icon-trade.svg" },
  { label: "On-chain instruction", active: false, icon: "/assets/icon-onchain.svg" },
];

const howItWorksItems = [
  { label: "Decision markets", icon: "/assets/icon-markets.svg" },
  { label: "Trading strategies", icon: "/assets/icon-strategies.svg" },
  { label: "What is MetaDAO?", icon: "/assets/icon-globe.svg" },
];

export function AppSidebar() {
  return (
    <aside className="flex flex-col w-[184px] shrink-0 bg-[#211e1d] border-r border-[#312d2a] h-full overflow-y-auto">
      {/* Project header */}
      <div className="flex gap-[11px] h-[27px] items-center px-[22px] mt-[22px] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/p2p-logo.png" alt="P2P Protocol" width={25} height={25} className="rounded-full shrink-0 object-cover" />
        <span className="font-medium text-[11px] text-[#f7e7d3] leading-[18px] whitespace-nowrap">
          P2P Protocol
        </span>
      </div>

      {/* Main nav */}
      <div className="flex flex-col gap-[11px] items-start px-[11px] py-[29px]">
        <div className="flex items-center justify-center px-[11px]">
          <span className="text-[10px] text-[#a99986] leading-[9px]">Proposal</span>
        </div>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`group flex gap-[8px] items-center px-[11px] py-[9px] rounded-[5px] w-full text-left hover:bg-[#2e2924] cursor-pointer transition-colors duration-150 ease-in-out ${
              item.active ? "bg-[#2e2924]" : ""
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.icon}
              alt=""
              width={14}
              height={14}
              className="shrink-0 transition-all duration-150 ease-in-out group-hover:brightness-0 group-hover:invert"
            />
            <span
              className={`text-[11px] leading-[14px] whitespace-nowrap transition-colors duration-150 ease-in-out group-hover:text-white ${
                item.active ? "text-white" : "text-[#a99986]"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}

        {/* Divider */}
        <div className="py-[11px] w-full">
          <div className="h-px bg-[#312d2a] w-[178px]" />
        </div>

        <div className="flex items-center justify-center px-[11px]">
          <span className="text-[10px] text-[#a99986] leading-[9px]">How it works</span>
        </div>
        {howItWorksItems.map((item) => (
          <button
            key={item.label}
            className="group flex gap-[8px] items-center px-[11px] py-[9px] rounded-[5px] w-full text-left hover:bg-[#2e2924] cursor-pointer transition-colors duration-150 ease-in-out"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.icon}
              alt=""
              width={14}
              height={14}
              className="shrink-0 transition-all duration-150 ease-in-out group-hover:brightness-0 group-hover:invert"
            />
            <span className="text-[11px] leading-[14px] text-[#a99986] transition-colors duration-150 ease-in-out group-hover:text-white">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* Footer */}
      <div className="flex flex-col items-start px-[11px] pb-[11px] shrink-0">
        <div className="group bg-[#2b2621] flex items-center justify-between p-[11px] rounded-[5px] w-full hover:bg-[#2e2924] cursor-pointer transition-colors duration-150 ease-in-out">
          <div className="flex flex-col gap-[9px] items-start">
            <span className="text-[10px] text-[#a99986] leading-[9px] transition-colors duration-150 ease-in-out group-hover:text-white">Powered by</span>
            <div className="flex gap-[8px] items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/metadao-logo.png" alt="MetaDAO" width={14} height={14} className="object-cover transition-all duration-150 ease-in-out group-hover:brightness-0 group-hover:invert" />
              <span className="text-[11px] text-[#f7e7d3] leading-[14px] w-[106px] transition-colors duration-150 ease-in-out group-hover:text-white">MetaDAO</span>
            </div>
          </div>
          <span className="text-[16px] text-[#a99986] self-end pb-0.5 transition-colors duration-150 ease-in-out group-hover:text-white">↗</span>
        </div>
      </div>
    </aside>
  );
}
