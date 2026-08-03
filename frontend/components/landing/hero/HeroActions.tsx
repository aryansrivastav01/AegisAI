"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Rocket,
  ShieldCheck,
  GitBranch,
} from "lucide-react";

export default function HeroActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="mt-10"
    >
      {/* CTA Buttons */}

      <div className="flex flex-wrap gap-4">

        <Link
          href="/dashboard"
          className="group inline-flex items-center gap-3 rounded-2xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 shadow-[0_0_35px_rgba(34,211,238,.35)] transition-all duration-300 hover:scale-105 hover:bg-cyan-300 hover:shadow-[0_0_60px_rgba(34,211,238,.55)]"
        >
          <Rocket size={18} />

          Launch Dashboard

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        <Link
          href="https://github.com/aryansrivastav01/AegisAI"
          target="_blank"
          className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-800"
        >
          <Code2 size={18} />

          Source Code

          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

      </div>

      {/* Trust Badge */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-7 flex flex-wrap items-center gap-4"
      >

        <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">

          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

          <span className="text-sm font-medium text-green-400">

            Version 1.0.0

          </span>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2">

          <ShieldCheck
            size={16}
            className="text-cyan-400"
          />

          <span className="text-sm text-slate-300">

            Secure by Design

          </span>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2">

          <GitBranch
            size={16}
            className="text-white"
          />

          <span className="text-sm text-slate-300">

            Open Source

          </span>

        </div>

      </motion.div>
    </motion.div>
  );
}