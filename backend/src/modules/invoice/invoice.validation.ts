import { z } from "zod";

export enum InvoiceStatus{
  SENT = "Sent",
  UNPAID = "Unpaid",
  OVERDUE = "Overdue",
  PAID = "Paid",
  VOID = "Void",
  DRAFT = "Draft",
}

export const createInvoiceSchema = z.object({
  body: z.object({
    customerId: z.string(),
    amount: z.number().positive(),
    taxRate: z.number().refine((value) =>[0, 3, 5, 18, 28].includes(value),{message: "Invalid tax rate",}), 
    status: z.nativeEnum(InvoiceStatus),
    issueDate: z.string(),
    dueDate: z.string(),
  }),
});


export const updateInvoiceSchema = z.object({
  body: z.object({
    customerId: z.string(),
    amount: z.number().positive(),
    taxRate: z.number().refine((value) =>[0, 3, 5, 18, 28].includes(value),{message: "Invalid tax rate",}),
    status: z.nativeEnum(InvoiceStatus),
    issueDate: z.string(),
    dueDate: z.string(),
  }),

  params: z.object({invoiceId: z.string(), }),
});


export const getInvoicesSchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    taxRate: z.coerce.number().optional(),
    search: z.string().optional(),
    status: z.string().optional(),
    customerId: z.string().optional(),
    issueDateFrom: z.string().optional(),
    issueDateTo: z.string().optional(),
    dueDateFrom: z.string().optional(),
    dueDateTo: z.string().optional(),
    
    sortBy: z.enum(["invoiceId","customer","amount","total","dueDate"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});