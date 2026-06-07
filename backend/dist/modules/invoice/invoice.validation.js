"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoicesSchema = exports.updateInvoiceSchema = exports.createInvoiceSchema = exports.InvoiceStatus = void 0;
const zod_1 = require("zod");
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["SENT"] = "Sent";
    InvoiceStatus["UNPAID"] = "Unpaid";
    InvoiceStatus["OVERDUE"] = "Overdue";
    InvoiceStatus["PAID"] = "Paid";
    InvoiceStatus["VOID"] = "Void";
    InvoiceStatus["DRAFT"] = "Draft";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
exports.createInvoiceSchema = zod_1.z.object({
    body: zod_1.z.object({
        customerId: zod_1.z.string(),
        amount: zod_1.z.number().positive(),
        taxRate: zod_1.z.number().refine((value) => [0, 3, 5, 18, 28].includes(value), { message: "Invalid tax rate", }),
        status: zod_1.z.nativeEnum(InvoiceStatus),
        issueDate: zod_1.z.string(),
        dueDate: zod_1.z.string(),
    }),
});
exports.updateInvoiceSchema = zod_1.z.object({
    body: zod_1.z.object({
        customerId: zod_1.z.string(),
        amount: zod_1.z.number().positive(),
        taxRate: zod_1.z.number().refine((value) => [0, 3, 5, 18, 28].includes(value), { message: "Invalid tax rate", }),
        status: zod_1.z.nativeEnum(InvoiceStatus),
        issueDate: zod_1.z.string(),
        dueDate: zod_1.z.string(),
    }),
    params: zod_1.z.object({ invoiceId: zod_1.z.string(), }),
});
exports.getInvoicesSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.coerce.number().min(1).optional(),
        limit: zod_1.z.coerce.number().min(1).max(100).optional(),
        taxRate: zod_1.z.coerce.number().optional(),
        search: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
        customerId: zod_1.z.string().optional(),
        issueDateFrom: zod_1.z.string().optional(),
        issueDateTo: zod_1.z.string().optional(),
        dueDateFrom: zod_1.z.string().optional(),
        dueDateTo: zod_1.z.string().optional(),
        sortBy: zod_1.z.enum(["invoiceId", "customer", "amount", "total", "dueDate"]).optional(),
        sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    }),
});
