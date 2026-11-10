"use client";

import React from "react";
import {
  LayoutDashboard,
  Server,
  BarChart3,
  CreditCard,
  LifeBuoy,
  ShieldCheck,
  Cpu,
  Layers,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ currentTab, onTabChange, isOpen, onCloseMobile }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "instances", label: "Cloud Services", icon: Server },
    { id: "analytics", label: "Analytics & Usage", icon: BarChart3 },
    { id: "billing", label: "Billing & Invoices", icon: CreditCard },
    { id: "security", label: "Security & IAM", icon: ShieldCheck },
    { id: "support", label: "Support & Tickets", icon: LifeBuoy },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand header */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6 dark:border-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20">
            <Cpu className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 dark:text-white leading-tight">ApexCloud</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Client Portal</span>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Core Management
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onCloseMobile();
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-700 shadow-sm dark:bg-blue-950/60 dark:text-blue-400"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="h-4 w-4 text-blue-500" />}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-4 dark:border-blue-900/40 dark:from-slate-800/80 dark:to-slate-800/40">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-400">
              <Layers className="h-4 w-4" />
              <span>Multi-Cloud Status</span>
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              AWS, GCP, and Azure clusters operating normally.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">All systems operational</span>
            </div>
          </div>
        </div>

        {/* Footer client snippet */}
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white uppercase">
              SJ
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">Sarah Jenkins</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">Apex Global Tech</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
