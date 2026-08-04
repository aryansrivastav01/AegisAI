"use client";

interface AIAnalysis {
  summary: string;
  overall_risk: string;
  confidence: number;
  findings: string[];
  recommendations: string[];
}

interface AIReportProps {
  analysis: AIAnalysis | null;
}

export default function AIReport({
  analysis,
}: AIReportProps) {
  if (!analysis) return null;

  const riskColor =
    analysis.overall_risk === "High"
      ? "text-red-400"
      : analysis.overall_risk === "Medium"
      ? "text-yellow-400"
      : analysis.overall_risk === "Low"
      ? "text-green-400"
      : "text-cyan-400";

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">

      <h2 className="text-xl font-semibold text-white">
        AI Security Report
      </h2>

      <div className="mt-6 space-y-6">

        <div>
          <p className="text-sm text-slate-400">
            Summary
          </p>

          <p className="mt-2 text-white">
            {analysis.summary}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <p className="text-sm text-slate-400">
              Overall Risk
            </p>

            <p className={`mt-2 font-semibold ${riskColor}`}>
              {analysis.overall_risk}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Confidence
            </p>

            <p className="mt-2 font-semibold text-cyan-400">
              {analysis.confidence}%
            </p>
          </div>

        </div>

        <div>

          <p className="text-sm text-slate-400">
            Recommendations
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">

            {analysis.recommendations.map((item) => (
              <li key={item}>
                {item}
              </li>
            ))}

          </ul>

        </div>

      </div>

    </div>
  );
}