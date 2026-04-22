import type { Proposal, Trade, OHLCBar, Balances } from "./types";

export const MOCK_PROPOSAL: Proposal = {
  id: "p2p-001",
  title: "P2P Buyback Program",
  project: "P2P Protocol",
  status: "passed",
  createdAt: "3/22/2021",
  tradingPeriod: "3/22/2021 - 4/21/2021",
  endedAt: "4/6/2026",
  totalVolume: 50860,
  proposalType: "Operations Direct Action",
  icoPrice: 0.60,
  currentMarketPrice: 0.40,
  passMarket: {
    side: "pass",
    price: 0.5138,
    priceChange24h: -4.22,
    marketCap: 13300000,
    buyPrice: 0.5164,
    sellPrice: 0.5112,
  },
  failMarket: {
    side: "fail",
    price: 0.4927,
    priceChange24h: -8.16,
    marketCap: 12700000,
    buyPrice: 0.4953,
    sellPrice: 0.4901,
  },
  spotPrice: 0.5364,
  spotMarketCap: 13800000,
  proposalMarkdown: `### Summary

If passed, up to $500,000 USDC of operational funds will be used to purchase P2P tokens at prices up to $0.55 per token over a period of 30 days. All acquired P2P will be transferred to the project treasury.

### Motivation

Since TGE, P2P has been trading below the ICO price of $0.60. With the token trading at a discount to its initial offering price, the project has an opportunity to acquire P2P at accretive terms, strengthening the treasury position while demonstrating long term conviction in what we are building.

### Purpose of the buyback

This buyback will serve three purposes:

- **Accretive acquisition:** Buying below ICO price means the project acquires tokens at a discount to what early participants paid. This is capital efficient treasury management.

- **Alignment signal:** A structured buyback backed by operational funds demonstrates that the team stands behind the project's fundamentals and long term value.

- **Ecosystem reserve building:** Acquired tokens create a reserve that can be deployed for future incentive programs, strategic partnerships, or burns, all subject to governance approval.

### Buyback funding

Funds for the buyback are SAFU.

This allocation does not impair ongoing operations or development runway. The funds are drawn from the project's operational liquidity budget specifically earmarked for market health activities.`,
};

export const MOCK_TRADES: Trade[] = [
  { id: "1", type: "sell", market: "fail", price: 0.473, size: 202.57, timestamp: "04/06 08:47" },
  { id: "2", type: "sell", market: "pass", price: 0.494, size: 202.57, timestamp: "04/06 08:47" },
  { id: "3", type: "sell", market: "fail", price: 0.473, size: 202.65, timestamp: "04/06 08:47" },
  { id: "4", type: "sell", market: "pass", price: 0.494, size: 202.65, timestamp: "04/06 08:47" },
  { id: "5", type: "sell", market: "fail", price: 0.474, size: 202.66, timestamp: "04/06 08:47" },
  { id: "6", type: "sell", market: "pass", price: 0.494, size: 202.66, timestamp: "04/06 08:47" },
  { id: "7", type: "sell", market: "fail", price: 0.474, size: 202.66, timestamp: "04/06 08:47" },
  { id: "8", type: "sell", market: "pass", price: 0.494, size: 202.66, timestamp: "04/06 08:47" },
  { id: "9", type: "sell", market: "fail", price: 0.474, size: 202.66, timestamp: "04/06 08:47" },
  { id: "10", type: "sell", market: "pass", price: 0.495, size: 202.66, timestamp: "04/06 08:47" },
  { id: "11", type: "sell", market: "fail", price: 0.474, size: 202.66, timestamp: "04/06 08:47" },
  { id: "12", type: "sell", market: "pass", price: 0.495, size: 202.66, timestamp: "04/06 08:47" },
];

export const MOCK_BALANCES: Balances = {
  usdc: 1000,
  pass: 0,
  fail: 0,
};

function generateOHLC(
  basePrice: number,
  days: number,
  volatility: number,
  seed: number
): OHLCBar[] {
  const bars: OHLCBar[] = [];
  let price = basePrice;
  const now = Math.floor(Date.now() / 1000);
  const daySeconds = 86400;

  for (let i = days; i >= 0; i--) {
    const t = now - i * daySeconds;
    // deterministic pseudo-random via seed
    const r1 = Math.sin(seed + i * 2.3) * 0.5 + 0.5;
    const r2 = Math.sin(seed + i * 1.7 + 1) * 0.5 + 0.5;
    const r3 = Math.sin(seed + i * 3.1 + 2) * 0.5 + 0.5;
    const r4 = Math.sin(seed + i * 0.9 + 3) * 0.5 + 0.5;

    const open = price;
    const change = (r1 - 0.48) * volatility;
    const close = Math.max(0.01, open + change);
    const high = Math.max(open, close) + r2 * volatility * 0.5;
    const low = Math.min(open, close) - r3 * volatility * 0.3;

    bars.push({ time: t, open: +open.toFixed(4), high: +high.toFixed(4), low: +Math.max(0.01, low).toFixed(4), close: +close.toFixed(4) });
    price = close + (r4 - 0.5) * volatility * 0.1;
  }
  return bars;
}

export const MOCK_PASS_OHLC: OHLCBar[] = generateOHLC(0.54, 30, 0.04, 42);
export const MOCK_FAIL_OHLC: OHLCBar[] = generateOHLC(0.53, 30, 0.05, 17);
export const MOCK_SPOT_OHLC: OHLCBar[] = generateOHLC(0.55, 30, 0.03, 99);

// Inject realistic final values to match wireframe
MOCK_PASS_OHLC[MOCK_PASS_OHLC.length - 1].close = 0.5138;
MOCK_FAIL_OHLC[MOCK_FAIL_OHLC.length - 1].close = 0.4927;
MOCK_SPOT_OHLC[MOCK_SPOT_OHLC.length - 1].close = 0.5364;
