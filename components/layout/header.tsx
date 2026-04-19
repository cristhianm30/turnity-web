"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  sticky?: boolean;
}

export function PageHeader({ title, subtitle, children, sticky = false }: PageHeaderProps) {
  return (
    <div className={
      sticky 
        ? "sticky top-0 z-30 -mx-6 -mt-6 mb-8 px-6 py-6 glass backdrop-blur-xl"
        : "mb-8"
    }>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <h1 className="font-display text-3xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-gray-600 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
        {children && <div className="flex gap-2">{children}</div>}
      </div>
    </div>
  );
}

export function PageContent({ children, withGradient = false }: { children: ReactNode; withGradient?: boolean }) {
  return (
    <div className={
      withGradient
        ? "min-h-screen gradient-mesh"
        : "min-h-screen bg-canvas dark:bg-canvas-dark"
    }>
      {children}
    </div>
  );
}
