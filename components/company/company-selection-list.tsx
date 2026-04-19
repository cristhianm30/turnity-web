"use client";

import { Company } from "@/types/company";
import { Settings, Check } from "lucide-react";
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {companies.map((company) => {
        const isSelected = selectedCompanyId === company.id;
        return (
          <div
            key={company.id}
            onClick={() => onSelectCompany(company)}
            className={cn(
              "group relative rounded-2xl p-4 transition-all duration-200 cursor-pointer",
              "border-2 backdrop-blur-sm",
              isSelected
                ? "glass-card border-brand-400/60 dark:border-brand-400/50 bg-white/70 dark:bg-white/8 ring-2 ring-brand-500/20"
                : "glass border-white/30 dark:border-white/15 bg-white/50 dark:bg-white/5 hover:border-brand-300/50 dark:hover:border-brand-400/30 hover:bg-white/60 dark:hover:bg-white/8"
            )}
          >
            {/* Checkmark indicator - top right */}
            {isSelected && (
              <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white shadow-md">
                <Check className="h-3 w-3" />
              </div>
            )}

            {/* Company Logo + Info Section */}
            <div className="flex items-start gap-3 mb-3">
              {/* Company Logo Circle */}
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white flex-shrink-0 transition-all",
                isSelected
                  ? "bg-brand-500 shadow-md shadow-brand-500/30"
                  : "bg-brand-400 group-hover:bg-brand-500"
              )}>
                {company.name.charAt(0).toUpperCase()}
              </div>

              {/* Company Name + Tax ID */}
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  "text-sm font-semibold truncate transition-colors",
                  isSelected
                    ? "text-brand-900 dark:text-brand-100"
                    : "text-gray-900 dark:text-gray-100 group-hover:text-brand-800 dark:group-hover:text-brand-200"
                )}>
                  {company.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {company.taxId}
                </p>
              </div>
            </div>

            {/* Settings Button - Only for selected company */}
            {isSelected && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSettingsClick?.(company);
                }}
                className={cn(
                  "w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
                  "bg-brand-500/15 border border-brand-300/40 dark:border-brand-400/30 text-brand-700 dark:text-brand-300",
                  "hover:bg-brand-500/25 hover:border-brand-400/60 dark:hover:bg-brand-500/20 dark:hover:border-brand-400/50",
                  "active:scale-95 text-xs font-medium"
                )}
                title="Configure company"
                aria-label="Configure company"
              >
                <Settings className="h-3.5 w-3.5" />
                <span>Settings</span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
