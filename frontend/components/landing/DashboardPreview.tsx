"use client";

import { motion } from "framer-motion";
import {
  ShieldAlert,
  Brain,
  Globe,
  Activity,
  Terminal,
  CheckCircle2,
} from "lucide-react";

const threats = [
  {
    name: "Suspicious PowerShell",
    severity: "High",
    color: "bg-red-500",
  },
  {
    name: "Brute Force Login",
    severity: "Medium",
    color: "bg-yellow-500",
  },
  {
    name: "Malicious Domain",
    severity: "Critical",
    color: "bg-red-600",
  },
  {
    name: "Beaconing Traffic",
    severity: "Low",
    color: "bg-green-500",
  },
];

export default function DashboardPreview() {
  return (
    <section className="relative py-32 overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

      <div className="section relative px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >

          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            Live Platform Preview
          </span>

          <h2 className="mt-8 text-5xl font-black">

            Security Operations

            <span className="text-gradient">

              {" "}Dashboard

            </span>

          </h2>

          <p className="mt-6 text-lg text-slate-400">

            Visualize AI investigations,
            threat intelligence and IOC correlation
            from one centralized dashboard.

          </p>

        </motion.div>

        <div className="glass glow rounded-[34px] p-8">

          {/* Header */}

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h3 className="text-2xl font-bold">

                Live SOC Overview

              </h3>

              <p className="text-slate-400">

                Real-Time Monitoring

              </p>

            </div>

            <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-400">

              ● LIVE

            </span>

          </div>

          <div className="grid gap-8 xl:grid-cols-3">

            {/* LEFT */}

            <div className="xl:col-span-2 space-y-6">

              <div className="grid gap-5 md:grid-cols-4">

                <Metric
                  icon={<ShieldAlert size={24} />}
                  title="Threat Score"
                  value="91%"
                />

                <Metric
                  icon={<Brain size={24} />}
                  title="AI Reports"
                  value="124"
                />

                <Metric
                  icon={<Globe size={24} />}
                  title="IOCs"
                  value="418"
                />

                <Metric
                  icon={<Activity size={24} />}
                  title="Alerts"
                  value="82"
                />

              </div>

              {/* Chart */}

              <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">

                <div className="mb-6 flex justify-between">

                  <h4 className="font-semibold">

                    Threat Activity

                  </h4>

                  <span className="text-cyan-300">

                    Last 24 Hours

                  </span>

                </div>

                <div className="flex h-52 items-end gap-3">

                  {[35,52,40,70,48,88,62,94,75,68,96,84].map((h,i)=>(

                    <motion.div
                      key={i}
                      initial={{height:0}}
                      whileInView={{height:h+"%"}}
                      viewport={{once:true}}
                      transition={{
                        delay:i*.05
                      }}
                      className="flex-1 rounded-t-full bg-gradient-to-t from-cyan-400 via-blue-500 to-cyan-300"
                    />

                  ))}

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="space-y-6">

              <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">

                <h4 className="mb-5 font-semibold">

                  Recent Threats

                </h4>

                <div className="space-y-4">

                  {threats.map((item)=>(

                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-800/40 p-3"
                    >

                      <div>

                        <p className="font-medium">

                          {item.name}

                        </p>

                        <p className="text-xs text-slate-500">

                          AI Verified

                        </p>

                      </div>

                      <span
                        className={`h-3 w-3 rounded-full ${item.color}`}
                      />

                    </div>

                  ))}

                </div>

              </div>

              {/* Terminal */}

              <div className="rounded-3xl border border-white/10 bg-black p-6">

                <div className="mb-5 flex items-center gap-2">

                  <Terminal size={18} />

                  <span className="font-semibold">

                    AI Engine

                  </span>

                </div>

                <div className="space-y-3 font-mono text-sm">

                  <p className="text-cyan-400">

                    &gt; Upload Complete...

                  </p>

                  <p className="text-cyan-400">

                    &gt; Extracting IOCs...

                  </p>

                  <p className="text-cyan-400">

                    &gt; VirusTotal Lookup...

                  </p>

                  <p className="text-cyan-400">

                    &gt; Ollama Analysis...

                  </p>

                  <p className="flex items-center gap-2 text-green-400">

                    <CheckCircle2 size={16} />

                    Report Generated

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

function Metric({
  icon,
  title,
  value,
}:{
  icon:React.ReactNode;
  title:string;
  value:string;
}){

  return(

    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">

      <div className="mb-4 text-cyan-400">

        {icon}

      </div>

      <p className="text-sm text-slate-400">

        {title}

      </p>

      <h3 className="mt-2 text-3xl font-bold">

        {value}

      </h3>

    </div>

  )

}