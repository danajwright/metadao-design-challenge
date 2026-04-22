"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createChart, LineSeries, createSeriesMarkers } from "lightweight-charts";
import type { IChartApi, ISeriesApi, ISeriesMarkersPluginApi, SeriesType, Time } from "lightweight-charts";
import type { OHLCBar } from "@/lib/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MarkersPlugin = ISeriesMarkersPluginApi<any>;

type Props = {
  passData: OHLCBar[];
  failData: OHLCBar[];
  spotData: OHLCBar[];
  createdAt: string;
};

function toLineData(bars: OHLCBar[]) {
  return bars.map((b) => ({ time: b.time as Time, value: b.close }));
}

export function ProposalTradingCard({ passData, failData, spotData, createdAt }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const passSeriesRef = useRef<ISeriesApi<SeriesType> | null>(null);
  const failSeriesRef = useRef<ISeriesApi<SeriesType> | null>(null);
  const spotSeriesRef = useRef<ISeriesApi<SeriesType> | null>(null);
  const passMarkersRef = useRef<MarkersPlugin | null>(null);
  const failMarkersRef = useRef<MarkersPlugin | null>(null);
  const spotMarkersRef = useRef<MarkersPlugin | null>(null);

  const lastPass = passData[passData.length - 1];
  const lastFail = failData[failData.length - 1];
  const lastSpot = spotData[spotData.length - 1];

  const [displayPass, setDisplayPass] = useState(lastPass?.close);
  const [displayFail, setDisplayFail] = useState(lastFail?.close);
  const [displaySpot, setDisplaySpot] = useState(lastSpot?.close);

  const setMarkersAtTime = useCallback((time: Time) => {
    passMarkersRef.current?.setMarkers([{ time, position: "inBar", color: "#8aea92", shape: "circle", size: 0.5 }]);
    failMarkersRef.current?.setMarkers([{ time, position: "inBar", color: "#f7567c", shape: "circle", size: 0.5 }]);
    spotMarkersRef.current?.setMarkers([{ time, position: "inBar", color: "#ffe5d9", shape: "circle", size: 0.5 }]);
  }, []);

  const initChart = useCallback(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 150,
      layout: {
        background: { color: "#141211" },
        textColor: "#6e6357",
        fontSize: 10,
        fontFamily: "IBM Plex Mono, monospace",
        attributionLogo: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: { visible: false },
      timeScale: { borderColor: "#312d2a", timeVisible: true, secondsVisible: false },
      crosshair: {
        vertLine: { visible: false },
        horzLine: { visible: false, labelVisible: false },
      },
      handleScale: { mouseWheel: false },
    });

    const passSeries = chart.addSeries(LineSeries, {
      color: "#8aea92",
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
    });
    const failSeries = chart.addSeries(LineSeries, {
      color: "#f7567c",
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
    });
    const spotSeries = chart.addSeries(LineSeries, {
      color: "#ffe5d9",
      lineWidth: 1,
      lineStyle: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
    });

    passSeries.setData(toLineData(passData));
    failSeries.setData(toLineData(failData));
    spotSeries.setData(toLineData(spotData));
    chart.timeScale().fitContent();

    chartRef.current = chart;
    passSeriesRef.current = passSeries;
    failSeriesRef.current = failSeries;
    spotSeriesRef.current = spotSeries;
    passMarkersRef.current = createSeriesMarkers(passSeries, []);
    failMarkersRef.current = createSeriesMarkers(failSeries, []);
    spotMarkersRef.current = createSeriesMarkers(spotSeries, []);

    return chart;
  }, [passData, failData, spotData]);

  useEffect(() => {
    const chart = initChart();
    if (!chart) return;

    // Show dots at last data point by default
    if (lastPass) setMarkersAtTime(lastPass.time as Time);

    chart.subscribeCrosshairMove((param) => {
      const p = passSeriesRef.current ? param.seriesData.get(passSeriesRef.current) : undefined;
      const f = failSeriesRef.current ? param.seriesData.get(failSeriesRef.current) : undefined;
      const s = spotSeriesRef.current ? param.seriesData.get(spotSeriesRef.current) : undefined;

      if (!param.time) {
        // Mouse left — snap back to last data point
        if (lastPass) setMarkersAtTime(lastPass.time as Time);
        setDisplayPass(lastPass?.close);
        setDisplayFail(lastFail?.close);
        setDisplaySpot(lastSpot?.close);
        return;
      }

      if (p && "value" in p) setDisplayPass(p.value as number);
      if (f && "value" in f) setDisplayFail(f.value as number);
      if (s && "value" in s) setDisplaySpot(s.value as number);

      setMarkersAtTime(param.time as Time);
    });

    return () => {
      chart.remove();
      chartRef.current = null;
      passMarkersRef.current = null;
      failMarkersRef.current = null;
      spotMarkersRef.current = null;
    };
  }, [initChart, lastPass, setMarkersAtTime]);

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

  return (
    <div className="flex flex-col items-start">
      {/* Header */}
      <div className="flex h-[76px] items-center justify-between py-6 w-full">
        <span className="text-[18px] text-[#f7e7d3] leading-7 whitespace-nowrap">
          Proposal trading
        </span>
        <span className="text-[12px] text-[#a99986] leading-[18px] text-center whitespace-nowrap">
          {createdAt}
        </span>
      </div>

      {/* Chart */}
      <div ref={containerRef} className="w-full" />

      {/* Legend */}
      <div className="flex gap-[15px] items-center px-px py-[5px] w-full">
        <div className="flex gap-[6px] items-center py-3 rounded-[4px]">
          <div className="bg-[#8aea92] size-[6px] shrink-0 rounded-full" />
          <span className="text-[12px] text-[#a99986] leading-none whitespace-nowrap">
            <span className="font-['IBM_Plex_Mono',monospace] font-medium text-[#8aea92]">
              ${displayPass?.toFixed(4)}
            </span>
            {" if approved"}
          </span>
        </div>
        <div className="flex gap-[6px] items-center py-3 rounded-[4px]">
          <div className="bg-[#f7567c] size-[6px] shrink-0 rounded-full" />
          <span className="text-[12px] text-[#a99986] leading-none whitespace-nowrap">
            <span className="font-['IBM_Plex_Mono',monospace] font-medium text-[#f7567c]">
              {displayFail?.toFixed(4)}
            </span>
            {" if rejected"}
          </span>
        </div>
        <div className="flex gap-[6px] items-center py-3 rounded-[4px]">
          <div className="bg-[#ffe5d9] size-[6px] shrink-0 rounded-full" />
          <span className="text-[12px] text-[#a99986] leading-none whitespace-nowrap">
            <span className="font-['IBM_Plex_Mono',monospace] font-medium text-[#ffe5d9]">
              {displaySpot?.toFixed(4)}
            </span>
            {" spot price"}
          </span>
        </div>
      </div>
    </div>
  );
}
