"use client";

import { Button } from "@/components/ui/button";

interface CompanyEmptyStateProps {
  onCreateClick: () => void;
}

export function CompanyEmptyState({ onCreateClick }: CompanyEmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="text-center">
        <div className="mb-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-[#fef3c7] flex items-center justify-center">
            <svg
              className="h-8 w-8 text-[#d97706]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#1c1207] mb-2">No Companies Yet</h3>
        <p className="text-[#6b5d52] mb-6 max-w-sm">
          You don&apos;t have any companies yet. Create your first company to get started.
        </p>
        <Button variant="primary" onClick={onCreateClick}>
          Create Your First Company
        </Button>
      </div>
    </div>
  );
}
