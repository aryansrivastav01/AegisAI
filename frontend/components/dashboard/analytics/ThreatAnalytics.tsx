"use client";

import {
  BarChart3,
  ShieldAlert,
  Globe,
  Link,
  Fingerprint,
} from "lucide-react";

interface ThreatAnalyticsProps {
  summary: {
    overall_risk: string;
    total_ips: number;
    total_domains: number;
    total_urls: number;
    total_hashes: number;
  };
}

function Stat({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/40 p-5">

      <div className="flex items-center gap-3">

        <Icon
          size={20}
          className="text-cyan-400"
        />

        <span className="text-slate-400">
          {title}
        </span>

      </div>

      <h3 className="mt-4 text-3xl font-bold text-white">
        {value}
      </h3>

    </div>
  );
}

export default function ThreatAnalytics({
  summary,
}: ThreatAnalyticsProps) {

  const total =
    summary.total_ips +
    summary.total_domains +
    summary.total_urls +
    summary.total_hashes;

  const width =
    total === 0
      ? 0
      : Math.min(total * 10, 100);

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">

      <div className="mb-6 flex items-center gap-3">

        <BarChart3
          className="text-cyan-400"
          size={22}
        />

        <h2 className="text-xl font-semibold text-white">
          Threat Analytics
        </h2>

      </div>

      <div className="grid gap-5 md:grid-cols-4">

        <Stat
          icon={Globe}
          title="IPs"
          value={summary.total_ips}
        />

        <Stat
          icon={Globe}
          title="Domains"
          value={summary.total_domains}
        />

        <Stat
          icon={Link}
          title="URLs"
          value={summary.total_urls}
        />

        <Stat
          icon={Fingerprint}
          title="Hashes"
          value={summary.total_hashes}
        />

      </div>

      <div className="mt-8">

        <div className="mb-2 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <ShieldAlert
              size={18}
              className="text-cyan-400"
            />

            <span className="text-white font-medium">
              Detection Score
            </span>

          </div>

          <span className="text-cyan-400 font-semibold">
            {width}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">

          <div
            className="h-full rounded-full bg-cyan-400 transition-all duration-500"
            style={{
              width: `${width}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}