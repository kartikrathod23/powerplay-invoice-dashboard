import { api } from "./client";

export interface InvoiceFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  taxRate?: string;
  issueDateFrom?: string;
  issueDateTo?: string;

  sortBy?:
    | "invoiceId"
    | "customer"
    | "amount"
    | "total"
    | "dueDate";

  sortOrder?: "asc" | "desc";
}

export const getInvoices = async(filters: InvoiceFilters) =>{
  const response = await api.get("/invoices",{params: filters,});
  return response.data;
};

export const getInvoiceById =async (invoiceId: string)=>{
  const response =await api.get(`/invoices/${invoiceId}`);
  return response.data;
};

export const createInvoice=async(payload: {
      customerId: string;
      amount: number;
      taxRate: number;
      status: string;
      issueDate: string;
      dueDate: string;
    }
  ) => {
    const response =await api.post("/invoices",payload);
    return response.data;
};


export const updateInvoice =async(
    invoiceId: string,
    payload: {
      customerId: string;
      amount: number;
      taxRate: number;
      status: string;
      issueDate: string;
      dueDate: string;
    }
  )=>{
    const response =await api.put(`/invoices/${invoiceId}`,payload);
    return response.data;
};