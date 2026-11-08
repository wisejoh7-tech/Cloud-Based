import React from "react";
import { TrendingUp, TrendingDown, Minus, Server, DollarSign, Activity, TicketCheck } from "lucide-react";
import { MetricItem } from "../data/portalData";

interface MetricCardProps {
  metric: MetricItem;
}

export function MetricCard({ metric }: MetricCardProps) {
  const getIcon = () => {
    switch (metric.id) {
      case "active-instances":
        return <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case "monthly-spend":
        return <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case "system-uptime":
        return <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
      case "open-tickets":
        return <TicketCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Activity className="h-5 w-5 text-blue-600" />;
    }
  };

  const getTrendBadge = () => {
    if (metric.trend === "up") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
          <TrendingUp className="h-3 w-3" />
          {metric.change}
        </span>
      );
    }
    if (metric.trend === "down") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
          <TrendingDown className="h-3 w-3" />
          {metric.change}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
        <Minus className="h-3 w-3" />
        {metric.change}
      </span>
    );
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{metric.title}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800">
          {getIcon()}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{metric.value}</h3>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800/80">
        <div className="flex items-center">{getTrendBadge()}</div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">{metric.description}</span>
      </div>
    </div>
  );
}
