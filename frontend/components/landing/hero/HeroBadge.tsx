"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";

export default function HeroBadge() {
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
        duration: .6,
      }}
      className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 backdrop-blur-xl"
    >

      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20">

        <Shield
          size={16}
          className="text-cyan-300"
        />

      </div>

      <span className="font-medium text-cyan-300">

        AI Powered Security Operations Center

      </span>

      <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1">

        <Sparkles
          size={14}
          className="text-green-400"
        />

        <span className="text-xs font-semibold text-green-400">

          LIVE

        </span>

      </div>

    </motion.div>
  );
}