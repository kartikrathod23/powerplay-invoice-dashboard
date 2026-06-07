"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = exports.InvoiceStatus = void 0;
const mongoose_1 = require("mongoose");
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["SENT"] = "Sent";
    InvoiceStatus["UNPAID"] = "Unpaid";
    InvoiceStatus["OVERDUE"] = "Overdue";
    InvoiceStatus["PAID"] = "Paid";
    InvoiceStatus["VOID"] = "Void";
    InvoiceStatus["DRAFT"] = "Draft";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
const invoiceSchema = new mongoose_1.Schema({
    invoiceId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
        index: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    taxRate: {
        type: Number,
        required: true,
        enum: [0, 3, 5, 18, 28],
    },
    tax: {
        type: Number,
        required: true,
        min: 0,
    },
    total: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: Object.values(InvoiceStatus),
        required: true,
        index: true,
    },
    issueDate: {
        type: Date,
        required: true,
        index: true,
    },
    dueDate: {
        type: Date,
        required: true,
        index: true,
    },
}, {
    timestamps: true,
});
invoiceSchema.index({ customerId: 1, status: 1, });
invoiceSchema.index({ issueDate: -1, });
exports.Invoice = (0, mongoose_1.model)("Invoice", invoiceSchema);
