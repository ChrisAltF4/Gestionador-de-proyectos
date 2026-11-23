import type { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 md:flex">
      <Sidebar />
      <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}