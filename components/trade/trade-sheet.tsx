"use client";

import { ArrowUp } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TradePanel } from "./trade-panel";
import type { Proposal } from "@/lib/types";

export function TradeSheet({ proposal }: { proposal: Proposal }) {
  return (
    <Sheet>
      <SheetTrigger className="fixed bottom-4 right-4 z-40 xl:hidden inline-flex items-center gap-1.5 rounded-full bg-green-600 text-white px-4 py-2.5 text-sm font-semibold shadow-lg hover:bg-green-700 transition-colors">
        <ArrowUp className="size-4" />
        Trade
      </SheetTrigger>
      <SheetContent side="bottom" showCloseButton className="h-[90vh] p-0 overflow-hidden">
        <TradePanel proposal={proposal} />
      </SheetContent>
    </Sheet>
  );
}
