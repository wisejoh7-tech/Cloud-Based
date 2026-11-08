import React from "react";
import { InvoiceItem } from "../data/portalData";
import { Download, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface InvoicesListProps {
  invoices: InvoiceItem[];
}

export function InvoicesList({ invoices }: InvoicesListProps) {
  const getInvoiceBadge = (status: InvoiceItem["status"]) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" /> Paid
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
            <Clock className="h-3 w-3" /> Due Soon
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
            <AlertCircle className="h-3 w-3" /> Overdue
          </span>
        );
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Billing & Statements</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Recent statements, payment status, and receipts</p>
        </div>
        <button className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400">
          View All Invoices
        </button>
      </div>

      <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
        {invoices.map((inv) => (
          <div key={inv.id} className="flex items-center justify-between py-3">
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 dark:text-white text-xs">{inv.invoiceNumber}</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">{inv.billingPeriod}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-semibold text-slate-900 dark:text-white text-xs">
                  ${inv.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                <div>{getInvoiceBadge(inv.status)}</div>
              </div>
              <button
                title="Download invoice PDF"
                className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
