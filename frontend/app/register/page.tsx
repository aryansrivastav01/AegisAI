"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Lock, Mail, User, ArrowRight } from "lucide-react";

import AuroraBackground from "@/components/effects/AuroraBackground";
import MouseSpotlight from "@/components/effects/MouseSpotlight";
import CyberGrid from "@/components/effects/CyberGrid";
import FloatingParticles from "@/components/effects/FloatingParticles";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { register } = await import("@/services/auth");
      const data: any = await register({ full_name: fullName, email, password });
      
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account");
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

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6 py-12"
      >
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(34,211,238,0.1)]">
          
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Shield size={32} />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">Create Account</h1>
            <p className="mt-2 text-sm text-slate-400">Join ElyvexAI and secure your infrastructure.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Security Analyst"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500/50 focus:bg-slate-900 focus:ring-1 focus:ring-cyan-500/50"
                />
              </div>
            </div>

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
              <label className="text-sm font-medium text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500/50 focus:bg-slate-900 focus:ring-1 focus:ring-cyan-500/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500/50 focus:bg-slate-900 focus:ring-1 focus:ring-cyan-500/50"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="group relative mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Setting up terminal..." : "Create Account"}
              {!loading && <ArrowRight size={16} className="transition group-hover:translate-x-1" />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-cyan-400 hover:text-cyan-300 transition">
              Sign In
            </Link>
          </p>

        </div>
      </motion.div>
    </main>
  );
}
