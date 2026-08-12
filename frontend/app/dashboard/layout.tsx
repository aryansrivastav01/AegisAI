import type { ReactNode } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <main className="flex min-h-screen bg-slate-950 text-white">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Header />

          <section className="flex-1 p-8 overflow-auto">
            {children}
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}