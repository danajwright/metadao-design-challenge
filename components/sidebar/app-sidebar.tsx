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
    <aside className="flex flex-col w-[230px] shrink-0 bg-[#211e1d] border-r border-[#312d2a] h-full overflow-y-auto">
      {/* Project header */}
      <div className="flex gap-3 h-[30px] items-center px-6 mt-6 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/p2p-logo.png" alt="P2P Protocol" width={28} height={28} className="rounded-full shrink-0 object-cover" />
        <span className="font-medium text-[14px] text-[#f7e7d3] leading-5 whitespace-nowrap">
          P2P Protocol
        </span>
      </div>

      {/* Main nav */}
      <div className="flex flex-col gap-3 items-start px-3 py-8">
        <div className="flex items-center justify-center px-3">
          <span className="text-[11px] text-[#a99986] leading-[10px]">Proposal</span>
        </div>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex gap-[9px] items-center px-3 py-[10px] rounded-[5px] w-full text-left ${
              item.active ? "bg-[#2e2924]" : ""
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.icon} alt="" width={16} height={16} className="shrink-0" />
            <span
              className={`text-[14px] leading-4 w-[118px] ${
                item.active ? "text-white" : "text-[#a99986]"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}

        {/* Divider */}
        <div className="py-3 w-full">
          <div className="h-px bg-[#312d2a] w-[198px]" />
        </div>

        <div className="flex items-center justify-center px-3">
          <span className="text-[11px] text-[#a99986] leading-[10px]">How it works</span>
        </div>
        {howItWorksItems.map((item) => (
          <button
            key={item.label}
            className="flex gap-[9px] items-center px-3 py-[10px] rounded-[5px] w-full text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.icon} alt="" width={16} height={16} className="shrink-0" />
            <span className="text-[14px] leading-4 text-[#a99986]">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* Footer */}
      <div className="flex flex-col items-start px-3 pb-3 shrink-0">
        <div className="bg-[#2b2621] flex items-center justify-between p-3 rounded-[5px] w-full">
          <div className="flex flex-col gap-[10px] items-start">
            <span className="text-[11px] text-[#a99986] leading-[10px]">Powered by</span>
            <div className="flex gap-[9px] items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/metadao-logo.png" alt="MetaDAO" width={16} height={16} className="object-cover" />
              <span className="text-[14px] text-[#f7e7d3] leading-4 w-[118px]">MetaDAO</span>
            </div>
          </div>
          <span className="text-[22px] text-[#a99986] self-end pb-0.5">↗</span>
        </div>
      </div>
    </aside>
  );
}
