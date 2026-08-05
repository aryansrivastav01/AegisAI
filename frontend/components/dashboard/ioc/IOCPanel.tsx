"use client";

import {
  Globe,
  Link,
  Shield,
  Server,
} from "lucide-react";

interface IOCPanelProps {
  iocs: {
    ips: string[];
    domains: string[];
    urls: string[];
    hashes: string[];
  };
}

function Section({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: React.ElementType;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/40 p-5">

      <div className="mb-4 flex items-center gap-3">

        <Icon
          size={18}
          className="text-cyan-400"
        />

        <h3 className="font-semibold text-white">
          {title}
        </h3>

      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-500">
          No {title} Found
        </p>
      ) : (
        <div className="space-y-2">

          {items.map((item) => (
            <div
              key={item}
              className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-cyan-300 break-all"
            >
              {item}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default function IOCPanel({
  iocs,
}: IOCPanelProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">

      <h2 className="mb-6 text-xl font-semibold text-white">
        Indicators of Compromise
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <Section
          title="IP Addresses"
          icon={Server}
          items={iocs.ips}
        />

        <Section
          title="Domains"
          icon={Globe}
          items={iocs.domains}
        />

        <Section
          title="URLs"
          icon={Link}
          items={iocs.urls}
        />

        <Section
          title="Hashes"
          icon={Shield}
          items={iocs.hashes}
        />

      </div>

    </div>
  );
}