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

function formatTime(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
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
  const [dateLabel, setDateLabel] = useState<{ x: number; text: string } | null>(null);

  const setMarkersAtTime = useCallback((time: Time) => {
    passMarkersRef.current?.setMarkers([{ time, position: "inBar", color: "#8aea92", shape: "circle", size: 0.5 }]);
    failMarkersRef.current?.setMarkers([{ time, position: "inBar", color: "#f7567c", shape: "circle", size: 0.5 }]);
    spotMarkersRef.current?.setMarkers([{ time, position: "inBar", color: "#ffe5d9", shape: "circle", size: 0.5 }]);
  }, []);

  const initChart = useCallback(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 135,
      layout: {
        background: { color: "#141211" },
        textColor: "#6e6357",
        fontSize: 11,
        fontFamily: "Inter, sans-serif",
        attributionLogo: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: { visible: false },
      timeScale: { borderColor: "#312d2a", timeVisible: true, secondsVisible: false },
      crosshair: {
        vertLine: { visible: false, labelVisible: false },
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

    if (lastPass) setMarkersAtTime(lastPass.time as Time);

    chart.subscribeCrosshairMove((param) => {
      const p = passSeriesRef.current ? param.seriesData.get(passSeriesRef.current) : undefined;
      const f = failSeriesRef.current ? param.seriesData.get(failSeriesRef.current) : undefined;
      const s = spotSeriesRef.current ? param.seriesData.get(spotSeriesRef.current) : undefined;

      if (!param.time) {
        if (lastPass) setMarkersAtTime(lastPass.time as Time);
        setDisplayPass(lastPass?.close);
        setDisplayFail(lastFail?.close);
        setDisplaySpot(lastSpot?.close);
        setDateLabel(null);
        return;
      }

      if (p && "value" in p) setDisplayPass(p.value as number);
      if (f && "value" in f) setDisplayFail(f.value as number);
      if (s && "value" in s) setDisplaySpot(s.value as number);

      setMarkersAtTime(param.time as Time);

      if (param.point) {
        setDateLabel({
          x: param.point.x,
          text: formatTime(param.time as number),
        });
      }
    });

    return () => {
      chart.remove();
      chartRef.current = null;
      passMarkersRef.current = null;
      failMarkersRef.current = null;
      spotMarkersRef.current = null;
    };
  }, [initChart, lastPass, lastFail, lastSpot, setMarkersAtTime]);

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
      <div className="flex h-[68px] items-center justify-between pt-[12px] pb-[5px] w-full">
        <span className="text-[14px] text-[#f7e7d3] leading-[25px] whitespace-nowrap">
          Proposal trading
        </span>
        <span className="text-[11px] text-[#a99986] leading-[16px] text-center whitespace-nowrap">
          {createdAt}
        </span>
      </div>

      {/* Chart */}
      <div className="relative w-full">
        <div ref={containerRef} className="w-full" />
        {dateLabel && (
          <div
            className="absolute z-10 pointer-events-none"
            style={{ left: dateLabel.x, bottom: 27, transform: "translateX(-50%)" }}
          >
            <span className="text-[#a99986] text-[11px] font-['Inter',sans-serif] whitespace-nowrap">
              {dateLabel.text}
            </span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-[14px] items-center px-px py-[5px] w-full">
        <div className="flex gap-[5px] items-center py-[11px] rounded-[4px]">
          <div className="bg-[#8aea92] size-[5px] shrink-0 rounded-full" />
          <span className="text-[11px] text-[#a99986] leading-none whitespace-nowrap">
            <span className="font-['IBM_Plex_Mono',monospace] font-medium text-[#8aea92]">
              ${displayPass?.toFixed(4)}
            </span>
            {" if approved"}
          </span>
        </div>
        <div className="flex gap-[5px] items-center py-[11px] rounded-[4px]">
          <div className="bg-[#f7567c] size-[5px] shrink-0 rounded-full" />
          <span className="text-[11px] text-[#a99986] leading-none whitespace-nowrap">
            <span className="font-['IBM_Plex_Mono',monospace] font-medium text-[#f7567c]">
              {displayFail?.toFixed(4)}
            </span>
            {" if rejected"}
          </span>
        </div>
        <div className="flex gap-[5px] items-center py-[11px] rounded-[4px]">
          <div className="bg-[#ffe5d9] size-[5px] shrink-0 rounded-full" />
          <span className="text-[11px] text-[#a99986] leading-none whitespace-nowrap">
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
