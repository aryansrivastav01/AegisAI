"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Search,
  UserCircle2,
  LogOut,
} from "lucide-react";
import { getHistory, type HistoryItem } from "@/services/history";
import { getMe } from "@/services/auth";

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<HistoryItem[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState<{ full_name: string; email: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [alertsData, userData] = await Promise.all([
          getHistory(),
          getMe() as Promise<any>,
        ]);
        const highRisk = alertsData.filter((item) => item.overall_risk === "High Risk");
        setNotifications(highRisk);
        setUser(userData);
      } catch (e) {
        console.error(e);
      }
    }
    void loadData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard/reports?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/60 px-8 backdrop-blur-xl relative z-50">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">Welcome back, {user ? user.full_name.split(' ')[0] : 'Analyst'} 👋</p>
      </div>

      <div className="flex items-center gap-5">
        <form onSubmit={handleSearch} className="relative hidden lg:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80 rounded-xl border border-white/10 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400"
          />
        </form>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl border border-white/10 bg-slate-900 p-3 transition hover:border-cyan-400"
          >
            <Bell className="text-slate-300" size={22} />
            {notifications.length > 0 && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-xl backdrop-blur-xl">
              <h3 className="mb-3 font-semibold text-white">Notifications</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-sm text-slate-400">No high risk alerts.</p>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                      <p className="text-sm font-medium text-red-400">High Risk Detected</p>
                      <p className="mt-1 text-xs text-slate-300">{notif.filename}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900 px-4 py-2">
          <UserCircle2 className="text-cyan-400" size={34} />
          <div>
            <p className="text-sm font-semibold text-white">{user ? user.full_name : 'Analyst'}</p>
            <p className="text-xs text-slate-400">User</p>
          </div>
        </div>

        <button 
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
          className="flex items-center justify-center rounded-xl border border-white/10 bg-slate-900 p-3 text-slate-300 transition hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/10"
          title="Sign Out"
        >
          <LogOut size={22} />
        </button>
      </div>
    </header>
  );
}