"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  FileText,
  ShieldAlert,
  Settings,
  Shield,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Upload Logs",
    href: "/dashboard/upload",
    icon: Upload,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "Threat Intel",
    href: "/dashboard/threat-intel",
    icon: ShieldAlert,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/10 bg-slate-950/80 backdrop-blur-xl">

      <div className="border-b border-white/10 px-8 py-7">

        <div className="flex items-center gap-3">

          <Shield className="h-8 w-8 text-cyan-400" />

          <div>

            <h1 className="text-2xl font-bold text-white">
              ElyvexAI
            </h1>

            <p className="text-xs text-slate-400">
              AI Security Platform
            </p>

          </div>

        </div>

      </div>

      <nav className="flex-1 space-y-2 px-5 py-8">

        {menu.map((item) => {

          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 ${
                active
                  ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Icon size={22} />
              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}

      </nav>

      <div className="border-t border-white/10 p-6">

        <div className="rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-5">

          <p className="text-xs uppercase tracking-widest text-cyan-300">
            System Status
          </p>

          <h3 className="mt-2 text-lg font-bold text-white">
            Operational
          </h3>

          <div className="mt-4 flex items-center gap-2">

            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

            <span className="text-sm text-slate-300">
              All services online
            </span>

          </div>

        </div>

      </div>

    </aside>
  );
}