"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bug,
  Database,
  Fingerprint,
  Globe2,
  Link2,
  Network,
  Search,
  ShieldAlert,
} from "lucide-react";

import Link from "next/link";

import { getHistory, type HistoryItem } from "@/services/history";

type ThreatIndicator = {
  ioc: string;
  risk: string;
  source: string;
};

type PairMatch = {
  domain: string;
  ip: string;
  risk: string;
  source: string;
};

export default function ThreatIntelPage() {
  const [reports, setReports] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    ips: false,
    hashes: false,
    domains: false,
    urls: false,
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await getHistory();
        setReports(data);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const recentReports = useMemo(() => reports.slice(0, 10), [reports]);

  const indicators = useMemo<ThreatIndicator[]>(() => {
    return recentReports.flatMap((report) => {
      const analysis = report.analysis_json as {
        threat_intelligence?: {
          ips?: Array<{
            ioc: string;
            overall_reputation: string;
          }>;
        };
      };

      return (analysis.threat_intelligence?.ips ?? []).map((item) => ({
        ioc: item.ioc,
        risk: item.overall_reputation,
        source: report.filename,
      }));
    });
  }, [recentReports]);

  const toggleSection = (section: string) => {
    setExpandedSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  };

  const visibleItems = (items: string[], section: string) => {
    if (expandedSections[section]) {
      return items;
    }

    return items.slice(0, 8);
  };

  const inventory = useMemo(() => {
    const ips = new Set<string>();
    const hashes = new Set<string>();
    const domains = new Set<string>();
    const urls = new Set<string>();
    const pairs: PairMatch[] = [];

    recentReports.forEach((report) => {
      const analysis = report.analysis_json as {
        iocs?: {
          ips?: string[];
          domains?: string[];
          urls?: string[];
          hashes?: string[];
        };
        threat_intelligence?: {
          ips?: Array<{
            ioc: string;
            overall_reputation: string;
          }>;
        };
      };

      const iocs = analysis.iocs ?? {};
      const threatIps = (analysis.threat_intelligence?.ips ?? []).filter(
        (item) => item?.ioc && ["High Risk", "Medium Risk"].includes(item.overall_reputation),
      );

      (iocs.ips ?? []).forEach((ip) => ip && ips.add(ip));
      (iocs.hashes ?? []).forEach((hash) => hash && hashes.add(hash));
      (iocs.domains ?? []).forEach((domain) => domain && domains.add(domain));
      (iocs.urls ?? []).forEach((url) => url && urls.add(url));

      if (threatIps.length && (iocs.domains ?? []).length) {
        (iocs.domains ?? []).forEach((domain) => {
          if (!domain) return;

          threatIps.forEach((item) => {
            pairs.push({
              domain,
              ip: item.ioc,
              risk: item.overall_reputation,
              source: report.filename,
            });
          });
        });
      }
    });

    return {
      ips: Array.from(ips).sort(),
      hashes: Array.from(hashes).sort(),
      domains: Array.from(domains).sort(),
      urls: Array.from(urls).sort(),
      pairs,
    };
  }, [recentReports]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Threat Intelligence</h1>
        <p className="mt-2 text-slate-400">
          Review recent IOC inventories, suspicious domain/IP relationships, and reputation data from saved analyses.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center gap-3">
              <Search className="text-cyan-400" size={20} />
              <h2 className="text-xl font-semibold text-white">Recent IOC Inventory</h2>
            </div>

            {loading ? (
              <p className="mt-6 text-slate-400">Loading threat indicators...</p>
            ) : (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-slate-800/40 p-4">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Network size={16} />
                    <h3 className="font-semibold">Unique IPs</h3>
                  </div>
                  <div className={`mt-4 ${expandedSections.ips ? "max-h-48 overflow-y-auto" : "overflow-hidden"}`}>
                    <div className="flex min-w-0 flex-wrap gap-2">
                      {inventory.ips.length === 0 ? (
                        <p className="text-sm text-slate-400">No IPs found.</p>
                      ) : (
                        visibleItems(inventory.ips, "ips").map((ip, idx) => (
                          <span key={`${ip}-${idx}`} className="max-w-full break-all rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-sm text-cyan-200">
                            {ip}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                  {inventory.ips.length > 8 ? (
                    <button
                      type="button"
                      onClick={() => toggleSection("ips")}
                      className="mt-3 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
                    >
                      {expandedSections.ips ? "Show less IPs" : "View all IPs"}
                    </button>
                  ) : null}
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-800/40 p-4">
                  <div className="flex items-center gap-2 text-fuchsia-300">
                    <Fingerprint size={16} />
                    <h3 className="font-semibold">Unique Hashes</h3>
                  </div>
                  <div className={`mt-4 ${expandedSections.hashes ? "max-h-48 overflow-y-auto" : "overflow-hidden"}`}>
                    <div className="flex min-w-0 flex-wrap gap-2">
                      {inventory.hashes.length === 0 ? (
                        <p className="text-sm text-slate-400">No hashes found.</p>
                      ) : (
                        visibleItems(inventory.hashes, "hashes").map((hash, idx) => (
                          <span key={`${hash}-${idx}`} className="max-w-full break-all rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-2.5 py-1 text-sm text-fuchsia-200">
                            {hash}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                  {inventory.hashes.length > 8 ? (
                    <button
                      type="button"
                      onClick={() => toggleSection("hashes")}
                      className="mt-3 text-sm font-medium text-fuchsia-300 transition hover:text-fuchsia-200"
                    >
                      {expandedSections.hashes ? "Show less hashes" : "View all hashes"}
                    </button>
                  ) : null}
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-800/40 p-4">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Globe2 size={16} />
                    <h3 className="font-semibold">Unique Domains</h3>
                  </div>
                  <div className={`mt-4 ${expandedSections.domains ? "max-h-48 overflow-y-auto" : "overflow-hidden"}`}>
                    <div className="flex min-w-0 flex-wrap gap-2">
                      {inventory.domains.length === 0 ? (
                        <p className="text-sm text-slate-400">No domains found.</p>
                      ) : (
                        visibleItems(inventory.domains, "domains").map((domain, idx) => (
                          <span key={`${domain}-${idx}`} className="max-w-full break-all rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-sm text-emerald-200">
                            {domain}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                  {inventory.domains.length > 8 ? (
                    <button
                      type="button"
                      onClick={() => toggleSection("domains")}
                      className="mt-3 text-sm font-medium text-emerald-300 transition hover:text-emerald-200"
                    >
                      {expandedSections.domains ? "Show less domains" : "View all domains"}
                    </button>
                  ) : null}
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-800/40 p-4">
                  <div className="flex items-center gap-2 text-amber-300">
                    <Link2 size={16} />
                    <h3 className="font-semibold">Unique URLs</h3>
                  </div>
                  <div className={`mt-4 ${expandedSections.urls ? "max-h-48 overflow-y-auto" : "overflow-hidden"}`}>
                    <div className="flex min-w-0 flex-wrap gap-2">
                      {inventory.urls.length === 0 ? (
                        <p className="text-sm text-slate-400">No URLs found.</p>
                      ) : (
                        visibleItems(inventory.urls, "urls").map((url, idx) => (
                          <span key={`${url}-${idx}`} className="max-w-full break-all rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-sm text-violet-200">
                            {url}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                  {inventory.urls.length > 8 ? (
                    <button
                      type="button"
                      onClick={() => toggleSection("urls")}
                      className="mt-3 text-sm font-medium text-amber-300 transition hover:text-amber-200"
                    >
                      {expandedSections.urls ? "Show less URLs" : "View all URLs"}
                    </button>
                  ) : null}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center gap-3">
              <Bug className="text-rose-400" size={20} />
              <h2 className="text-xl font-semibold text-white">Malicious Domain/IP Pairs</h2>
            </div>

            {inventory.pairs.length === 0 ? (
              <p className="mt-6 text-slate-400">No risky domain/IP pairs detected in recent analyses.</p>
            ) : (
              <div className="mt-6 space-y-3">
                {inventory.pairs.map((pair, idx) => (
                  <div key={`${pair.domain}-${pair.ip}-${pair.source}-${idx}`} className="rounded-xl border border-white/10 bg-slate-800/40 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-white">{pair.domain}</p>
                        <p className="mt-1 text-sm text-slate-400">↳ {pair.ip}</p>
                      </div>
                      <div className="text-right">
                        <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-sm text-rose-300">
                          {pair.risk}
                        </span>
                        <p className="mt-2 text-xs text-slate-500">{pair.source}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-amber-400" size={20} />
              <h2 className="text-xl font-semibold text-white">Threat Coverage</h2>
            </div>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-800/40 p-3">
                <span>VirusTotal</span>
                <span className="text-cyan-300">Enabled</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-800/40 p-3">
                <span>AbuseIPDB</span>
                <span className="text-cyan-300">Enabled</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center gap-3">
              <Database className="text-emerald-400" size={20} />
              <h2 className="text-xl font-semibold text-white">History</h2>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Globe2 size={16} className="text-cyan-400" />
                <span>{reports.length} saved investigations</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center gap-3">
              <Search className="text-cyan-400" size={20} />
              <h2 className="text-xl font-semibold text-white">Recent Reputation Checks</h2>
            </div>
            {indicators.length === 0 ? (
              <p className="mt-6 text-slate-400">No reputation checks available yet.</p>
            ) : (
              <div className="mt-6 space-y-3">
                {indicators.map((indicator) => (
                  <div key={`${indicator.ioc}-${indicator.source}`} className="rounded-xl border border-white/10 bg-slate-800/40 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{indicator.ioc}</p>
                        <p className="mt-1 text-sm text-slate-400">Source: {indicator.source}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                          {indicator.risk}
                        </span>
                        <Link
                          href="/dashboard/reports"
                          className="rounded-lg border border-white/10 px-3 py-1 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                        >
                          View report
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
