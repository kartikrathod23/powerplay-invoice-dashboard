import { Types } from "mongoose";
import { Customer } from "./customer.model";
import { InvoiceStatus } from "../invoice/invoice.model";
import { Invoice } from "../invoice/invoice.model";

export const getCustomersService = async () => {
  const customers = await Customer.find({},{name: 1,  company: 1,}).sort({ name: 1 });
  return customers;
};

export const getCustomerProfileService = async (customerId: string) => {
  const customer = await Customer.findById(customerId);

  if(!customer){
    throw new Error("Customer not found");
  }

  const customerObjectId =new Types.ObjectId(customerId);
  const [summaryResult, invoiceHistory] =await Promise.all([Invoice.aggregate([
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
                        InvoiceStatus.UNPAID,
                        InvoiceStatus.OVERDUE,
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

      Invoice.find({customerId: customerObjectId, }).sort({issueDate: -1,}).select("invoiceId amount tax total status issueDate dueDate"),
    ]);

  const summary = summaryResult[0] ? {
      invoiceCount:summaryResult[0].invoiceCount,
      totalBilled:summaryResult[0].totalBilled,
      totalTax:summaryResult[0].totalTax,
      outstanding:summaryResult[0].outstanding,
    } :{
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