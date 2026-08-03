"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Brain, Upload, ArrowRight } from "lucide-react";

const stats = [
  { label: "Threats Analyzed", value: "25K+" },
  { label: "AI Reports", value: "10K+" },
  { label: "Detection Accuracy", value: "96%" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />
      <div className="absolute inset-0 cyber-grid opacity-40" />

      <nav className="section relative z-10 flex items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-cyan-400" />
          <span className="text-2xl font-bold">AegisAI</span>
        </Link>
        <div className="hidden gap-8 text-slate-300 md:flex">
          <Link href="/" className="transition hover:text-cyan-300">
            Home
          </Link>

          <Link href="/#stats" className="transition hover:text-cyan-300">
            Stats
          </Link>

          <Link
            href="https://github.com/aryansrivastav01/AegisAI#readme"
            target="_blank"
            className="hover:text-cyan-300 transition"
          >
            Documentation
          </Link>
        </div>

        <Link
          href="https://github.com/aryansrivastav01/AegisAI"
          target="_blank"
          className="rounded-xl bg-cyan-400 px-5 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          GitHub
        </Link>
      </nav>

      <section
        id="hero"
        className="section relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6 text-center fade-up"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass glow max-w-5xl rounded-3xl p-10"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            <Brain size={16} />
            AI-Powered Threat Intelligence Platform
          </span>

          <h1 className="mt-8 text-6xl font-black tracking-tight md:text-7xl">
            Modern <span className="text-gradient">SOC Analysis</span>
            <br />
            Powered by AI
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            Upload security logs, extract IOCs, correlate threat intelligence
            using VirusTotal and AbuseIPDB, then generate structured AI-powered
            security reports with Ollama.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-105"
            >
              <Upload size={18} />
              Launch Dashboard
            </Link>

            <Link
              href="https://github.com/aryansrivastav01/AegisAI#readme"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3 transition hover:border-cyan-400"
            >
              View Documentation
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        <div
          id="stats"
          className="mt-16 grid w-full max-w-5xl gap-6 md:grid-cols-3"
        >
          {stats.map((item) => (
            <div
              key={item.label}
              className="glass rounded-2xl p-8 text-left transition hover:-translate-y-1"
            >
              <p className="text-sm uppercase tracking-widest text-slate-400">
                {item.label}
              </p>
              <h3 className="mt-3 text-4xl font-bold text-cyan-300">
                {item.value}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
