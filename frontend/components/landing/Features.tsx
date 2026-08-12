"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Shield,
  Globe,
  Database,
  FileSearch,
  Cpu,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Threat Analysis",
    description:
      "Generate detailed incident reports using local LLMs powered by Ollama.",
  },
  {
    icon: Globe,
    title: "Threat Intelligence",
    description:
      "Correlate indicators with VirusTotal and AbuseIPDB automatically.",
  },
  {
    icon: Database,
    title: "IOC Extraction",
    description:
      "Extract IPs, Domains, URLs and Hashes from security logs instantly.",
  },
  {
    icon: FileSearch,
    title: "Security Reports",
    description:
      "Generate executive-ready PDF and SOC investigation reports.",
  },
  {
    icon: Shield,
    title: "Real-time Detection",
    description:
      "Identify suspicious events using intelligent rule correlation.",
  },
  {
    icon: Cpu,
    title: "AI Powered Pipeline",
    description:
      "Automated workflow from log upload to complete incident analysis.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-32"
    >
      <div className="section px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >

          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">

            Platform Capabilities

          </span>

          <h2 className="mt-8 text-5xl font-black">

            Everything You Need

            <span className="text-gradient">

              {" "}For SOC Operations

            </span>

          </h2>

          <p className="mt-6 text-lg text-slate-400">

            ElyvexAI combines threat intelligence,
            AI reasoning and security automation
            into one unified platform.

          </p>

        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * .08,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl transition-all hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,.18)]"
              >

                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-500/20" />

                <div className="relative">

                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10">

                    <Icon
                      className="text-cyan-400"
                      size={30}
                    />

                  </div>

                  <h3 className="text-2xl font-bold">

                    {feature.title}

                  </h3>

                  <p className="mt-5 leading-8 text-slate-400">

                    {feature.description}

                  </p>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}