"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">

      {/* Cyan Orb */}

      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -50, 60, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-250px] top-[-180px] h-[750px] w-[750px] rounded-full bg-cyan-500/20 blur-[150px]"
      />

      {/* Blue Orb */}

      <motion.div
        animate={{
          x: [0, -80, 50, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-260px] top-[80px] h-[750px] w-[750px] rounded-full bg-blue-600/20 blur-[170px]"
      />

      {/* Purple Orb */}

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-320px] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[180px]"
      />

      {/* Extra Glow */}

      <motion.div
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -40, 40, 0],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/10 blur-[150px]"
      />

      {/* Radial Fade */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.15)_45%,rgba(2,6,23,0.85)_100%)]" />

    </div>
  );
}