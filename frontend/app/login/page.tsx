"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Lock, Mail, ArrowRight } from "lucide-react";

import AuroraBackground from "@/components/effects/AuroraBackground";
import MouseSpotlight from "@/components/effects/MouseSpotlight";
import CyberGrid from "@/components/effects/CyberGrid";
import FloatingParticles from "@/components/effects/FloatingParticles";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { login } = await import("@/services/auth");
      const data: any = await login({ email, password });
      
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-foreground">
      {/* Background Effects */}
      <AuroraBackground />
      <MouseSpotlight />
      <CyberGrid />
      <FloatingParticles />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(34,211,238,0.1)]">
          
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Shield size={32} />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-400">Enter your credentials to access the SOC terminal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@elyvex.ai"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500/50 focus:bg-slate-900 focus:ring-1 focus:ring-cyan-500/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <Link href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500/50 focus:bg-slate-900 focus:ring-1 focus:ring-cyan-500/50"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="group relative mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Authenticating..." : "Sign In"}
              {!loading && <ArrowRight size={16} className="transition group-hover:translate-x-1" />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-cyan-400 hover:text-cyan-300 transition">
              Create one
            </Link>
          </p>

        </div>
      </motion.div>
    </main>
  );
}
