"use client";

import { motion } from "framer-motion";
import {
  Upload,
  ScanSearch,
  Globe,
  Brain,
  FileText,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Logs",
    description:
      "Upload Windows Event Logs, Sysmon, Firewall or Web Server logs.",
  },
  {
    icon: ScanSearch,
    title: "Extract IOCs",
    description:
      "Automatically identify IPs, domains, URLs, hashes and suspicious artifacts.",
  },
  {
    icon: Globe,
    title: "Threat Intelligence",
    description:
      "Correlate extracted indicators with VirusTotal and AbuseIPDB.",
  },
  {
    icon: Brain,
    title: "AI Investigation",
    description:
      "Ollama analyzes evidence and creates a complete incident investigation.",
  },
  {
    icon: FileText,
    title: "SOC Report",
    description:
      "Generate structured reports with severity, timeline and mitigation.",
  },
];

export default function Workflow() {
  return (
    <section
      id="workflow"
      className="relative py-32"
    >
      <div className="section px-6">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            AI Investigation Pipeline
          </span>

          <h2 className="mt-8 text-5xl font-black">
            From Logs To
            <span className="text-gradient">
              {" "}Actionable Intelligence
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Every uploaded log passes through an automated AI-driven workflow,
            transforming raw events into actionable cybersecurity intelligence.
          </p>

        </div>

        <div className="relative">

          {/* Center Line */}

          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-500/60 via-blue-500/30 to-transparent lg:block" />

          <div className="space-y-14">

            {steps.map((step, index) => {

              const Icon = step.icon;
              const reverse = index % 2 === 1;

              return (

                <motion.div
                  key={step.title}
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
                    delay: index * 0.1,
                  }}
                  className={`grid items-center gap-10 lg:grid-cols-2 ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >

                  <div
                    className={`${
                      reverse ? "lg:text-right" : ""
                    }`}
                  >

                    <div className="glass rounded-3xl p-8">

                      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10">

                        <Icon
                          className="text-cyan-400"
                          size={30}
                        />

                      </div>

                      <h3 className="text-3xl font-bold">

                        {step.title}

                      </h3>

                      <p className="mt-5 leading-8 text-slate-400">

                        {step.description}

                      </p>

                    </div>

                  </div>

                  <div className="hidden justify-center lg:flex">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-slate-900 shadow-[0_0_35px_rgba(34,211,238,.25)]">

                      <span className="text-2xl font-black text-cyan-400">

                        {index + 1}

                      </span>

                    </div>

                  </div>

                </motion.div>

              );

            })}

          </div>

        </div>

      </div>
    </section>
  );
}