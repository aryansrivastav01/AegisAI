"use client";

import {
  Bell,
  Search,
  UserCircle2,
} from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/60 px-8 backdrop-blur-xl">

      <div>

        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Welcome back, Aryan 👋
        </p>

      </div>

      <div className="flex items-center gap-5">

        <div className="relative hidden lg:block">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />

          <input
            type="text"
            placeholder="Search reports..."
            className="w-80 rounded-xl border border-white/10 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400"
          />

        </div>

        <button className="relative rounded-xl border border-white/10 bg-slate-900 p-3 transition hover:border-cyan-400">

          <Bell className="text-slate-300" size={22} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

        </button>

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900 px-4 py-2">

          <UserCircle2
            className="text-cyan-400"
            size={34}
          />

          <div>

            <p className="text-sm font-semibold text-white">
              Aryan
            </p>

            <p className="text-xs text-slate-400">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}