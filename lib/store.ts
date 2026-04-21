"use client";

import { create } from "zustand";

type TradeStore = {
  selectedMarket: "pass" | "fail";
  tradeDirection: "buy" | "sell";
  amount: string;
  approveState: "approved" | "pending";
  setMarket: (m: "pass" | "fail") => void;
  setDirection: (d: "buy" | "sell") => void;
  setAmount: (a: string) => void;
  setApproveState: (s: "approved" | "pending") => void;
};

export const useTradeStore = create<TradeStore>((set) => ({
  selectedMarket: "pass",
  tradeDirection: "buy",
  amount: "",
  approveState: "approved",
  setMarket: (selectedMarket) => set({ selectedMarket }),
  setDirection: (tradeDirection) => set({ tradeDirection }),
  setAmount: (amount) => set({ amount }),
  setApproveState: (approveState) => set({ approveState }),
}));
