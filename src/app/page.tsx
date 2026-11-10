"use client";

import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MetricCard } from "../components/MetricCard";
import { UsageChart } from "../components/UsageChart";
import { ServicesTable } from "../components/ServicesTable";
import { InvoicesList } from "../components/InvoicesList";
import {
  clientProfile,
  dashboardMetrics,
  usageAnalyticsData,
  cloudServicesData,
  recentActivities,
  invoiceList,
} from "../data/portalData";
import {
  Shield,
  Plus,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<string>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeEnvironment, setActiveEnvironment] = useState<string>("Production (US-East)");

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <Header
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          activeEnvironment={activeEnvironment}
          onEnvironmentChange={setActiveEnvironment}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Top Welcome / Organization Banner */}
            <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 p-6 text-white shadow-lg md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase backdrop-blur-md">
                    {clientProfile.plan}
                  </span>
                  <span className="text-xs text-blue-100">Org ID: {clientProfile.organizationId}</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Welcome back, {clientProfile.name}
                </h1>
                <p className="text-sm text-blue-100">
                  {clientProfile.company} • Active Region: {activeEnvironment}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-blue-700 shadow-md transition-all hover:bg-blue-50">
                  <Plus className="h-4 w-4" />
                  Deploy New Service
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  <ExternalLink className="h-4 w-4" />
                  Cloud Console
                </button>
              </div>
            </div>

            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {dashboardMetrics.map((metric) => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </div>

            {/* Main Interactive Graphs & Spend Overview */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <UsageChart data={usageAnalyticsData} />
              </div>

              {/* Monthly Budget & Resource Health Card */}
              <div className="flex flex-col gap-6">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">Budget & Cap</h2>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                      Normal
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Monthly billing cycle ends in 12 days
                  </p>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-600 dark:text-slate-400">Spend: $14,280.50</span>
                      <span className="text-slate-900 dark:text-white font-bold">Limit: $20,000.00</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                        style={{ width: `${(clientProfile.currentCycleSpend / clientProfile.budgetLimit) * 100}%` }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                      <span>71.4% consumed</span>
                      <span>$5,719.50 remaining</span>
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/50">
                    <div className="flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Cost Optimization Tip</span>
                    </div>
                    <p className="mt-1 text-slate-600 dark:text-slate-400 text-[11px]">
                      Switch 4 development instances to auto-shutdown schedules to save up to $340/month.
                    </p>
                  </div>
                </div>

                {/* Quick Security & Compliance Status */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">Compliance & Security</h2>
                    <Shield className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="mt-3 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">SOC 2 Type II Compliance</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">HIPAA & GDPR Safeguards</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">MFA Enforced Users</span>
                      <span className="font-semibold text-slate-900 dark:text-white">100% (42/42)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Automated Daily Backups</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Encrypted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cloud Services Table */}
            <div>
              <ServicesTable services={cloudServicesData} />
            </div>

            {/* Bottom Row: Invoices & Recent Audit Logs */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <InvoicesList invoices={invoiceList} />

              {/* Recent Audit / Security Activity */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">Recent Activity & Logs</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Real-time audit trail of infrastructure changes</p>
                  </div>
                  <button className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400">
                    Audit Log
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {recentActivities.map((act) => (
                    <div
                      key={act.id}
                      className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-3 dark:border-slate-800/80 dark:bg-slate-800/40"
                    >
                      {act.status === "warning" ? (
                        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-800 dark:text-white">{act.action}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {act.resource} • by {act.user}
                        </p>
                      </div>
                      <span className="text-[11px] text-slate-400 shrink-0">{act.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
