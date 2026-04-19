"use client";

import { Button } from "@/components/ui/button";
import { Inbox } from "lucide-react";

interface CompanyEmptyStateProps {
  onCreateClick: () => void;
}

export function CompanyEmptyState({ onCreateClick }: CompanyEmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="mb-6">
          <div className="mx-auto h-16 w-16 rounded-2xl glass bg-brand-100/80 dark:bg-brand-500/20 flex items-center justify-center">
            <Inbox className="h-8 w-8 text-brand-500 dark:text-brand-400" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Companies Yet</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
          You don&apos;t have any companies yet. Create your first company to get started.
        </p>
        <Button variant="primary" onClick={onCreateClick} className="rounded-xl">
          Create Your First Company
        </Button>
      </div>
    </div>
  );
}
