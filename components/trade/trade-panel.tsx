"use client";

import { useTradeStore } from "@/lib/store";
import { TradeSideTabs } from "./trade-side-tabs";
import { BuySellToggle } from "./buy-sell-toggle";
import { AmountInput } from "./amount-input";
import { QuickAmountSelector } from "./quick-amount-selector";
import { TradeStats } from "./trade-stats";
import { PositionSummary } from "./position-summary";
import { ConfirmTradeButton } from "./confirm-trade-button";
import { TradesBalancesPanel } from "./trades-balances-panel";
import { MOCK_TRADES, MOCK_BALANCES } from "@/lib/mock-data";
import type { Proposal } from "@/lib/types";

export function TradePanel({ proposal }: { proposal: Proposal }) {
  const { selectedMarket, tradeDirection, amount, setMarket, setDirection, setAmount } =
    useTradeStore();

  const market =
    selectedMarket === "pass" ? proposal.passMarket : proposal.failMarket;

  const avgPrice = tradeDirection === "buy" ? market.buyPrice : market.sellPrice;

  const parsedAmount = parseFloat(amount) || 0;
  const estimatedTokens = parsedAmount > 0 ? parsedAmount / avgPrice : 0;
  const positionBefore = selectedMarket === "pass" ? MOCK_BALANCES.pass : MOCK_BALANCES.fail;
  const positionAfter =
    tradeDirection === "buy"
      ? positionBefore + estimatedTokens
      : Math.max(0, positionBefore - estimatedTokens);

  function handleConfirm() {
    console.log("[TradePanel] confirm", {
      market: selectedMarket,
      direction: tradeDirection,
      amount: parsedAmount,
      price: avgPrice,
      tokens: estimatedTokens,
    });
    setAmount("");
  }

  return (
    <div className="flex flex-col bg-bg-surface border-l border-brand-border h-full overflow-y-auto">
      <TradeSideTabs value={selectedMarket} onChange={setMarket} />

      <div className="flex flex-col gap-3 px-3 py-3">
        <p className="text-[11px] text-text-muted">
          If {selectedMarket}, I would like to&hellip;
        </p>

        <BuySellToggle
          direction={tradeDirection}
          buyPrice={market.buyPrice}
          sellPrice={market.sellPrice}
          market={selectedMarket}
          onChange={setDirection}
        />

        <AmountInput
          value={amount}
          usdcBalance={MOCK_BALANCES.usdc}
          onChange={setAmount}
        />

        <QuickAmountSelector
          usdcBalance={MOCK_BALANCES.usdc}
          onSelect={setAmount}
        />

        <TradeStats
          avgPrice={avgPrice}
          market={selectedMarket}
          positionBefore={positionBefore}
          positionAfter={positionAfter}
        />

        <PositionSummary
          failValue={selectedMarket === "fail" ? parsedAmount : 0}
          passValue={selectedMarket === "pass" ? estimatedTokens : 0}
        />

        <ConfirmTradeButton
          amount={amount}
          market={selectedMarket}
          direction={tradeDirection}
          onConfirm={handleConfirm}
        />
      </div>

      <TradesBalancesPanel trades={MOCK_TRADES} balances={MOCK_BALANCES} />
    </div>
  );
}
