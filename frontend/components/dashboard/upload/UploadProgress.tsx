"use client";

import type { UploadResponse } from "@/services/upload";

interface UploadProgressProps {
  loading: boolean;
  analysis: UploadResponse | null;
}

export default function UploadProgress({
  loading,
  analysis,
}: UploadProgressProps) {
  const progress = loading ? "w-3/4" : analysis ? "w-full" : "w-0";
  const stages = [
    "Upload Log File",
    "Extract IOCs",
    "Threat Intelligence Lookup",
    "Risk Correlation",
    "Prompt Generation",
    "Local LLM Analysis",
    "Structured AI Report",
    "SOC Analyst Output",
  ];
  const message = loading
    ? "Processing the uploaded JSON through the SOC workflow"
    : analysis
      ? "Upload completed successfully"
      : "Waiting for upload";

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
      <h2 className="text-lg font-semibold text-white">Upload Progress</h2>

      <div className="mt-6">
        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div className={`h-full rounded-full bg-cyan-400 transition-all duration-500 ${progress}`} />
        </div>

        <p className="mt-4 text-sm text-slate-400">{message}</p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {stages.map((stage, index) => {
            const isDone = analysis ? index < stages.length : loading ? index < 4 : false;
            return (
              <div
                key={stage}
                className={`rounded-xl border px-3 py-3 text-sm ${
                  isDone
                    ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-200"
                    : "border-white/10 bg-slate-800/40 text-slate-400"
                }`}
              >
                {stage}
              </div>
            );
          })}
        </div>

        {analysis && (
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
            <p className="font-semibold">Analysis completed</p>
            <p className="mt-1">{analysis.summary.overall_risk}</p>
          </div>
        )}
      </div>
    </div>
  );
}