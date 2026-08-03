"use client";

import { motion } from "framer-motion";
import {
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  Clock3,
} from "lucide-react";

const threats = [
  {
    id: 1,
    title: "PowerShell Execution",
    severity: "Critical",
    time: "2 min ago",
    color: "bg-red-500",
    icon: ShieldAlert,
  },
  {
    id: 2,
    title: "Credential Dumping",
    severity: "High",
    time: "6 min ago",
    color: "bg-orange-500",
    icon: AlertTriangle,
  },
  {
    id: 3,
    title: "Suspicious Login",
    severity: "Medium",
    time: "12 min ago",
    color: "bg-yellow-500",
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: "Beacon Traffic",
    severity: "Low",
    time: "18 min ago",
    color: "bg-green-500",
    icon: ShieldCheck,
  },
];

export default function ThreatFeed() {
  return (
    <div className="mt-7 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h3 className="text-lg font-bold text-white">
            Live Threat Feed
          </h3>

          <p className="text-sm text-slate-500">
            AI Correlated Security Events
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1">

          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

          <span className="text-xs font-semibold text-green-400">
            LIVE
          </span>

        </div>

      </div>

      {/* Feed */}

      <div className="space-y-4">

        {threats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                x: 6,
              }}
              className="group flex items-center justify-between rounded-2xl border border-white/5 bg-slate-800/40 p-4 transition-all duration-300 hover:border-cyan-400/20 hover:bg-slate-800/70"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">

                  <Icon
                    size={20}
                    className="text-cyan-400"
                  />

                </div>

                <div>

                  <h4 className="font-semibold text-white">

                    {item.title}

                  </h4>

                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">

                    <span className="flex items-center gap-1">

                      <Clock3 size={12} />

                      {item.time}

                    </span>

                    <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-cyan-300">

                      AI Verified

                    </span>

                  </div>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <span className="text-xs font-medium text-slate-300">

                  {item.severity}

                </span>

                <div className={`h-3 w-3 rounded-full ${item.color}`} />

              </div>

            </motion.div>
          );
        })}

      </div>

    </div>
  );
}