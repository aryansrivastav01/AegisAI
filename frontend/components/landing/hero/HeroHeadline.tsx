"use client";

import { motion } from "framer-motion";

const words = [
  {
    text: "Detect.",
    className: "text-white",
  },
  {
    text: "Investigate.",
    className:
      "bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent",
  },
  {
    text: "Respond.",
    className: "text-white",
  },
];

export default function HeroHeadline() {
  return (
    <div className="relative">

      {/* Glow */}

      <div className="absolute left-20 top-24 h-52 w-52 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="absolute right-0 top-40 h-56 w-56 rounded-full bg-blue-600/15 blur-[140px]" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.18,
            },
          },
        }}
      >
        {words.map((word) => (
          <motion.h1
            key={word.text}
            variants={{
              hidden: {
                opacity: 0,
                y: 40,
                filter: "blur(8px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              },
            }}
            transition={{
              duration: 0.7,
            }}
            className={`relative text-6xl font-black leading-[0.95] tracking-tight md:text-7xl xl:text-8xl ${word.className}`}
          >
            {word.text}
          </motion.h1>
        ))}
      </motion.div>

      <motion.div
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        animate={{
          scaleX: 1,
          opacity: 1,
        }}
        transition={{
          delay: 0.9,
          duration: 0.8,
        }}
        className="mt-8 h-[2px] w-32 origin-left rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent"
      />

      <motion.p
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.1,
          duration: 0.7,
        }}
        className="mt-8 max-w-xl text-lg leading-8 text-slate-400"
      >
        Upload security logs, extract IOCs, correlate threat intelligence
        using VirusTotal & AbuseIPDB and generate AI-powered SOC reports
        locally with Ollama.
      </motion.p>
    </div>
  );
}