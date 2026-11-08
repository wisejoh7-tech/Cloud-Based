"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { UsageDataPoint } from "../data/portalData";
import { DollarSign, Cpu } from "lucide-react";

interface UsageChartProps {
  data: UsageDataPoint[];
}

export function UsageChart({ data }: UsageChartProps) {
  const [viewMode, setViewMode] = useState<"spend" | "utilization">("spend");

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            {viewMode === "spend" ? "Cost & Spending Breakdown" : "Resource Utilization Trends"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {viewMode === "spend"
              ? "Monthly compute, storage, and networking expenditures across environments"
              : "Average CPU and RAM consumption aggregated over all running nodes"}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs dark:border-slate-800 dark:bg-slate-800/80">
          <button
            onClick={() => setViewMode("spend")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-medium transition-all ${
              viewMode === "spend"
                ? "bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <DollarSign className="h-3.5 w-3.5" />
            Spend ($)
          </button>
          <button
            onClick={() => setViewMode("utilization")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-medium transition-all ${
              viewMode === "utilization"
                ? "bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            Utilization (%)
          </button>
        </div>
      </div>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === "spend" ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.2} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `$${val / 1000}k`}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  borderColor: "rgba(51, 65, 85, 0.4)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                formatter={(value) => [`$${Number(value || 0).toLocaleString()}`, undefined]}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
              <Bar dataKey="computeCost" name="Compute" fill="#3b82f6" stackId="a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="storageCost" name="Storage" fill="#6366f1" stackId="a" />
              <Bar dataKey="networkCost" name="Networking" fill="#06b6d4" stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="memGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.2} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}%`}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  borderColor: "rgba(51, 65, 85, 0.4)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                }}
                formatter={(value) => [`${value}%`, undefined]}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
              <Area
                type="monotone"
                dataKey="cpuUtilization"
                name="CPU Utilization"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#cpuGradient)"
              />
              <Area
                type="monotone"
                dataKey="memoryUtilization"
                name="RAM Utilization"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#memGradient)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
