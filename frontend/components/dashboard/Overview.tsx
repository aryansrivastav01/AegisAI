"use client";

import { useRef, useState } from "react";
import {
  ShieldAlert,
  FileText,
  Brain,
  Globe,
  ArrowRight,
} from "lucide-react";

import StatCard from "./StatCard";
import AIReport from "./analysis/AIReport";
import { uploadSecurityLog, type UploadResponse } from "@/services/upload";

export default function Overview() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [analysis, setAnalysis] = useState<UploadResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFile(file: File) {
    try {
      setLoading(true);

      const result = await uploadSecurityLog(file);

      console.log(result);

      setAnalysis(result);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (    <div className="space-y-8">

      <input
        ref={fileInputRef}
        hidden
        type="file"
        accept=".json"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            void handleFile(file);
          }
        }}
      />

      {/* Top Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Threat Score"
          value={analysis?.summary.overall_risk ?? "82%"}
          icon={ShieldAlert}
          color="text-red-400"
          change="+8%"
        />

        <StatCard
          title="IOCs Detected"
          value={
            analysis
              ? String(
                  analysis.summary.total_ips +
                    analysis.summary.total_domains +
                    analysis.summary.total_urls +
                    analysis.summary.total_hashes
                )
              : "143"
          }
          icon={Globe}
          color="text-cyan-400"
          change="+27%"
        />

        <StatCard
          title="AI Reports"
          value={analysis ? "1" : "18"}
          icon={Brain}
          color="text-violet-400"
          change="+12%"
        />

        <StatCard
          title="Analyses"
          value={analysis ? "1" : "254"}
          icon={FileText}
          color="text-emerald-400"
          change="+19%"
        />

      </div>

      {/* Bottom Grid */}

      <div className="grid gap-6 xl:grid-cols-3">

        {/* Recent Activity */}

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl xl:col-span-2">

          <h2 className="text-xl font-semibold text-white">
            Recent Activity
          </h2>

          <div className="mt-6 space-y-4">

            {(analysis
              ? [
                  {
                    title: "JSON Analysis Completed",
                    risk: analysis.summary.overall_risk,
                    color:
                      analysis.summary.overall_risk === "High Risk"
                        ? "text-red-400"
                        : analysis.summary.overall_risk === "Medium Risk"
                        ? "text-yellow-400"
                        : "text-green-400",
                  },
                ]
              : [
                  {
                    title: "Windows Event Log",
                    risk: "High",
                    color: "text-red-400",
                  },
                  {
                    title: "Apache Access Log",
                    risk: "Medium",
                    color: "text-yellow-400",
                  },
                  {
                    title: "Firewall Logs",
                    risk: "Low",
                    color: "text-green-400",
                  },
                ]).map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-800/40 p-4"
              >
                <div>

                  <h3 className="font-medium text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    AI investigation completed
                  </p>

                </div>

                <span className={`font-semibold ${item.color}`}>
                  {item.risk}
                </span>

              </div>
            ))}

          </div>

        </div>

        {/* Quick Actions */}

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">

          <h2 className="text-xl font-semibold text-white">
            Quick Actions
          </h2>

          <div className="mt-6 space-y-4">

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-800/40 px-5 py-4 text-left text-white transition hover:border-cyan-400 hover:bg-slate-800 disabled:opacity-60"
            >
              <span>
                {loading
                  ? "Analyzing..."
                  : "Upload Security Logs"}
              </span>

              <ArrowRight
                size={18}
                className="text-cyan-400"
              />

            </button>

            {[
              "Generate AI Report",
              "Threat Intelligence Lookup",
              "View Reports",
            ].map((item) => (
              <button
                key={item}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-800/40 px-5 py-4 text-left text-white transition hover:border-cyan-400 hover:bg-slate-800"
              >
                <span>{item}</span>

                <ArrowRight
                  size={18}
                  className="text-cyan-400"
                />

              </button>
            ))}

          </div>

        </div>

      </div>

      {analysis && (
        <AIReport
          analysis={analysis.ai_analysis}
        />
      )}      

    </div>
  );
}