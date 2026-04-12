"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-8">
        <div className="flex gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-red-900">Something went wrong</h1>
            <p className="text-sm text-red-700 mt-1">
              An error occurred while loading the page. Please try again.
            </p>
          </div>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 rounded bg-red-100 p-4 text-xs text-red-800 font-mono overflow-auto max-h-32">
            {error.message}
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={reset}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Button
            variant="secondary"
            onClick={() => (window.location.href = "/dashboard")}
            className="flex-1"
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
