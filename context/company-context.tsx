"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { apiClient } from "@/lib/api-client";
import type { Company, CreateCompanyRequest, CompanyListResponse, CreateCompanyResponse } from "@/types/company";

interface CompanyContextType {
  company: Company | null;
  companies: Company[];
  isLoading: boolean;
  isLoadingCompanies: boolean;
  error: string | null;
  fetchCompanies: () => Promise<void>;
  selectCompany: (company: Company) => void;
  createCompany: (data: CreateCompanyRequest) => Promise<Company>;
  clearCompany: () => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

const COMPANY_KEY = "turnity_selected_company";

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<Company | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearCompany = useCallback(() => {
    localStorage.removeItem(COMPANY_KEY);
    setCompany(null);
  }, []);

  const selectCompany = useCallback((selectedCompany: Company) => {
    localStorage.setItem(COMPANY_KEY, JSON.stringify(selectedCompany));
    setCompany(selectedCompany);
  }, []);

  const fetchCompanies = useCallback(async () => {
    setIsLoadingCompanies(true);
    setError(null);

    try {
      const response = await apiClient<CompanyListResponse>("/company", {
        method: "GET",
      });

      setCompanies(response.data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch companies.";
      setError(errorMessage);
    } finally {
      setIsLoadingCompanies(false);
    }
  }, []);

  const createCompany = useCallback(async (data: CreateCompanyRequest): Promise<Company> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient<CreateCompanyResponse>("/company", {
        method: "POST",
        body: data,
      });

      const newCompany = response.data;
      setCompanies((prev) => [...prev, newCompany]);
      selectCompany(newCompany);
      return newCompany;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create company.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [selectCompany]);

  // Initialize company state from localStorage on mount
  useEffect(() => {
    const storedCompany = typeof window !== "undefined" ? localStorage.getItem(COMPANY_KEY) : null;

    if (storedCompany) {
      try {
        setCompany(JSON.parse(storedCompany));
      } catch {
        // Invalid stored data, clear it
        localStorage.removeItem(COMPANY_KEY);
      }
    }

    setIsLoading(false);
  }, []);

  // Clear company when user logs out (listen for auth-unauthorized event)
  useEffect(() => {
    const handleUnauthorized = () => {
      clearCompany();
    };

    window.addEventListener("auth-unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth-unauthorized", handleUnauthorized);
  }, [clearCompany]);

  const value: CompanyContextType = {
    company,
    companies,
    isLoading,
    isLoadingCompanies,
    error,
    fetchCompanies,
    selectCompany,
    createCompany,
    clearCompany,
  };

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}
