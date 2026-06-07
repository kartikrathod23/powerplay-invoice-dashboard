"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerProfileService = exports.getCustomersService = void 0;
const mongoose_1 = require("mongoose");
const customer_model_1 = require("./customer.model");
const invoice_model_1 = require("../invoice/invoice.model");
const invoice_model_2 = require("../invoice/invoice.model");
const getCustomersService = async () => {
    const customers = await customer_model_1.Customer.find({}, { name: 1, company: 1, }).sort({ name: 1 });
    return customers;
};
exports.getCustomersService = getCustomersService;
const getCustomerProfileService = async (customerId) => {
    const customer = await customer_model_1.Customer.findById(customerId);
    if (!customer) {
        throw new Error("Customer not found");
    }
    const customerObjectId = new mongoose_1.Types.ObjectId(customerId);
    const [summaryResult, invoiceHistory] = await Promise.all([invoice_model_2.Invoice.aggregate([
            {
                $match: {
                    customerId: customerObjectId,
                },
            },
            {
                $group: {
                    _id: null,
                    invoiceCount: {
                        $sum: 1,
                    },
                    totalBilled: {
                        $sum: "$total",
                    },
                    totalTax: {
                        $sum: "$tax",
                    },
                    outstanding: {
                        $sum: {
                            $cond: [
                                {
                                    $in: [
                                        "$status",
                                        [
                                            invoice_model_1.InvoiceStatus.UNPAID,
                                            invoice_model_1.InvoiceStatus.OVERDUE,
                                        ],
                                    ],
                                },
                                "$total",
                                0,
                            ],
                        },
                    },
                },
            },
        ]),
        invoice_model_2.Invoice.find({ customerId: customerObjectId, }).sort({ issueDate: -1, }).select("invoiceId amount tax total status issueDate dueDate"),
    ]);
    const summary = summaryResult[0] ? {
        invoiceCount: summaryResult[0].invoiceCount,
        totalBilled: summaryResult[0].totalBilled,
        totalTax: summaryResult[0].totalTax,
        outstanding: summaryResult[0].outstanding,
    } : {
        invoiceCount: 0,
        totalBilled: 0,
        totalTax: 0,
        outstanding: 0,
    };
    return {
        customer,
        summary,
        invoiceHistory,
    };
};
exports.getCustomerProfileService = getCustomerProfileService;
