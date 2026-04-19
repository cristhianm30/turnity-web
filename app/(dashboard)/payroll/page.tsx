"use client";

import { PageHeader, PageContent } from "@/components/layout/header";

export default function PayrollPage() {
  return (
    <PageContent>
      <PageHeader
        title="Payroll"
        subtitle="Manage payroll and compensation"
      />
      <div className="py-12 text-center text-gray-500 dark:text-gray-400">
        <p>Payroll module coming soon...</p>
      </div>
    </PageContent>
  );
}
