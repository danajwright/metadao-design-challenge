"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createChart, LineSeries } from "lightweight-charts";
import type { IChartApi, ISeriesApi, SeriesType, Time } from "lightweight-charts";
import { TimeframeSelector, type Timeframe } from "./timeframe-selector";
import { OHLCStrip } from "./ohlc-strip";
import type { OHLCBar } from "@/lib/types";

type Props = {
  passData: OHLCBar[];
  failData: OHLCBar[];
  spotData: OHLCBar[];
};

function toLineData(bars: OHLCBar[]) {
  return bars.map((b) => ({ time: b.time as Time, value: b.close }));
}

function filterByTimeframe(bars: OHLCBar[], tf: Timeframe): OHLCBar[] {
  const now = bars[bars.length - 1]?.time ?? Date.now() / 1000;
  const cutoffs: Record<Timeframe, number> = {
    "1H": now - 3600,
    "4H": now - 14400,
    "1D": now - 86400,
    MAX: 0,
  };
  return bars.filter((b) => b.time >= cutoffs[tf]);
}

function getThemeOptions(isDark: boolean) {
    return {
      layout: {
        background: { color: isDark ? "#1a1a1a" : "#ffffff" },
        textColor: isDark ? "#9ca3af" : "#6b7280",
        fontSize: 11,
        fontFamily: "var(--font-geist-mono, monospace)",
      },
      grid: {
        vertLines: { color: isDark ? "#2a2a2a" : "#f3ede5" },
        horzLines: { color: isDark ? "#2a2a2a" : "#f3ede5" },
      },
      rightPriceScale: {
        borderColor: isDark ? "#2a2a2a" : "#e8e2d9",
        textColor: isDark ? "#9ca3af" : "#6b7280",
      },
      timeScale: {
        borderColor: isDark ? "#2a2a2a" : "#e8e2d9",
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        vertLine: { color: isDark ? "#555" : "#9ca3af", width: 1 as const },
        horzLine: { color: isDark ? "#555" : "#9ca3af", width: 1 as const },
      },
  };
}

export function PriceChart({ passData, failData, spotData }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const passSeriesRef = useRef<ISeriesApi<SeriesType> | null>(null);
  const failSeriesRef = useRef<ISeriesApi<SeriesType> | null>(null);
  const spotSeriesRef = useRef<ISeriesApi<SeriesType> | null>(null);
  const [timeframe, setTimeframe] = useState<Timeframe>("MAX");

  const lastPass = passData[passData.length - 1];
  const lastFail = failData[failData.length - 1];
  const lastSpot = spotData[spotData.length - 1];

  const ohlcBar = spotData[spotData.length - 1] ?? { open: 0, high: 0, low: 0, close: 0 };

  const initChart = useCallback(() => {
    if (!containerRef.current) return;

    const isDark = document.documentElement.classList.contains("dark");

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 220,
      ...getThemeOptions(isDark),
      handleScale: { mouseWheel: false },
    });

    const passSeries = chart.addSeries(LineSeries, {
      color: "#16a34a",
      lineWidth: 2,
      priceLineVisible: true,
      lastValueVisible: true,
      priceLineColor: "#16a34a",
      priceLineWidth: 1,
      priceLineStyle: 2,
    });

    const failSeries = chart.addSeries(LineSeries, {
      color: "#dc2626",
      lineWidth: 2,
      priceLineVisible: true,
      lastValueVisible: true,
      priceLineColor: "#dc2626",
      priceLineWidth: 1,
      priceLineStyle: 2,
    });

    const spotSeries = chart.addSeries(LineSeries, {
      color: "#9ca3af",
      lineWidth: 1,
      lineStyle: 2,
      priceLineVisible: true,
      lastValueVisible: true,
      priceLineColor: "#9ca3af",
      priceLineWidth: 1,
    });

    chartRef.current = chart;
    passSeriesRef.current = passSeries;
    failSeriesRef.current = failSeries;
    spotSeriesRef.current = spotSeries;

    return chart;
  }, []);

  useEffect(() => {
    const chart = initChart();
    if (!chart) return;

    return () => {
      chart.remove();
      chartRef.current = null;
    };
  }, [initChart]);

  useEffect(() => {
    if (!passSeriesRef.current || !failSeriesRef.current || !spotSeriesRef.current) return;

    const filteredPass = filterByTimeframe(passData, timeframe);
    const filteredFail = filterByTimeframe(failData, timeframe);
    const filteredSpot = filterByTimeframe(spotData, timeframe);

    if (filteredPass.length === 0) return;

    passSeriesRef.current.setData(toLineData(filteredPass));
    failSeriesRef.current.setData(toLineData(filteredFail));
    spotSeriesRef.current.setData(toLineData(filteredSpot));

    chartRef.current?.timeScale().fitContent();
  }, [timeframe, passData, failData, spotData]);

  useEffect(() => {
    if (!containerRef.current || !chartRef.current) return;
    const ro = new ResizeObserver(() => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: containerRef.current.clientWidth });
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // React to dark/light mode changes
  useEffect(() => {
    const mo = new MutationObserver(() => {
      if (!chartRef.current) return;
      const isDark = document.documentElement.classList.contains("dark");
      chartRef.current.applyOptions(getThemeOptions(isDark));
    });
    mo.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  return (
    <div className="flex flex-col border-t border-brand-border">
      {/* Legend */}
      <div className="flex items-center gap-4 px-6 py-2 border-b border-brand-border">
        <span className="flex items-center gap-1.5 text-[11px] font-mono">
          <span className="size-2 rounded-full bg-green-600 inline-block" />
          <span className="text-green-600 font-semibold">${lastPass?.close.toFixed(4)}</span>
          <span className="text-text-muted">IF APPROVED</span>
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-mono">
          <span className="size-2 rounded-full bg-red-600 inline-block" />
          <span className="text-red-600 font-semibold">${lastFail?.close.toFixed(4)}</span>
          <span className="text-text-muted">IF REJECTED</span>
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-mono">
          <span className="size-2 rounded-full bg-gray-400 inline-block" />
          <span className="text-text-secondary font-semibold">${lastSpot?.close.toFixed(4)}</span>
          <span className="text-text-muted">PRICE</span>
        </span>
      </div>

      <div ref={containerRef} className="w-full" />

      <OHLCStrip
        open={ohlcBar.open}
        high={ohlcBar.high}
        low={ohlcBar.low}
        close={ohlcBar.close}
      />

      <div className="flex items-center justify-end px-6 py-2 border-t border-brand-border">
        <TimeframeSelector value={timeframe} onChange={setTimeframe} />
      </div>
    </div>
  );
}
