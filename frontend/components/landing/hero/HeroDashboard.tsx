"use client";

import { motion } from "framer-motion";

import Metrics from "./dashboard/Metrics";
import ActivityChart from "./dashboard/ActivityChart";
import StatusRing from "./dashboard/StatusRing";

export default function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 rounded-[36px] bg-cyan-500/10 blur-3xl" />

      {/* Dashboard */}

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-2xl">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">
              AI SOC Console
            </h2>

            <p className="text-sm text-slate-400">
              Real-Time Security Monitoring
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">

            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

            <span className="text-sm font-semibold text-green-400">
              LIVE
            </span>

          </div>

        </div>

        {/* Metrics */}

        <Metrics />

        {/* Activity + Health */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.8fr_0.8fr]">

          <ActivityChart />

          <StatusRing />

        </div>

      </div>
    </motion.div>
  );
}