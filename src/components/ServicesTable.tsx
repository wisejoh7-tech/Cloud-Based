"use client";

import React, { useState } from "react";
import { CloudService } from "../data/portalData";
import { Play, Square, RotateCw, MoreVertical, CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";

interface ServicesTableProps {
  services: CloudService[];
}

export function ServicesTable({ services: initialServices }: ServicesTableProps) {
  const [services, setServices] = useState<CloudService[]>(initialServices);
  const [filterType, setFilterType] = useState<string>("All");

  const toggleStatus = (id: string) => {
    setServices((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === "running" ? "stopped" : "running";
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };

  const filteredServices = filterType === "All"
    ? services
    : services.filter((srv) => srv.type === filterType);

  const getStatusBadge = (status: CloudService["status"]) => {
    switch (status) {
      case "running":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" /> Running
          </span>
        );
      case "warning":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
            <AlertTriangle className="h-3 w-3" /> Degraded
          </span>
        );
      case "stopped":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            <XCircle className="h-3 w-3" /> Stopped
          </span>
        );
      case "provisioning":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
            <Clock className="h-3 w-3 animate-spin" /> Provisioning
          </span>
        );
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Active Cloud Services & Workloads</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Provisioned infrastructure, database nodes, container clusters, and endpoints
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1 text-xs">
          {["All", "Kubernetes", "Database", "Compute", "AI Inference"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`rounded-lg px-2.5 py-1 font-medium transition-colors ${
                filterType === type
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-500">
              <th className="pb-3 font-semibold">Service Name</th>
              <th className="pb-3 font-semibold">Type</th>
              <th className="pb-3 font-semibold">Region</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Uptime</th>
              <th className="pb-3 font-semibold">Monthly Cost</th>
              <th className="pb-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredServices.map((service) => (
              <tr key={service.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="py-3.5 pr-3">
                  <div className="font-semibold text-slate-900 dark:text-white">{service.name}</div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500">{service.specs}</div>
                </td>
                <td className="py-3.5 pr-3">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {service.type}
                  </span>
                </td>
                <td className="py-3.5 pr-3 text-slate-600 dark:text-slate-400">{service.region}</td>
                <td className="py-3.5 pr-3">{getStatusBadge(service.status)}</td>
                <td className="py-3.5 pr-3 font-mono text-slate-600 dark:text-slate-300">{service.uptime}</td>
                <td className="py-3.5 pr-3 font-semibold text-slate-900 dark:text-white">
                  ${service.costMonthly.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </td>
                <td className="py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => toggleStatus(service.id)}
                      title={service.status === "running" ? "Stop service" : "Start service"}
                      className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      {service.status === "running" ? (
                        <Square className="h-3.5 w-3.5" />
                      ) : (
                        <Play className="h-3.5 w-3.5 text-emerald-600" />
                      )}
                    </button>
                    <button
                      title="Restart service"
                      className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      <RotateCw className="h-3.5 w-3.5" />
                    </button>
                    <button
                      title="Options"
                      className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
