import { Customer } from "../customer/customer.model";
import { Invoice } from "../invoice/invoice.model";

export const getSummaryAnalyticsService = async ()=>{
    const [invoiceMetrics,customerCount,topCustomers,]=await Promise.all([
      Invoice.aggregate([
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

      Customer.countDocuments(),
      Invoice.aggregate([
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

            customerName:{
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

    const metrics =invoiceMetrics[0] || {totalBilled: 0,totalTax: 0,invoiceCount: 0,};

    return {
      totalBilled: Number(metrics.totalBilled.toFixed(2)),
      totalTax: Number(metrics.totalTax.toFixed(2)),
      invoiceCount:metrics.invoiceCount,
      customerCount,
      topCustomers,
    };
};