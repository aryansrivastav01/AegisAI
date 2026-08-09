"use client";

import { LucideIcon, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color?: string;
  change?: string;
  subtext?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-cyan-400",
  change = "+12%",
  subtext = "vs last week",
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.2 }}
      className="group rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl transition-all hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>
          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>
        </div>
        <div className="rounded-2xl bg-slate-800 p-4 transition group-hover:bg-slate-700">
          <Icon className={color} size={28} />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-green-400">
        <TrendingUp size={16} />
        <span className="text-sm font-medium">
          {change}
        </span>
        <span className="text-sm text-slate-500">
          {subtext}
        </span>
      </div>
    </motion.div>
  );
}