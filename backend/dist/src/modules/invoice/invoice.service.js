"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoiceByIdService = exports.updateInvoiceService = exports.createInvoiceService = exports.getInvoicesService = void 0;
const mongoose_1 = require("mongoose");
const invoice_model_1 = require("./invoice.model");
const customer_model_1 = require("../customer/customer.model");
const ApiError_1 = require("../../utils/ApiError");
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["SENT"] = "Sent";
    InvoiceStatus["UNPAID"] = "Unpaid";
    InvoiceStatus["OVERDUE"] = "Overdue";
    InvoiceStatus["PAID"] = "Paid";
    InvoiceStatus["VOID"] = "Void";
    InvoiceStatus["DRAFT"] = "Draft";
})(InvoiceStatus || (InvoiceStatus = {}));
const getInvoicesService = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const { search, status, taxRate, customerId, issueDateFrom, issueDateTo, dueDateFrom, dueDateTo, sortBy, sortOrder, } = query;
    const matchStage = {};
    if (status) {
        matchStage.status = status;
    }
    if (taxRate !== undefined) {
        matchStage.taxRate = Number(taxRate);
    }
    if (customerId) {
        matchStage.customerId = new mongoose_1.Types.ObjectId(customerId);
    }
    if (issueDateFrom || issueDateTo) {
        matchStage.issueDate = {};
        if (issueDateFrom) {
            matchStage.issueDate.$gte = new Date(issueDateFrom);
        }
        if (issueDateTo) {
            matchStage.issueDate.$lte = new Date(issueDateTo);
        }
    }
    if (dueDateFrom || dueDateTo) {
        matchStage.dueDate = {};
        if (dueDateFrom) {
            matchStage.dueDate.$gte = new Date(dueDateFrom);
        }
        if (dueDateTo) {
            matchStage.dueDate.$lte = new Date(dueDateTo);
        }
    }
    const pipeline = [
        {
            $match: matchStage,
        },
        {
            $lookup: {
                from: "customers",
                localField: "customerId",
                foreignField: "_id",
                as: "customer",
            },
        },
        {
            $unwind: "$customer",
        },
    ];
    if (search?.trim()) {
        pipeline.push({
            $match: {
                $or: [
                    {
                        invoiceId: {
                            $regex: search,
                            $options: "i",
                        },
                    },
                    {
                        "customer.name": {
                            $regex: search,
                            $options: "i",
                        },
                    },
                    {
                        "customer.company": {
                            $regex: search,
                            $options: "i",
                        },
                    },
                ],
            },
        });
    }
    const sortDirection = sortOrder === "asc" ? 1 : -1;
    if (sortBy === "invoiceId") {
        pipeline.push({
            $sort: {
                invoiceId: sortDirection,
            },
        });
    }
    else if (sortBy === "customer") {
        pipeline.push({
            $sort: {
                "customer.name": sortDirection,
            },
        });
    }
    else if (sortBy === "amount") {
        pipeline.push({
            $sort: {
                amount: sortDirection,
            },
        });
    }
    else if (sortBy === "total") {
        pipeline.push({
            $sort: {
                total: sortDirection,
            },
        });
    }
    else if (sortBy === "dueDate") {
        pipeline.push({
            $sort: {
                dueDate: sortDirection,
            },
        });
    }
    else {
        pipeline.push({
            $sort: {
                createdAt: -1,
            },
        });
    }
    pipeline.push({
        $facet: {
            data: [
                {
                    $skip: (page - 1) * limit,
                },
                {
                    $limit: limit,
                },
                {
                    $project: {
                        invoiceId: 1,
                        amount: 1,
                        taxRate: 1,
                        tax: 1,
                        total: 1,
                        status: 1,
                        issueDate: 1,
                        dueDate: 1,
                        customer: {
                            _id: "$customer._id",
                            name: "$customer.name",
                            company: "$customer.company",
                        },
                    },
                },
            ],
            metadata: [
                {
                    $count: "total",
                },
            ],
        },
    });
    const result = await invoice_model_1.Invoice.aggregate(pipeline);
    const invoices = result[0]?.data || [];
    const total = result[0]?.metadata?.[0]?.total || 0;
    return {
        invoices,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getInvoicesService = getInvoicesService;
const createInvoiceService = async (payload) => {
    const customer = await customer_model_1.Customer.findById(payload.customerId);
    if (!customer) {
        throw new ApiError_1.ApiError(404, "Customer not found");
    }
    const tax = Number((payload.amount * (payload.taxRate / 100)).toFixed(2));
    const total = Number((payload.amount + tax).toFixed(2));
    const invoiceId = `INV-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const invoice = await invoice_model_1.Invoice.create({
        invoiceId,
        customerId: payload.customerId,
        amount: payload.amount,
        taxRate: payload.taxRate,
        tax,
        total,
        status: payload.status,
        issueDate: new Date(payload.issueDate),
        dueDate: new Date(payload.dueDate),
    });
    return invoice;
};
exports.createInvoiceService = createInvoiceService;
const updateInvoiceService = async (invoiceId, payload) => {
    const invoice = await invoice_model_1.Invoice.findOne({ invoiceId, });
    if (!invoice) {
        throw new ApiError_1.ApiError(404, "Invoice not found");
    }
    const customer = await customer_model_1.Customer.findById(payload.customerId);
    if (!customer) {
        throw new ApiError_1.ApiError(404, "Customer not found");
    }
    const tax = Number((payload.amount * (payload.taxRate / 100)).toFixed(2));
    const total = Number((payload.amount + tax).toFixed(2));
    invoice.customerId = payload.customerId;
    invoice.amount = payload.amount;
    invoice.taxRate = payload.taxRate;
    invoice.tax = tax;
    invoice.total = total;
    invoice.status = payload.status;
    invoice.issueDate = new Date(payload.issueDate);
    invoice.dueDate = new Date(payload.dueDate);
    await invoice.save();
    return invoice;
};
exports.updateInvoiceService = updateInvoiceService;
const getInvoiceByIdService = async (invoiceId) => {
    const invoice = await invoice_model_1.Invoice.findOne({
        invoiceId,
    }).populate({
        path: "customerId",
        select: "name company",
    });
    if (!invoice) {
        throw new ApiError_1.ApiError(404, "Invoice not found");
    }
    return invoice;
};
exports.getInvoiceByIdService = getInvoiceByIdService;
