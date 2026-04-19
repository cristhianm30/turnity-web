"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateCompanyRequest } from "@/types/company";

interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCompanyRequest) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export function CreateCompanyModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  error,
}: CreateCompanyModalProps) {
  const [formData, setFormData] = useState<CreateCompanyRequest>({
    name: "",
    taxId: "",
    address: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormData({ name: "", taxId: "", address: "", phone: "" });
      onClose();
    } catch {
      // Error is handled by parent component
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Company</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#1c1207] mb-1">
              Company Name *
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Acme Corp"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="taxId" className="block text-sm font-medium text-[#1c1207] mb-1">
              Tax ID *
            </label>
            <Input
              id="taxId"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              placeholder="e.g. 12-3456789"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-[#1c1207] mb-1">
              Address *
            </label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. 123 Main St, City, State"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#1c1207] mb-1">
              Phone *
            </label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 (555) 123-4567"
              required
              disabled={isLoading}
            />
          </div>
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Company"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
