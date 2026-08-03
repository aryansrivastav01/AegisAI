"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Brain,
  Activity,
  Database,
} from "lucide-react";

const stats = [
  {
    icon: ShieldCheck,
    value: "25K+",
    label: "Threats Analyzed",
  },
  {
    icon: Brain,
    value: "10K+",
    label: "AI Reports Generated",
  },
  {
    icon: Activity,
    value: "96%",
    label: "Detection Accuracy",
  },
  {
    icon: Database,
    value: "1.2M",
    label: "Logs Processed",
  },
];

const companies = [
  "FastAPI",
  "Next.js",
  "Ollama",
  "VirusTotal",
  "AbuseIPDB",
  "MITRE ATT&CK",
];

export default function Stats() {
  return (
    <section className="relative pb-24">

      <div className="section px-6">

        {/* Stats */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: .5,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="glass group rounded-3xl p-8 transition"
              >

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">

                  <Icon className="text-cyan-400" size={28} />

                </div>

                <h2 className="text-5xl font-black text-white">

                  {item.value}

                </h2>

                <p className="mt-3 text-slate-400">

                  {item.label}

                </p>

              </motion.div>

            );

          })}

        </div>

        {/* Trusted */}

        <div className="mt-24 text-center">

          <p className="mb-10 text-sm uppercase tracking-[0.35em] text-slate-500">

            Powered By Modern Security Stack

          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">

            {companies.map((company, index) => (

              <motion.div
                key={company}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * .08,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                className="glass rounded-2xl px-8 py-4 font-semibold text-slate-300"
              >

                {company}

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}