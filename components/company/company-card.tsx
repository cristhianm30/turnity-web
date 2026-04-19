"use client";

import { Company } from "@/types/company";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface CompanyCardProps {
  company: Company;
  isSelected?: boolean;
  onClick?: (company: Company) => void;
}

export function CompanyCard({ company, isSelected, onClick }: CompanyCardProps) {
  return (
    <Card
      hoverable
      onClick={() => onClick?.(company)}
      className={cn(
        "cursor-pointer p-6 min-h-[220px] flex flex-col justify-between glass dark:bg-white/10 border-white/40 dark:border-white/20 rounded-2xl transition-all duration-200 hover:border-sun-400/50 dark:hover:border-sun-400/30 hover:shadow-lg dark:hover:shadow-lg/20",
        isSelected && "border-sun-400/80 dark:border-sun-400/60 bg-sun-50/50 dark:bg-sun-500/10 ring-2 ring-sun-400/50 dark:ring-sun-400/30 shadow-lg"
      )}
    >
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{company.name}</h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Tax ID:</span> {company.taxId}
          </p>
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Address:</span> {company.address}
          </p>
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Phone:</span> {company.phone}
          </p>
        </div>
      </div>
      {isSelected && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg glass bg-sun-50/80 dark:bg-sun-500/20 px-3 py-1.5 text-sm font-semibold text-sun-700 dark:text-sun-400 w-fit">
          <CheckCircle2 className="h-4 w-4" />
          Selected
        </div>
      )}
    </Card>
  );
}
