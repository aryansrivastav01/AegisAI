"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const score = 91;

const radius = 52;
const stroke = 8;
const circumference = 2 * Math.PI * radius;
const progress = circumference - (score / 100) * circumference;

export default function StatusRing() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.6,
      }}
      className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl"
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h3 className="text-lg font-bold text-white">
            Security Health
          </h3>

          <p className="text-sm text-slate-500">
            Overall AI Confidence
          </p>

        </div>

        <div className="rounded-xl bg-green-500/10 p-3">

          <ShieldCheck
            size={22}
            className="text-green-400"
          />

        </div>

      </div>

      {/* Ring */}

      <div className="flex flex-col items-center">

        <div className="relative">

          <svg
            width="140"
            height="140"
            className="-rotate-90"
          >

            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="rgba(255,255,255,.08)"
              strokeWidth={stroke}
              fill="transparent"
            />

            <motion.circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#22d3ee"
              strokeWidth={stroke}
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{
                strokeDashoffset: circumference,
              }}
              animate={{
                strokeDashoffset: progress,
              }}
              transition={{
                duration: 1.4,
                ease: "easeOut",
              }}
            />

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <motion.h2
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="text-4xl font-black text-white"
            >
              {score}%
            </motion.h2>

            <p className="text-xs uppercase tracking-widest text-slate-500">
              Healthy
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 w-full rounded-xl border border-white/10 bg-black/20 p-4">

          <div className="mb-2 flex justify-between">

            <span className="text-sm text-slate-400">

              Detection Rate

            </span>

            <span className="font-semibold text-cyan-300">

              Excellent

            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">

            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${score}%`,
              }}
              transition={{
                duration: 1.3,
              }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            />

          </div>

        </div>

      </div>

    </motion.div>
  );
}