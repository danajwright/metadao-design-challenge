export type ProposalStatus = "active" | "passed" | "failed" | "pending";

export type ConditionalMarket = {
  side: "pass" | "fail";
  price: number;
  priceChange24h: number;
  marketCap: number;
  buyPrice: number;
  sellPrice: number;
};

export type Proposal = {
  id: string;
  title: string;
  project: string;
  status: ProposalStatus;
  createdAt: string;
  tradingPeriod: string;
  endedAt: string | null;
  totalVolume: number;
  passMarket: ConditionalMarket;
  failMarket: ConditionalMarket;
  spotPrice: number;
  spotMarketCap: number;
  proposalMarkdown: string;
  proposalType: string;
  icoPrice: number;
  currentMarketPrice: number;
};

export type Trade = {
  id: string;
  type: "buy" | "sell";
  market: "pass" | "fail";
  price: number;
  size: number;
  timestamp: string;
};

export type OHLCBar = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type Balances = {
  usdc: number;
  pass: number;
  fail: number;
};
