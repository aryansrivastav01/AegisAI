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

      <h2 className="text-lg font-semibold text-white">
        Upload Status
      </h2>

      <div className="mt-6">

        {analysis ? (
          <div>

            <p className="text-green-400">
              Analysis Completed
            </p>

            <p className="mt-2 text-slate-400">
              Risk:
              {" "}
              {analysis.summary.overall_risk}
            </p>

          </div>
        ) : (
          <p className="text-slate-400">
            No upload yet.
          </p>
        )}

      </div>

    </div>
  );
}