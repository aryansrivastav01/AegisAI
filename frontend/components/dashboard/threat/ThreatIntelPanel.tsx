"use client";

import {
  ShieldCheck,
  Server,
} from "lucide-react";

interface Provider {
  success: boolean;
  provider: string;
  ioc: string;
  reputation: string;
  confidence: number;

  country?: string;
  network?: string;

  isp?: string;
  domain?: string;

  total_reports?: number;
  is_whitelisted?: boolean;
}

interface ThreatIntelPanelProps {
  threat: {
    ips: {
      ioc: string;
      overall_reputation: string;
      providers: Provider[];
    }[];
  };
}

export default function ThreatIntelPanel({
  threat,
}: ThreatIntelPanelProps) {
  if (!threat.ips.length) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">

      <h2 className="mb-6 text-xl font-semibold text-white">
        Threat Intelligence
      </h2>

      {threat.ips.map((ip) => (

        <div
          key={ip.ioc}
          className="space-y-6 rounded-xl border border-white/10 bg-slate-800/40 p-5"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                IP Address
              </p>

              <h3 className="mt-1 text-lg font-semibold text-cyan-400">
                {ip.ioc}
              </h3>

            </div>

            <div className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2">

              <ShieldCheck
                size={18}
                className="text-green-400"
              />

              <span className="font-semibold text-green-400">
                {ip.overall_reputation}
              </span>

            </div>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {ip.providers.map((provider) => (

              <div
                key={provider.provider}
                className="rounded-xl border border-white/10 bg-slate-900 p-5"
              >

                <div className="mb-4 flex items-center gap-2">

                  <Server
                    size={18}
                    className="text-cyan-400"
                  />

                  <h4 className="font-semibold text-white">
                    {provider.provider}
                  </h4>

                </div>

                <div className="space-y-2 text-sm">

                  <p className="text-slate-300">
                    Reputation:
                    <span className="ml-2 font-semibold text-green-400">
                      {provider.reputation}
                    </span>
                  </p>

                  <p className="text-slate-300">
                    Confidence:
                    <span className="ml-2">
                      {provider.confidence}%
                    </span>
                  </p>

                  {provider.country && (
                    <p className="text-slate-300">
                      Country:
                      <span className="ml-2">
                        {provider.country}
                      </span>
                    </p>
                  )}

                  {provider.network && (
                    <p className="text-slate-300">
                      Network:
                      <span className="ml-2">
                        {provider.network}
                      </span>
                    </p>
                  )}

                  {provider.isp && (
                    <p className="text-slate-300">
                      ISP:
                      <span className="ml-2">
                        {provider.isp}
                      </span>
                    </p>
                  )}

                  {provider.domain && (
                    <p className="text-slate-300">
                      Domain:
                      <span className="ml-2">
                        {provider.domain}
                      </span>
                    </p>
                  )}

                  {provider.total_reports !== undefined && (
                    <p className="text-slate-300">
                      Reports:
                      <span className="ml-2">
                        {provider.total_reports}
                      </span>
                    </p>
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      ))}

    </div>
  );
}