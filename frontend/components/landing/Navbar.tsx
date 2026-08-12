"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Menu, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <div className="mx-auto mt-5 flex w-[95%] max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-6 py-4 backdrop-blur-2xl">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3 transition hover:opacity-90"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/20">

            <Shield className="h-6 w-6 text-cyan-400" />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              ElyvexAI
            </h2>

            <p className="-mt-1 text-xs text-slate-400">
              AI Security Platform
            </p>

          </div>

        </Link>

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-10 text-sm text-slate-300 lg:flex">

          <Link
            href="/"
            className="transition hover:text-cyan-300"
          >
            Home
          </Link>

          <a
            href="#features"
            className="transition hover:text-cyan-300"
          >
            Features
          </a>

          <a
            href="#workflow"
            className="transition hover:text-cyan-300"
          >
            Workflow
          </a>

          <Link
            href="/dashboard"
            className="transition hover:text-cyan-300"
          >
            Dashboard
          </Link>

          <Link
            href="https://github.com/aryansrivastav01/ElyvexAI#readme"
            target="_blank"
            className="transition hover:text-cyan-300"
          >
            Docs
          </Link>

        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          <Link
            href="/login"
            className="hidden px-4 text-sm font-medium text-slate-300 transition hover:text-cyan-400 lg:block"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="hidden items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:scale-105 hover:bg-cyan-300 lg:flex"
          >
            Sign Up
          </Link>

          <button className="rounded-xl border border-white/10 p-2 text-white lg:hidden">
            <Menu size={22} />
          </button>

        </div>

      </div>
    </motion.header>
  );
}