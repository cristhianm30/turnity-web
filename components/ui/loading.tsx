"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  label?: string;
  fullscreen?: boolean;
}

export function Loading({
  className,
  size = "md",
  label,
  fullscreen = false,
  ...props
}: LoadingProps) {
  const sizeClass = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        fullscreen && "fixed inset-0 bg-white/50 backdrop-blur-sm z-50",
        className
      )}
      {...props}
    >
      <Loader2
        className={cn("animate-spin text-[#f59e0b]", sizeClass[size])}
        aria-hidden="true"
      />
      {label && (
        <p className="text-sm text-[#7d6d5c]" role="status">
          {label}
        </p>
      )}
    </div>
  );
}

export function PageLoading({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loading size="lg" label={label} />
    </div>
  );
}

export function InlineLoading({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-8">
      <Loading size="md" label={label} />
    </div>
  );
}
