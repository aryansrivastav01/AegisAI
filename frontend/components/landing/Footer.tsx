"use client";

import Link from "next/link";
import {
  Shield,
  ArrowUpRight,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-20">

      <div className="section px-6">

        <div className="grid gap-12 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">

                <Shield className="text-cyan-400" />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  ElyvexAI
                </h2>

                <p className="text-xs text-slate-500">
                  AI Security Platform
                </p>

              </div>

            </div>

            <p className="leading-8 text-slate-400">

              AI-powered cybersecurity platform for
              threat intelligence, IOC extraction,
              AI investigation and automated SOC reporting.

            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="mb-5 font-bold">
              Product
            </h3>

            <div className="space-y-3 text-slate-400">

              <Link href="/dashboard" className="block hover:text-cyan-300">
                Dashboard
              </Link>

              <a href="#features" className="block hover:text-cyan-300">
                Features
              </a>

              <a href="#workflow" className="block hover:text-cyan-300">
                Workflow
              </a>

            </div>

          </div>

          {/* Resources */}

          <div>

            <h3 className="mb-5 font-bold">
              Resources
            </h3>

            <div className="space-y-3 text-slate-400">

              <Link
                href="https://github.com/aryansrivastav01/ElyvexAI"
                target="_blank"
                className="flex items-center gap-2 hover:text-cyan-300"
              >
                <ArrowUpRight size={16} />
GitHub
              </Link>

              <Link
                href="https://github.com/aryansrivastav01/ElyvexAI#readme"
                target="_blank"
                className="flex items-center gap-2 hover:text-cyan-300"
              >
                <ArrowUpRight size={16} />
                Documentation
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-5 font-bold">
              Contact
            </h3>

            <div className="space-y-3 text-slate-400">

              <div className="flex items-center gap-2">

                <Mail size={16} />

                contact@elyvexai.dev

              </div>

              <p>Open Source Project</p>

              <p>Version 1.0.0</p>

            </div>

          </div>

        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row">

          <p>
            © 2026 ElyvexAI. All Rights Reserved.
          </p>

          <p>
            Built with ❤️ using Next.js, FastAPI & Ollama.
          </p>

        </div>

      </div>

    </footer>
  );
}