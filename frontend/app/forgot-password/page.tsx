"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Mail, ArrowRight, ArrowLeft } from "lucide-react";

import AuroraBackground from "@/components/effects/AuroraBackground";
import MouseSpotlight from "@/components/effects/MouseSpotlight";
import CyberGrid from "@/components/effects/CyberGrid";
import FloatingParticles from "@/components/effects/FloatingParticles";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { forgotPassword } = await import("@/services/auth");
      const data: any = await forgotPassword({ email });
      
      setMessage(data.message || "If that email is registered, we have sent a reset link.");
    } catch (err: any) {
      setError(err.message || "Failed to process request");
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

      {/* Forgot Password Card */}
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
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">Reset Password</h1>
            <p className="mt-2 text-sm text-slate-400">Enter your email address to receive a password reset link.</p>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
                {error}
              </div>
            )}
            {message && (
              <div className="rounded-lg bg-green-500/10 p-3 text-sm text-green-400 border border-green-500/20">
                {message}
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

            <button 
              type="submit" 
              disabled={loading}
              className="group relative mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
              {!loading && <ArrowRight size={16} className="transition group-hover:translate-x-1" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/login" className="inline-flex items-center text-sm text-slate-400 hover:text-cyan-400 transition">
              <ArrowLeft size={16} className="mr-2" />
              Back to login
            </Link>
          </div>

        </div>
      </motion.div>
    </main>
  );
}
