export interface Company {
  id: string;
  name: string;
  taxId: string;
  address: string;
  phone: string;
  ownerUserId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyRequest {
  name: string;
  taxId: string;
  address: string;
  phone: string;
}

export interface CompanyResponse {
  success: boolean;
  data: Company | Company[];
}

export interface CompanyListResponse {
  data: Company[];
}

export interface CreateCompanyResponse {
  data: Company;
}
