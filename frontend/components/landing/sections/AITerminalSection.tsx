"use client";

import { motion } from "framer-motion";
import AITerminal from "../hero/dashboard/AITerminal";

export default function AITerminalSection() {
  return (
    <section className="relative py-32 overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,.08),transparent_65%)]" />

      <div className="section">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
          >

            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300">

              AI Investigation Engine

            </span>

            <h2 className="mt-6 text-5xl font-black leading-tight text-white">

              From Raw Logs

              <br />

              To

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                {" "}AI Report

              </span>

            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">

              Upload security logs, enrich IOCs with VirusTotal and
              AbuseIPDB, correlate indicators and let Ollama generate
              structured SOC investigation reports automatically.

            </p>

            <div className="mt-10 flex flex-wrap gap-3">

              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
                Ollama
              </span>

              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
                VirusTotal
              </span>

              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
                AbuseIPDB
              </span>

              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
                AI Reports
              </span>

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
          >

            <AITerminal />

          </motion.div>

        </div>

      </div>

    </section>
  );
}