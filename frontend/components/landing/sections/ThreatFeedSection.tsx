"use client";

import { motion } from "framer-motion";
import ThreatFeed from "../hero/dashboard/ThreatFeed";

export default function ThreatFeedSection() {
  return (
    <section className="relative py-32">

      {/* Background Glow */}

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_65%)]" />

      <div className="section">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >

          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300">

            Live Threat Intelligence

          </span>

          <h2 className="mt-6 text-5xl font-black text-white">

            AI Correlated
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Threat Feed
            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">

            Monitor real-time detections enriched with VirusTotal,
            AbuseIPDB and AI-powered investigation.

          </p>

        </motion.div>

        {/* Feed */}

        <div className="mx-auto max-w-5xl">

          <ThreatFeed />

        </div>

      </div>

    </section>
  );
}