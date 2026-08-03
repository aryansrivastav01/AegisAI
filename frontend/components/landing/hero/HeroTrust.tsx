"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  BrainCircuit,
  Database,
  Cloud,
  Bot,
  FileText,
} from "lucide-react";

const technologies = [
  {
    icon: ShieldCheck,
    title: "VirusTotal",
  },
  {
    icon: Database,
    title: "AbuseIPDB",
  },
  {
    icon: BrainCircuit,
    title: "Ollama AI",
  },
  {
    icon: Cloud,
    title: "FastAPI",
  },
  {
    icon: Bot,
    title: "Local LLM",
  },
  {
    icon: FileText,
    title: "PDF Reports",
  },
];

export default function HeroTrust() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.7,
        duration: 0.6,
      }}
      className="mt-12"
    >
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
        Powered By
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

        {technologies.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              transition={{
                duration: 0.2,
              }}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-xl transition-all hover:border-cyan-400/30 hover:bg-cyan-400/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">

                <Icon
                  size={18}
                  className="text-cyan-400"
                />

              </div>

              <div>

                <p className="font-semibold text-white">

                  {item.title}

                </p>

                <p className="text-xs text-slate-500">

                  Integrated

                </p>

              </div>

            </motion.div>
          );
        })}

      </div>
    </motion.div>
  );
}