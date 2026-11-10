"use client";

import React, { useState } from "react";
import { Search, Bell, Menu, Cloud, RefreshCw, CheckCircle2 } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
  activeEnvironment: string;
  onEnvironmentChange: (env: string) => void;
}

export function Header({ onMenuToggle, activeEnvironment, onEnvironmentChange }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-900/95 dark:supports-[backdrop-filter]:bg-slate-900/60 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative hidden w-64 md:block lg:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search resources, clusters, IPs, invoices..."
            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs text-slate-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Environment Selector */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs dark:border-slate-700 dark:bg-slate-800">
          <Cloud className="h-3.5 w-3.5 text-blue-500 ml-1.5" />
          <select
            value={activeEnvironment}
            onChange={(e) => onEnvironmentChange(e.target.value)}
            className="bg-transparent font-medium text-slate-700 focus:outline-none dark:text-slate-200"
          >
            <option value="Production (US-East)">Production (US-East)</option>
            <option value="Staging (US-West)">Staging (US-West)</option>
            <option value="DR Site (EU-Central)">DR Site (EU-Central)</option>
          </select>
        </div>

        {/* Sync / Refresh */}
        <button
          onClick={handleRefresh}
          title="Sync cloud state"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin text-blue-600" : ""}`} />
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                <span className="text-xs font-semibold text-slate-800 dark:text-white">Recent Alerts</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium cursor-pointer">Mark all read</span>
              </div>
              <div className="mt-2 space-y-2 text-xs">
                <div className="flex gap-2.5 rounded-lg p-2 bg-slate-50 dark:bg-slate-700/50">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">Scheduled backup succeeded</p>
                    <p className="text-[11px] text-slate-500">10 mins ago • Aurora DB Main</p>
                  </div>
                </div>
                <div className="flex gap-2.5 rounded-lg p-2 bg-slate-50 dark:bg-slate-700/50">
                  <div className="h-2 w-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">Monthly budget threshold at 71%</p>
                    <p className="text-[11px] text-slate-500">1 hour ago • Spend Alert</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
