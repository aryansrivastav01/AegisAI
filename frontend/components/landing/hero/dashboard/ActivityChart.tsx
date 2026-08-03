"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const activity = [32, 48, 41, 72, 56, 90, 61, 97, 78, 64, 100, 83];

export default function ActivityChart() {
  return (
    <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">

            <Activity
              size={20}
              className="text-cyan-400"
            />

          </div>

          <div>

            <h3 className="font-semibold text-white">

              Threat Activity

            </h3>

            <p className="text-xs text-slate-500">

              Last 24 Hours

            </p>

          </div>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1">

          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

          <span className="text-xs font-medium text-green-400">

            LIVE

          </span>

        </div>

      </div>

      {/* Chart */}

      <div className="flex h-44 items-end gap-3">

        {activity.map((value, index) => (

          <motion.div
            key={index}
            initial={{
              height: 0,
            }}
            animate={{
              height: `${value}%`,
            }}
            transition={{
              delay: index * 0.05,
              duration: 0.55,
            }}
            whileHover={{
              scaleY: 1.05,
            }}
            className="group relative flex-1"
          >

            {/* Glow */}

            <div className="absolute inset-0 rounded-t-full bg-cyan-400/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />

            {/* Bar */}

            <div
              className={`absolute bottom-0 w-full rounded-t-full bg-gradient-to-t ${
                value >= 95
                  ? "from-cyan-300 via-sky-300 to-white"
                  : "from-cyan-500 via-sky-500 to-blue-500"
              }`}
              style={{
                height: "100%",
              }}
            />

          </motion.div>

        ))}

      </div>

      {/* Timeline */}

      <div className="mt-5 flex justify-between text-[11px] tracking-wide text-slate-500">

        <span>00:00</span>

        <span>06:00</span>

        <span>12:00</span>

        <span>18:00</span>

        <span>24:00</span>

      </div>

    </div>
  );
}