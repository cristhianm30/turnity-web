"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useCompany } from "@/context/company-context";
import { Loading } from "@/components/ui/loading";
import { CompanyModal } from "@/components/company/company-modal";
import type { CreateCompanyRequest, Company } from "@/types/company";

export default function CompanyPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const {
    company: selectedCompany,
    companies,
    isLoading,
    isLoadingCompanies,
    fetchCompanies,
    selectCompany,
    createCompany,
  } = useCompany();

  const [createError, setCreateError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Fetch companies on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchCompanies().catch((err) => {
        console.error("Failed to fetch companies:", err);
      });
    }
  }, [isAuthenticated, fetchCompanies]);

  const handleSelectCompany = (company: Company) => {
    selectCompany(company);
    // Don't navigate automatically - let user use Settings or close modal manually
  };

  const handleCreateCompany = async (data: CreateCompanyRequest) => {
    setIsCreating(true);
    setCreateError(null);

    try {
      const newCompany = await createCompany(data);
      handleSelectCompany(newCompany);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create company";
      setCreateError(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Modal for company selection - ALWAYS OPEN on this page */}
      <CompanyModal
        isOpen={true}
        onClose={() => {
          // Don't allow closing the modal - user must select a company
          // Instead, redirect to dashboard if they have a selected company
          if (selectedCompany) {
            router.push("/dashboard");
          }
        }}
        companies={companies}
        selectedCompanyId={selectedCompany?.id}
        onSelectCompany={handleSelectCompany}
        onCreateCompany={handleCreateCompany}
        isLoadingCompanies={isLoadingCompanies}
        isCreating={isCreating}
        createError={createError}
      />

      {/* Page content - minimal, modal is primary interaction */}
      {selectedCompany && (
        <div className="max-w-6xl mx-auto p-8">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to {selectedCompany.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              You can switch companies anytime from the sidebar or by visiting this page.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
