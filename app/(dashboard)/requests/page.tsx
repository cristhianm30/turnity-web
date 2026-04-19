"use client";

import { PageHeader, PageContent } from "@/components/layout/header";

export default function RequestsPage() {
  return (
    <PageContent>
      <PageHeader
        title="Requests"
        subtitle="Review and manage employee requests"
      />
      <div className="py-12 text-center text-gray-500 dark:text-gray-400">
        <p>Requests module coming soon...</p>
      </div>
    </PageContent>
  );
}
