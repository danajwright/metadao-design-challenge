"use client";

import { useState } from "react";
import { ArrowLeft, Moon, Sun, ChevronDown } from "lucide-react";

const MOCK_WALLET = "8Cw...dhq";
const MOCK_TOKEN_PRICE = "$0.09";

export function GlobalNav() {
  const [dark, setDark] = useState(false);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <header className="bg-bg-surface border-b border-brand-border shrink-0">
      <div className="flex items-center h-12 px-4 w-full max-w-[1440px] mx-auto">
      {/* Left: back + project info */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => history.back()}
          className="text-text-muted hover:text-text-primary transition-colors p-1 rounded hover:bg-bg-surface-2"
          aria-label="Go back"
        >
          <ArrowLeft className="size-4" />
        </button>

        {/* Token logo placeholder */}
        <div className="size-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
          P2P
        </div>

        <div className="flex flex-col leading-none min-w-0">
          <span className="text-sm font-semibold text-text-primary truncate">P2P Protocol</span>
          <span className="text-[10px] text-text-muted">on MetaDAO</span>
        </div>
      </div>

      <div className="flex-1" />

      {/* Right: price + wallet + theme */}
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline-flex items-center rounded-md border border-brand-border bg-bg-surface-2 px-2 py-1 text-[11px] font-mono font-semibold text-text-primary">
          {MOCK_TOKEN_PRICE}
        </span>

        <button className="flex items-center gap-1.5 rounded-md border border-brand-border bg-bg-surface px-2.5 py-1.5 text-[12px] font-mono text-text-secondary hover:bg-bg-surface-2 transition-colors duration-150">
          <span className="size-1.5 rounded-full bg-green-500" />
          {MOCK_WALLET}
          <ChevronDown className="size-3 text-text-muted" />
        </button>

        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-surface-2 transition-colors duration-150"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </div>
      </div>
    </header>
  );
}
