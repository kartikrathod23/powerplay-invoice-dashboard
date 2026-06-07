"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoiceByIdController = exports.updateInvoiceController = exports.createInvoiceController = exports.getInvoicesController = void 0;
const invoice_service_1 = require("./invoice.service");
const getInvoicesController = async (req, res) => {
    try {
        const result = await (0, invoice_service_1.getInvoicesService)(req.query);
        res.status(200).json({
            success: true,
            message: "Invoices fetched successfully",
            data: result.invoices,
            pagination: result.pagination,
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        res.status(500).json({
            success: false,
            message,
        });
    }
};
exports.getInvoicesController = getInvoicesController;
const createInvoiceController = async (req, res) => {
    try {
        const invoice = await (0, invoice_service_1.createInvoiceService)(req.body);
        res.status(201).json({
            success: true,
            message: "Invoice created successfully",
            data: invoice,
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to create invoice",
        });
    }
};
exports.createInvoiceController = createInvoiceController;
const updateInvoiceController = async (req, res) => {
    try {
        const invoice = await (0, invoice_service_1.updateInvoiceService)(req.params.invoiceId, req.body);
        res.status(200).json({
            success: true,
            message: "Invoice updated successfully",
            data: invoice,
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to update invoice",
        });
    }
};
exports.updateInvoiceController = updateInvoiceController;
const getInvoiceByIdController = async (req, res) => {
    try {
        const invoice = await (0, invoice_service_1.getInvoiceByIdService)(req.params.invoiceId);
        res.status(200).json({
            success: true,
            message: "Invoice fetched successfully",
            data: invoice,
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to fetch invoice",
        });
    }
};
exports.getInvoiceByIdController = getInvoiceByIdController;
