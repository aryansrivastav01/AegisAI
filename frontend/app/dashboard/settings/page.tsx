"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Palette, Bell, Save, Shield, HardDrive, Zap, Check } from "lucide-react";

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();
  
  // Profile State
  const [profile, setProfile] = useState({
    name: "Administrator account",
    role: "SOC Operator",
    email: "admin@aegisai.local"
  });

  // Preferences State
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    autoDownload: true,
    aiSummaries: true,
    darkMode: true
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load from localStorage if available
    const savedSettings = localStorage.getItem("aegis_settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.preferences) {
          setPreferences(parsed.preferences);
          setTheme(parsed.preferences.darkMode ? "dark" : "light");
        }
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    // Avoid synchronous setState in effect
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("aegis_settings", JSON.stringify({
        profile,
        preferences
      }));
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
          <p className="mt-2 text-slate-400">
            Manage your profile, security preferences, and integration settings.
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="min-w-36 transition-all">
          {saving ? (
            <div className="flex items-center gap-2">
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </div>
          ) : saved ? (
            <div className="flex items-center gap-2 text-green-400">
              <Check className="size-4" />
              Saved
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Save className="size-4" />
              Save Changes
            </div>
          )}
        </Button>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        {/* Profile Settings */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-sm backdrop-blur-xl transition-colors hover:bg-slate-900/80">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400">
              <User className="size-5" />
            </div>
            <h2 className="text-xl font-semibold text-white">Profile Information</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Full Name</label>
              <Input 
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Enter your name" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <Input 
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="admin@example.com" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Role</label>
              <Input 
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                placeholder="e.g. SOC Operator" 
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-sm backdrop-blur-xl transition-colors hover:bg-slate-900/80">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400">
              <Zap className="size-5" />
            </div>
            <h2 className="text-xl font-semibold text-white">System Preferences</h2>
          </div>
          <div className="space-y-4">
            {/* Toggle Item 1 */}
            <div 
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                preferences.emailAlerts ? 'border-primary/50 bg-primary/5' : 'border-white/5 bg-white/5 hover:bg-white/10'
              }`}
              onClick={() => setPreferences({ ...preferences, emailAlerts: !preferences.emailAlerts })}
            >
              <div className="flex items-center gap-4">
                <Bell className={`size-5 ${preferences.emailAlerts ? 'text-primary' : 'text-slate-400'}`} />
                <div>
                  <div className="font-medium text-white">Email Alerts</div>
                  <div className="text-xs text-slate-400">Receive alerts for critical incidents</div>
                </div>
              </div>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${preferences.emailAlerts ? 'bg-primary' : 'bg-slate-700'}`}>
                <div className={`bg-white size-4 rounded-full transition-transform ${preferences.emailAlerts ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Toggle Item 2 */}
            <div 
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                preferences.autoDownload ? 'border-primary/50 bg-primary/5' : 'border-white/5 bg-white/5 hover:bg-white/10'
              }`}
              onClick={() => setPreferences({ ...preferences, autoDownload: !preferences.autoDownload })}
            >
              <div className="flex items-center gap-4">
                <HardDrive className={`size-5 ${preferences.autoDownload ? 'text-primary' : 'text-slate-400'}`} />
                <div>
                  <div className="font-medium text-white">Auto-download Reports</div>
                  <div className="text-xs text-slate-400">Save incident reports automatically</div>
                </div>
              </div>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${preferences.autoDownload ? 'bg-primary' : 'bg-slate-700'}`}>
                <div className={`bg-white size-4 rounded-full transition-transform ${preferences.autoDownload ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Toggle Item 3 */}
            <div 
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                preferences.aiSummaries ? 'border-primary/50 bg-primary/5' : 'border-white/5 bg-white/5 hover:bg-white/10'
              }`}
              onClick={() => setPreferences({ ...preferences, aiSummaries: !preferences.aiSummaries })}
            >
              <div className="flex items-center gap-4">
                <Shield className={`size-5 ${preferences.aiSummaries ? 'text-primary' : 'text-slate-400'}`} />
                <div>
                  <div className="font-medium text-white">AI Summaries</div>
                  <div className="text-xs text-slate-400">Generate automated threat summaries</div>
                </div>
              </div>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${preferences.aiSummaries ? 'bg-primary' : 'bg-slate-700'}`}>
                <div className={`bg-white size-4 rounded-full transition-transform ${preferences.aiSummaries ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Toggle Item 4 */}
            <div 
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                preferences.darkMode ? 'border-primary/50 bg-primary/5' : 'border-white/5 bg-white/5 hover:bg-white/10'
              }`}
              onClick={() => {
                const newDarkMode = !preferences.darkMode;
                setPreferences({ ...preferences, darkMode: newDarkMode });
                setTheme(newDarkMode ? "dark" : "light");
              }}
            >
              <div className="flex items-center gap-4">
                <Palette className={`size-5 ${preferences.darkMode ? 'text-primary' : 'text-slate-400'}`} />
                <div>
                  <div className="font-medium text-white">Dark Mode</div>
                  <div className="text-xs text-slate-400">Use dark theme visuals</div>
                </div>
              </div>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${preferences.darkMode ? 'bg-primary' : 'bg-slate-700'}`}>
                <div className={`bg-white size-4 rounded-full transition-transform ${preferences.darkMode ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}