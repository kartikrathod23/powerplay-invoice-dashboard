"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummaryAnalyticsService = void 0;
const customer_model_1 = require("../customer/customer.model");
const invoice_model_1 = require("../invoice/invoice.model");
const getSummaryAnalyticsService = async () => {
    const [invoiceMetrics, customerCount, topCustomers,] = await Promise.all([
        invoice_model_1.Invoice.aggregate([
            {
                $group: {
                    _id: null,
                    totalBilled: {
                        $sum: "$total",
                    },
                    totalTax: {
                        $sum: "$tax",
                    },
                    invoiceCount: {
                        $sum: 1,
                    },
                },
            },
        ]),
        customer_model_1.Customer.countDocuments(),
        invoice_model_1.Invoice.aggregate([
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
            {
                $group: {
                    _id: "$customerId",
                    customerName: {
                        $first: "$customer.name",
                    },
                    company: {
                        $first: "$customer.company",
                    },
                    totalValue: {
                        $sum: "$total",
                    },
                    invoiceCount: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    totalValue: -1,
                },
            },
            {
                $limit: 5,
            },
            {
                $project: {
                    _id: 0,
                    customerId: "$_id",
                    customerName: 1,
                    company: 1,
                    totalValue: {
                        $round: [
                            "$totalValue",
                            2,
                        ],
                    },
                    invoiceCount: 1,
                },
            },
        ]),
    ]);
    const metrics = invoiceMetrics[0] || { totalBilled: 0, totalTax: 0, invoiceCount: 0, };
    return {
        totalBilled: Number(metrics.totalBilled.toFixed(2)),
        totalTax: Number(metrics.totalTax.toFixed(2)),
        invoiceCount: metrics.invoiceCount,
        customerCount,
        topCustomers,
    };
};
exports.getSummaryAnalyticsService = getSummaryAnalyticsService;
