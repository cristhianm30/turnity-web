"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
  setSidebarExpanded: (expanded: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => setIsSidebarExpanded((prev) => !prev);
  const setSidebarExpanded = (expanded: boolean) => setIsSidebarExpanded(expanded);

  return (
    <UIContext.Provider value={{ isSidebarExpanded, toggleSidebar, setSidebarExpanded }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
