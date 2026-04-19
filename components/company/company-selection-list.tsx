"use client";

import { Company } from "@/types/company";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanySelectionListProps {
  companies: Company[];
  selectedCompanyId?: string;
  onSelectCompany: (company: Company) => void;
  onSettingsClick?: (company: Company) => void;
}

export function CompanySelectionList({
  companies,
  selectedCompanyId,
  onSelectCompany,
  onSettingsClick,
}: CompanySelectionListProps) {
  return (
    <div className="space-y-2">
      {companies.map((company) => (
        <div
          key={company.id}
          className={cn(
            "group flex items-center gap-4 rounded-xl px-4 py-4 transition-all duration-200 cursor-pointer",
            "border-2 transition-colors",
            selectedCompanyId === company.id
              ? "border-brand-500 bg-brand-50/50 dark:bg-brand-500/10"
              : "border-white/30 dark:border-white/15 bg-white/20 dark:bg-white/5 hover:border-brand-300 dark:hover:border-brand-400/50"
          )}
          onClick={() => onSelectCompany(company)}
        >
          {/* Radio Button */}
          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-400 dark:border-gray-500 flex-shrink-0 transition-all duration-200"
            style={{
              borderColor: selectedCompanyId === company.id ? '#6366f1' : undefined,
              backgroundColor: selectedCompanyId === company.id ? '#6366f1' : undefined,
            }}
          >
            {selectedCompanyId === company.id && (
              <div className="h-2 w-2 rounded-full bg-white"></div>
            )}
          </div>

          {/* Company Logo Circle */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full glass-btn-primary text-lg font-bold text-white flex-shrink-0">
            {company.name.charAt(0).toUpperCase()}
          </div>

          {/* Company Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {company.name}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {company.taxId}
            </p>
          </div>

          {/* Settings Button - Only for selected company, turquoise */}
          {selectedCompanyId === company.id && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSettingsClick?.(company);
              }}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200",
                "bg-cyan-500/90 hover:bg-cyan-600 text-white hover:scale-105 active:scale-95",
                "shadow-md hover:shadow-lg flex-shrink-0"
              )}
              title="Configure company"
              aria-label="Configure company"
            >
              <Settings className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
