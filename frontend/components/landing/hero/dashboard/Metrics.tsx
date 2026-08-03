"use client";

import { motion } from "framer-motion";
import {
  ShieldAlert,
  BrainCircuit,
  Globe,
  Activity,
} from "lucide-react";

const metrics = [
  {
    title: "Threat Score",
    value: "91%",
    icon: ShieldAlert,
    color: "text-red-400",
  },
  {
    title: "AI Reports",
    value: "124",
    icon: BrainCircuit,
    color: "text-cyan-400",
  },
  {
    title: "IOCs",
    value: "418",
    icon: Globe,
    color: "text-emerald-400",
  },
  {
    title: "Live Alerts",
    value: "82",
    icon: Activity,
    color: "text-yellow-400",
  },
];

export default function Metrics() {
  return (
    <div className="grid grid-cols-2 gap-4">

      {metrics.map((metric, index) => {
        const Icon = metric.icon;

        return (
          <motion.div
            key={metric.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -5,
              scale: 1.02,
            }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,.15)]"
          >

            {/* Glow */}

            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl transition-all duration-300 group-hover:bg-cyan-400/20" />

            <div className="relative">

              <div className="mb-4 flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">

                  <Icon
                    size={22}
                    className={metric.color}
                  />

                </div>

                <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

              </div>

              <p className="text-xs uppercase tracking-wider text-slate-500">

                {metric.title}

              </p>

              <h3 className="mt-2 text-3xl font-black text-white">

                {metric.value}

              </h3>

            </div>

          </motion.div>
        );
      })}

    </div>
  );
}