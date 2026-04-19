"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useCompany } from "@/context/company-context";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { CompanyList } from "@/components/company/company-list";
import { CompanyEmptyState } from "@/components/company/company-empty-state";
import { CreateCompanyModal } from "@/components/company/create-company-modal";
import type { CreateCompanyRequest, Company } from "@/types/company";

export default function CompanyPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const {
    company: selectedCompany,
    companies,
    isLoading,
    isLoadingCompanies,
    error,
    fetchCompanies,
    selectCompany,
    createCompany,
  } = useCompany();

  const [isModalOpen, setIsModalOpen] = useState(false);
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
    router.push("/dashboard");
  };

  const handleCreateCompany = async (data: CreateCompanyRequest) => {
    setIsCreating(true);
    setCreateError(null);

    try {
      const newCompany = await createCompany(data);
      setIsModalOpen(false);
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
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1c1207] mb-2">Select a Company</h1>
        <p className="text-[#6b5d52]">
          Choose a company to manage or create a new one.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-6 text-red-700">
          {error}
        </div>
      )}

      {isLoadingCompanies ? (
        <Loading />
      ) : companies.length === 0 ? (
        <CompanyEmptyState onCreateClick={() => setIsModalOpen(true)} />
      ) : (
        <>
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#1c1207]">
              Your Companies ({companies.length})
            </h2>
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
            >
              + New Company
            </Button>
          </div>
          <CompanyList
            companies={companies}
            selectedCompanyId={selectedCompany?.id}
            onSelectCompany={handleSelectCompany}
          />
        </>
      )}

      <CreateCompanyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCreateError(null);
        }}
        onSubmit={handleCreateCompany}
        isLoading={isCreating}
        error={createError}
      />
    </div>
  );
}
