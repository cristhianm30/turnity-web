"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { useUI } from "@/context/ui-context";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isSidebarExpanded } = useUI();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main 
        id="main-content"
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          isSidebarExpanded ? "ml-64" : "ml-20"
        )}
      >
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
