"use client";

import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";

import {
  Clock3,
  FileText,
  Eye,
} from "lucide-react";

import {
  getHistory,
  HistoryItem,
} from "@/services/history";

export default function HistoryPanel() {

  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getHistory();

        setHistory(data);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const visibleHistory = history.slice(0, 4);

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Analysis History
        </h2>

        {history.length > 4 && (
          <Link href="/dashboard/reports" className="text-sm text-cyan-400 hover:text-cyan-300">
            View all
          </Link>
        )}
      </div>

      {loading ? (

        <p className="text-slate-400">
          Loading...
        </p>

      ) : history.length === 0 ? (

        <p className="text-slate-400">
          No previous analyses.
        </p>

      ) : (

        <div className="space-y-4">

          {visibleHistory.map((item) => (

            <div
              key={item.id}
              className="rounded-xl border border-white/10 bg-slate-800/40 p-4"
            >

              <div className="flex items-center justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <FileText
                      size={18}
                      className="text-cyan-400"
                    />

                    <span className="font-semibold text-white">
                      {item.filename}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    {item.summary}
                  </p>

                </div>

                <span
                  className={`rounded-lg px-3 py-1 text-sm font-medium ${
                    item.overall_risk ===
                    "High Risk"
                      ? "bg-red-500/20 text-red-400"
                      : item.overall_risk ===
                        "Medium Risk"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : item.overall_risk ===
                        "Low Risk"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-cyan-500/20 text-cyan-400"
                  }`}
                >
                  {item.overall_risk}
                </span>

              </div>

              <div className="mt-4 flex items-center justify-between gap-2 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Clock3 size={15} />
                  {new Date(item.created_at).toLocaleString()}
                </div>

                <Link href={`/dashboard/reports/${item.id}`} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-cyan-300 transition hover:border-cyan-400">
                  <Eye size={14} /> View report
                </Link>
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}