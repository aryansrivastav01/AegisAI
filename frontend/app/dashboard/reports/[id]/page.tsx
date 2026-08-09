"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  FileText,
  ShieldAlert,
  Download,
  Trash2,
} from "lucide-react";

import { getAnalysisById, deleteAnalysis } from "@/services/history";
import type { HistoryItem } from "@/services/history";

export default function ReportDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [report, setReport] = useState<HistoryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReport() {
      try {
        const id = Number(params?.id);

        if (!id) {
          return;
        }

        const data = await getAnalysisById(id);
        setReport(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void loadReport();
  }, [params?.id]);

  async function handleDelete() {
    if (!report) {
      return;
    }

    const confirmed = window.confirm(
      "Delete this report from the database?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteAnalysis(report.id);
      router.push("/dashboard/reports");
    } catch (error) {
      console.error(error);
      alert("Unable to delete report.");
    }
  }

  if (loading) {
    return <p className="text-slate-400">Loading report...</p>;
  }

  if (!report) {
    return (
      <div className="space-y-4">
        <p className="text-slate-400">Report not found.</p>
        <Link
          href="/dashboard/reports"
          className="inline-flex items-center gap-2 text-cyan-400"
        >
          <ArrowLeft size={16} /> Back to reports
        </Link>
      </div>
    );
  }

  const analysis = report.analysis_json as {
    ai_analysis?: {
      summary?: string;
      confidence?: number;
      findings?: string[];
      recommendations?: string[];
      timeline?: string[];
      mitre?: Array<{ tactic: string; techniques: string[] }>;
      risk_explanation?: string[];
      narrative?: string[];
      executive_summary?: string;
    };
    summary?: {
      total_ips?: number;
      total_domains?: number;
      total_urls?: number;
      total_hashes?: number;
    };
    threat_intelligence?: {
      ips?: Array<{
        ioc: string;
        overall_reputation: string;
      }>;
    };
  };

  const aiAnalysis = analysis.ai_analysis ?? {};
  const executiveSummary = aiAnalysis.executive_summary || aiAnalysis.summary || "No executive summary available.";
  const findings = aiAnalysis.findings && aiAnalysis.findings.length > 0 ? aiAnalysis.findings : ["No findings were captured in this analysis."];
  const riskExplanation = aiAnalysis.risk_explanation && aiAnalysis.risk_explanation.length > 0 ? aiAnalysis.risk_explanation : ["No risk explanation was provided for this report."];
  const timeline = aiAnalysis.timeline && aiAnalysis.timeline.length > 0 ? aiAnalysis.timeline : ["No timeline details were generated for this report."];
  const mitre = aiAnalysis.mitre && aiAnalysis.mitre.length > 0 ? aiAnalysis.mitre : [{ tactic: "No ATT&CK mapping available", techniques: ["No mapping details were included."] }];
  const narrative = aiAnalysis.narrative && aiAnalysis.narrative.length > 0 ? aiAnalysis.narrative : ["No attack narrative was generated for this report."];
  const recommendations = aiAnalysis.recommendations && aiAnalysis.recommendations.length > 0 ? aiAnalysis.recommendations : ["No recommendations were generated for this report."];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Report Detail
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            {report.filename}
          </h1>
          <p className="mt-2 text-slate-400">
            Investigate the saved analysis and threat intelligence output.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white transition hover:border-red-400"
          >
            <Trash2 size={16} /> Delete
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300 transition hover:bg-cyan-500/20">
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 xl:col-span-2">
          <div className="flex items-center gap-3">
            <Brain className="text-cyan-400" size={20} />
            <h2 className="text-xl font-semibold text-white">AI Analysis</h2>
          </div>
          <p className="mt-4 text-slate-300">{executiveSummary}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-800/40 p-4">
              <p className="text-sm text-slate-400">Overall Risk</p>
              <p className="mt-2 font-semibold text-red-400">{report.overall_risk}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-800/40 p-4">
              <p className="text-sm text-slate-400">Confidence</p>
              <p className="mt-2 font-semibold text-cyan-400">{aiAnalysis.confidence ?? 0}%</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-amber-400" size={20} />
            <h2 className="text-xl font-semibold text-white">IOC Summary</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>IPs: {analysis.summary?.total_ips ?? 0}</p>
            <p>Domains: {analysis.summary?.total_domains ?? 0}</p>
            <p>URLs: {analysis.summary?.total_urls ?? 0}</p>
            <p>Hashes: {analysis.summary?.total_hashes ?? 0}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-3">
            <FileText className="text-cyan-400" size={20} />
            <h2 className="text-xl font-semibold text-white">Executive Summary</h2>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300">{executiveSummary}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-emerald-400" size={20} />
            <h2 className="text-xl font-semibold text-white">Threat Intelligence</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {(analysis.threat_intelligence?.ips ?? []).map((item: { ioc: string; overall_reputation: string }) => (
              <div key={item.ioc} className="rounded-lg border border-white/10 bg-slate-800/40 p-3">
                <p className="font-semibold text-white">{item.ioc}</p>
                <p className="mt-1 text-cyan-300">{item.overall_reputation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-3">
            <Brain className="text-violet-400" size={20} />
            <h2 className="text-xl font-semibold text-white">Findings & Evidence</h2>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {findings.map((finding: string) => (
              <li key={finding} className="rounded-lg border border-white/10 bg-slate-800/40 p-3">
                {finding}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-amber-400" size={20} />
            <h2 className="text-xl font-semibold text-white">Risk Explanation</h2>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {riskExplanation.map((item: string) => (
              <li key={item} className="rounded-lg border border-white/10 bg-slate-800/40 p-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-3">
            <FileText className="text-cyan-400" size={20} />
            <h2 className="text-xl font-semibold text-white">Timeline Reconstruction</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {timeline.map((step: string) => (
              <div key={step} className="rounded-lg border border-white/10 bg-slate-800/40 p-3">
                {step}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-emerald-400" size={20} />
            <h2 className="text-xl font-semibold text-white">MITRE ATT&CK Mapping</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {mitre.map((entry) => (
              <div key={entry.tactic} className="rounded-lg border border-white/10 bg-slate-800/40 p-3">
                <p className="font-semibold text-white">{entry.tactic}</p>
                <p className="mt-2 text-cyan-300">{entry.techniques.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-3">
            <Brain className="text-amber-400" size={20} />
            <h2 className="text-xl font-semibold text-white">Attack Narrative</h2>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {narrative.map((item: string) => (
              <li key={item} className="rounded-lg border border-white/10 bg-slate-800/40 p-3">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-rose-400" size={20} />
            <h2 className="text-xl font-semibold text-white">Recommendations</h2>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {recommendations.map((recommendation: string) => (
              <li key={recommendation} className="rounded-lg border border-white/10 bg-slate-800/40 p-3">
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
