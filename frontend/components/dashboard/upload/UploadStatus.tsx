"use client";

import type { UploadResponse } from "@/services/upload";

interface UploadStatusProps {
  analysis: UploadResponse | null;
}

export default function UploadStatus({
  analysis,
}: UploadStatusProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
      <h2 className="text-lg font-semibold text-white">Upload Status</h2>

      <div className="mt-6 space-y-4">
        {analysis ? (
          <>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-emerald-400">Upload Successful</p>
              <p className="mt-2 text-sm text-slate-300">{analysis.message}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-800/40 p-4 text-sm text-slate-300">
              <p className="font-semibold text-white">Upload Summary</p>
              <div className="mt-3 space-y-2">
                <p>Risk: {analysis.summary.overall_risk}</p>
                <p>IPs: {analysis.summary.total_ips}</p>
                <p>Domains: {analysis.summary.total_domains}</p>
                <p>URLs: {analysis.summary.total_urls}</p>
                <p>Hashes: {analysis.summary.total_hashes}</p>
              </div>
            </div>

            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-cyan-300">
              <p className="font-semibold">Upload Summary</p>
              <p className="mt-2 text-slate-200">{analysis.ai_analysis.summary}</p>
            </div>
          </>
        ) : (
          <p className="text-slate-400">No upload yet. Drop a JSON file to begin the workflow.</p>
        )}
      </div>
    </div>
  );
}