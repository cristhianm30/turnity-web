"use client";

import { Company } from "@/types/company";
import { CompanyCard } from "./company-card";

interface CompanyListProps {
  companies: Company[];
  selectedCompanyId?: string;
  onSelectCompany: (company: Company) => void;
}

export function CompanyList({
  companies,
  selectedCompanyId,
  onSelectCompany,
}: CompanyListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
          isSelected={selectedCompanyId === company.id}
          onClick={onSelectCompany}
        />
      ))}
    </div>
  );
}
