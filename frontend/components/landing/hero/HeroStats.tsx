"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Activity,
  BrainCircuit,
  Database,
} from "lucide-react";

const stats = [
  {
    icon: ShieldCheck,
    value: "98.7%",
    label: "Detection Accuracy",
  },
  {
    icon: Activity,
    value: "25K+",
    label: "Threats Analyzed",
  },
  {
    icon: BrainCircuit,
    value: "10K+",
    label: "AI Reports",
  },
  {
    icon: Database,
    value: "1.2M",
    label: "Logs Processed",
  },
];

export default function HeroStats() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.5,
        duration: 0.7,
      }}
      className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.label}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15 * index,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(34,211,238,.18)]"
          >
            {/* Glow */}

            <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/20" />

            <div className="relative">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">

                <Icon
                  size={22}
                  className="text-cyan-400"
                />

              </div>

              <h3 className="text-4xl font-black">

                {item.value}

              </h3>

              <p className="mt-2 text-sm text-slate-400">

                {item.label}

              </p>

            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}