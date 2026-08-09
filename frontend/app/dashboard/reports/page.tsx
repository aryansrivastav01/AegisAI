"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FileText, Trash2 } from "lucide-react";

import { deleteAnalysis, getHistory, type HistoryItem } from "@/services/history";

function ReportsList() {
  const [reports, setReports] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams?.get("q")?.toLowerCase() || "";

  async function loadReports() {
    try {
      const data = await getHistory();
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadReports();
  }, []);

  async function handleDelete(id: number) {
    const confirmed = window.confirm("Delete this report?");
    if (!confirmed) return;

    try {
      await deleteAnalysis(id);
      await loadReports();
    } catch (error) {
      console.error(error);
      alert("Unable to delete report.");
    }
  }

  const filteredReports = reports.filter(r => 
    !query || 
    r.filename.toLowerCase().includes(query) || 
    r.summary.toLowerCase().includes(query) ||
    r.overall_risk.toLowerCase().includes(query)
  );

  if (loading) {
    return <p className="text-slate-400">Loading reports...</p>;
  }

  if (reports.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-8 text-slate-400">
        No reports yet. Upload a security log to generate the first analysis.
      </div>
    );
  }

  if (filteredReports.length === 0 && query) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-8 text-slate-400">
        No reports match your search query "{query}".
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {filteredReports.map((report) => (
        <div key={report.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <FileText className="text-cyan-400" size={18} />
                <Link
                  href={`/dashboard/reports/${report.id}`}
                  className="text-lg font-semibold text-white hover:text-cyan-300"
                >
                  {report.filename}
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">{report.summary}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`rounded-full border px-3 py-1 text-sm ${report.overall_risk === 'High Risk' || report.overall_risk === 'Critical' ? 'border-red-500/30 bg-red-500/10 text-red-400' : report.overall_risk === 'Medium Risk' ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'}`}>
                {report.overall_risk}
              </span>
              <button
                onClick={() => void handleDelete(report.id)}
                className="rounded-xl border border-white/10 p-2 text-slate-400 transition hover:border-red-400 hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Created {new Date(report.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Reports</h1>
          <p className="mt-2 text-slate-400">
            Browse prior analyses, inspect findings and manage saved reports.
          </p>
        </div>
      </div>
      <Suspense fallback={<p className="text-slate-400">Loading...</p>}>
        <ReportsList />
      </Suspense>
    </div>
  );
}