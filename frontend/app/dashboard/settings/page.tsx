export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-slate-400">
          Manage your profile, security preferences and integration settings.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Profile</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>Administrator account</p>
            <p>Role: SOC Operator</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">API Keys</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>VirusTotal: Configured</p>
            <p>AbuseIPDB: Configured</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Theme</h2>
          <div className="mt-4 text-sm text-slate-300">
            Dark mode is active with cyber-themed visuals.
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Preferences</h2>
          <div className="mt-4 text-sm text-slate-300">
            Email alerts, report auto-downloads and AI summaries are enabled.
          </div>
        </div>
      </div>
    </div>
  );
}