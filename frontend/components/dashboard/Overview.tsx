"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldAlert, FileText, Brain, Globe, ArrowRight } from "lucide-react";

import StatCard from "./StatCard";
import HistoryPanel from "./history/HistoryPanel";
import { getHistory, type HistoryItem } from "@/services/history";

type HistoryPayload = {
  summary?: {
    overall_risk?: string;
    total_ips?: number;
    total_domains?: number;
    total_urls?: number;
    total_hashes?: number;
  };
  iocs?: {
    ips?: string[];
    domains?: string[];
    urls?: string[];
    hashes?: string[];
  };
  ai_analysis?: {
    summary?: string;
    overall_risk?: string;
    confidence?: number;
    executive_summary?: string;
    narrative?: string | string[];
  };
  threat_intelligence?: {
    ips?: Array<unknown>;
  };
};

const quickActions = [
  {
    title: "Upload Security Logs",
    href: "/dashboard/upload",
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
  },
  {
    title: "Threat Intelligence",
    href: "/dashboard/threat-intel",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
  },
];

export default function Overview() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadHistory() {
    setLoading(true);

    try {
      const data = await getHistory();
      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadHistory();

    const onFocus = () => {
      void loadHistory();
    };

    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const sortedHistory = [...history].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const latestReport = sortedHistory[0];
  const latestPayload = latestReport?.analysis_json as HistoryPayload | undefined;

  const iocCount =
    latestPayload?.summary
      ? (latestPayload.summary.total_ips ?? 0) +
        (latestPayload.summary.total_domains ?? 0) +
        (latestPayload.summary.total_urls ?? 0) +
        (latestPayload.summary.total_hashes ?? 0)
      : (latestPayload?.iocs?.ips?.length ?? 0) +
        (latestPayload?.iocs?.domains?.length ?? 0) +
        (latestPayload?.iocs?.urls?.length ?? 0) +
        (latestPayload?.iocs?.hashes?.length ?? 0);

  const attackNarrative =
    latestPayload?.ai_analysis?.narrative &&
    (Array.isArray(latestPayload.ai_analysis.narrative)
      ? latestPayload.ai_analysis.narrative.length > 0
      : latestPayload.ai_analysis.narrative.toString().trim().length > 0)
      ? Array.isArray(latestPayload.ai_analysis.narrative)
        ? latestPayload.ai_analysis.narrative.join("\n\n")
        : latestPayload.ai_analysis.narrative
      : latestPayload?.ai_analysis?.summary ??
        "The attack narrative is generated here once AI analysis completes.";

  const executiveSummary =
    latestPayload?.ai_analysis?.executive_summary ||
    latestPayload?.ai_analysis?.summary ||
    "The executive summary will appear here after a new upload is processed.";

  const latestSummaryPreview = latestPayload?.summary
    ? `IPs: ${latestPayload.summary.total_ips ?? 0} • Domains: ${latestPayload.summary.total_domains ?? 0} • URLs: ${latestPayload.summary.total_urls ?? 0} • Hashes: ${latestPayload.summary.total_hashes ?? 0}`
    : "No summary data yet.";
  const recentReports = sortedHistory.slice(0, 3);
  const threatFeedCount = latestPayload?.threat_intelligence?.ips?.length ?? 0;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Threat Score"
          value={latestReport?.overall_risk ?? "No Data"}
          icon={ShieldAlert}
          color="text-red-400"
          change={latestReport ? "Updated" : "N/A"}
          subtext="from latest scan"
        />

        <StatCard
          title="Total Reports"
          value={history.length ? String(history.length) : "0"}
          icon={FileText}
          color="text-cyan-400"
          change={`+${Math.min(history.length, 3)}`}
          subtext="recent analyses"
        />

        <StatCard
          title="Threat Feed"
          value={threatFeedCount ? String(threatFeedCount) : "0"}
          icon={Brain}
          color="text-violet-400"
          change={threatFeedCount > 0 ? "Active" : "None"}
          subtext="indicators matched"
        />

        <StatCard
          title="IOC Count"
          value={iocCount ? String(iocCount) : "0"}
          icon={Globe}
          color="text-emerald-400"
          change={iocCount > 0 ? "Extracted" : "None"}
          subtext="in latest report"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Latest Analysis Summary</h2>
          <div className="mt-6 space-y-6 text-slate-300">
            <div>
              <p className="text-sm text-cyan-300">Attack Narrative</p>
              <div className="mt-4 whitespace-pre-line rounded-2xl border border-white/10 bg-slate-800/40 p-5 text-sm leading-7 text-slate-200">
                {loading
                  ? "Loading latest report..."
                  : attackNarrative}
              </div>
            </div>

            <div>
              <p className="text-sm text-cyan-300">Executive Summary</p>
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-800/40 p-5 text-sm leading-7 text-slate-200">
                {loading
                  ? "Fetching the latest executive summary..."
                  : executiveSummary}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
          <div className="mt-6 space-y-3">
            {quickActions.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-800/40 px-5 py-4 text-left text-white transition hover:border-cyan-400 hover:bg-slate-800"
              >
                <span>{item.title}</span>
                <ArrowRight size={18} className="text-cyan-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl xl:col-span-2">
          <h2 className="text-xl font-semibold text-white">Recent Reports</h2>

          <div className="mt-6 space-y-4">
            {recentReports.length === 0 ? (
              <p className="text-slate-400">No reports yet. Upload a JSON log to start your first workflow.</p>
            ) : (
              recentReports.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-800/40 p-4">
                  <div>
                    <h3 className="font-medium text-white">{item.filename}</h3>
                    <p className="text-sm text-slate-400">{item.summary}</p>
                  </div>
                  <span className={`font-semibold ${item.overall_risk === "High Risk" ? "text-red-400" : item.overall_risk === "Medium Risk" ? "text-yellow-400" : "text-green-400"}`}>
                    {item.overall_risk}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">History</h2>
          <div className="mt-6">
            <HistoryPanel />
          </div>
        </div>
      </div>
    </div>
  );
}