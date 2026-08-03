"use client";

import {
  ShieldAlert,
  FileText,
  Brain,
  Globe,
  ArrowRight,
} from "lucide-react";

import StatCard from "./StatCard";

export default function Overview() {
  return (
    <div className="space-y-8">

      {/* Top Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Threat Score"
          value="82%"
          icon={ShieldAlert}
          color="text-red-400"
          change="+8%"
        />

        <StatCard
          title="IOCs Detected"
          value="143"
          icon={Globe}
          color="text-cyan-400"
          change="+27%"
        />

        <StatCard
          title="AI Reports"
          value="18"
          icon={Brain}
          color="text-violet-400"
          change="+12%"
        />

        <StatCard
          title="Analyses"
          value="254"
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

            {[
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
            ].map((item) => (
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

            {[
              "Upload Security Logs",
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

    </div>
  );
}