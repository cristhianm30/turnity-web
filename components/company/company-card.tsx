"use client";

import { Company } from "@/types/company";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
        "cursor-pointer p-6 min-h-[240px] flex flex-col justify-between",
        isSelected && "border-[#f59e0b] bg-[#fffbf0] ring-2 ring-[#f59e0b]"
      )}
    >
      <div>
        <h3 className="text-xl font-bold text-[#1c1207] mb-2">{company.name}</h3>
        <div className="space-y-2 text-sm text-[#6b5d52]">
          <p>
            <span className="font-semibold">Tax ID:</span> {company.taxId}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {company.address}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {company.phone}
          </p>
        </div>
      </div>
      {isSelected && (
        <div className="mt-4 inline-flex items-center rounded-md bg-[#d1fae5] px-3 py-1 text-sm font-medium text-[#065f46] w-fit">
          ✓ Selected
        </div>
      )}
    </Card>
  );
}
