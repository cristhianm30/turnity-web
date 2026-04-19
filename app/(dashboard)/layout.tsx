"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { useUI } from "@/context/ui-context";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isSidebarExpanded } = useUI();

  return (
    <div className="flex min-h-screen bg-canvas dark:bg-canvas-dark">
      <Sidebar />
      <main 
        id="main-content"
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          "bg-gradient-to-br from-canvas via-canvas-alt to-canvas dark:from-canvas-dark dark:via-canvas-dark-alt dark:to-canvas-dark",
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
