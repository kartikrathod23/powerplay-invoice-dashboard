export interface Customer{
  _id: string;
  name: string;
  company: string;
}

export interface Invoice{
  invoiceId: string;
  amount: number;
  taxRate: number;
  tax: number;
  total: number;

  status:
    | "Sent"
    | "Unpaid"
    | "Overdue"
    | "Paid"
    | "Void"
    | "Draft";

  issueDate: string;
  dueDate: string;
  customer: Customer;
}

export interface InvoicePagination{
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface InvoiceResponse{
  success: boolean;
  data: Invoice[];
  pagination: InvoicePagination;
}