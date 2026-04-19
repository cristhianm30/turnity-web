"use client";

import { useState } from "react";
import { Company, CreateCompanyRequest } from "@/types/company";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CompanySelectionList } from "./company-selection-list";
import { CompanyEmptyState } from "./company-empty-state";
import { Plus, X } from "lucide-react";

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  companies: Company[];
  selectedCompanyId?: string;
  onSelectCompany: (company: Company) => void;
  onCreateCompany?: (data: CreateCompanyRequest) => Promise<void>;
  isLoadingCompanies?: boolean;
  isCreating?: boolean;
  createError?: string | null;
  dismissible?: boolean; // whether user can close the modal
}

export function CompanyModal({
  isOpen,
  onClose,
  companies,
  selectedCompanyId,
  onSelectCompany,
  onCreateCompany,
  isCreating = false,
  createError,
  dismissible = true,
}: CompanyModalProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CreateCompanyRequest>({
    name: "",
    taxId: "",
    address: "",
    phone: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onCreateCompany) return;

    try {
      await onCreateCompany(formData);
      setFormData({ name: "", taxId: "", address: "", phone: "" });
      setShowCreateForm(false);
    } catch {
      // Error is handled by parent component
    }
  };

  const handleClose = () => {
    if (dismissible) {
      setShowCreateForm(false);
      setFormData({ name: "", taxId: "", address: "", phone: "" });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {/* Glass Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 glass backdrop-blur-xl bg-black/20 dark:bg-black/40 transition-all duration-300"
          onClick={dismissible ? handleClose : undefined}
        />
      )}

       {/* Modal Content */}
       <DialogContent className="max-w-2xl p-0 border-0 border-brand-500/15 bg-white/80 dark:bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl dark:shadow-2xl/40 dark:border dark:border-brand-500/15 overflow-hidden">
         <div className="relative">
           {/* Close Button - only show if dismissible */}
           {dismissible && (
             <button
               onClick={handleClose}
               className="absolute top-6 right-6 z-50 p-2 rounded-xl glass hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
             >
               <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
             </button>
           )}

            {/* Header with Brand Gradient */}
            <div className="p-8 pb-6 border-b border-brand-500/30 dark:border-brand-500/20 bg-gradient-to-br from-brand-600/10 via-brand-500/8 to-brand-400/5 dark:from-brand-600/20 dark:via-brand-500/15 dark:to-brand-400/10">
              <h2 className="text-2xl font-bold text-brand-900 dark:text-brand-100 mb-2">
                {showCreateForm ? "Create New Company" : "Select Company"}
              </h2>
              <p className="text-brand-700/80 dark:text-brand-200/70">
                {showCreateForm
                  ? "Fill in the company details to get started."
                  : companies.length === 0
                    ? "You don't have any companies yet."
                    : `Choose a company to manage or create a new one.`}
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              {showCreateForm ? (
                // Create Form - Improved styling with visual harmony
                <form onSubmit={handleCreateSubmit} className="space-y-6">
                  {createError && (
                    <div className="rounded-xl glass backdrop-blur-md border border-red-200/50 dark:border-red-900/50 bg-red-50/80 dark:bg-red-950/30 p-4 flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold">!</span>
                      </div>
                      <p className="text-sm text-red-700 dark:text-red-400 font-medium leading-tight">
                        {createError}
                      </p>
                    </div>
                  )}

                  {/* Fields Grid with visual organization */}
                  <div className="space-y-4">
                    {/* Row 1: Company Name & Tax ID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="group">
                        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-2.5">
                          Company Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-500/10 via-brand-400/5 to-transparent pointer-events-none"></div>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            placeholder="Acme Corporation"
                            required
                            disabled={isCreating}
                            className="glass dark:bg-white/5 border-brand-200/30 dark:border-brand-400/20 focus:border-brand-400 dark:focus:border-brand-400 focus:ring-brand-500/30 transition-all rounded-lg h-11 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                           />
                        </div>
                      </div>
                      <div className="group">
                        <label htmlFor="taxId" className="block text-xs font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-2.5">
                          Tax ID
                        </label>
                        <div className="relative">
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-500/10 via-brand-400/5 to-transparent pointer-events-none"></div>
                          <Input
                            id="taxId"
                            name="taxId"
                            value={formData.taxId}
                            onChange={handleFormChange}
                            placeholder="12-3456789"
                            required
                            disabled={isCreating}
                            className="glass dark:bg-white/5 border-brand-200/30 dark:border-brand-400/20 focus:border-brand-400 dark:focus:border-brand-400 focus:ring-brand-500/30 transition-all rounded-lg h-11 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Address */}
                    <div className="group">
                      <label htmlFor="address" className="block text-xs font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-2.5">
                        Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-500/10 via-brand-400/5 to-transparent pointer-events-none"></div>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleFormChange}
                          placeholder="123 Main Street, City, State 12345"
                          required
                          disabled={isCreating}
                          className="glass dark:bg-white/5 border-brand-200/30 dark:border-brand-400/20 focus:border-brand-400 dark:focus:border-brand-400 focus:ring-brand-500/30 transition-all rounded-lg h-11 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </div>
                    </div>

                    {/* Row 3: Phone */}
                    <div className="group">
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-2.5">
                        Phone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-500/10 via-brand-400/5 to-transparent pointer-events-none"></div>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder="+1 (555) 123-4567"
                          required
                          disabled={isCreating}
                          className="glass dark:bg-white/5 border-brand-200/30 dark:border-brand-400/20 focus:border-brand-400 dark:focus:border-brand-400 focus:ring-brand-500/30 transition-all rounded-lg h-11 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                         />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-end pt-2 border-t border-brand-200/30 dark:border-brand-400/15">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setShowCreateForm(false);
                        setFormData({ name: "", taxId: "", address: "", phone: "" });
                      }}
                      disabled={isCreating}
                      className="rounded-lg"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isCreating}
                      disabled={isCreating}
                      className="rounded-lg"
                    >
                      {isCreating ? "Creating..." : "Create Company"}
                    </Button>
                  </div>
                </form>
            ) : // Company List or Empty State
            companies.length === 0 ? (
              <div className="py-8">
                <CompanyEmptyState onCreateClick={() => setShowCreateForm(true)} />
              </div>
            ) : (
              <div className="space-y-4">
                <CompanySelectionList
                  companies={companies}
                  selectedCompanyId={selectedCompanyId}
                  onSelectCompany={onSelectCompany}
                  onSettingsClick={(company) => {
                    // Navigate to company settings page
                    window.location.href = `/company/${company.id}/settings`;
                  }}
                />

                <div className="pt-4 border-t border-white/20 dark:border-white/10 flex gap-3">
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    variant="primary"
                    className="flex-1 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    New Company
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
