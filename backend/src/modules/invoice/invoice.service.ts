import { PipelineStage, Types } from "mongoose";
import { Invoice } from "./invoice.model";
import { Customer } from "../customer/customer.model";
import { ApiError } from "../../utils/ApiError";

interface GetInvoicesQuery{
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  customerId?: string;
  issueDateFrom?: string;
  issueDateTo?: string;
  dueDateFrom?: string;
  dueDateTo?: string;

  sortBy?: "amount" | "dueDate";
  sortOrder?: "asc" | "desc";
}

enum InvoiceStatus {
  SENT = "Sent",
  UNPAID = "Unpaid",
  OVERDUE = "Overdue",
  PAID = "Paid",
  VOID = "Void",
  DRAFT = "Draft",
}

export const getInvoicesService = async (query: GetInvoicesQuery) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const{
    search,
    status,
    customerId,
    issueDateFrom,
    issueDateTo,
    dueDateFrom,
    dueDateTo,
    sortBy,
    sortOrder,
  } = query;

  const matchStage:Record<string, any>={};

  if(status){
    matchStage.status = status;
  }
  if(customerId){
    matchStage.customerId = new Types.ObjectId(customerId);
  }

  if(issueDateFrom || issueDateTo){
    matchStage.issueDate = {};

    if(issueDateFrom){
      matchStage.issueDate.$gte = new Date( issueDateFrom);
    }
    if(issueDateTo){
      matchStage.issueDate.$lte = new Date(issueDateTo);
    }
  }

  if(dueDateFrom || dueDateTo){
    matchStage.dueDate = {};

    if(dueDateFrom){
      matchStage.dueDate.$gte = new Date( dueDateFrom);
    }
    if(dueDateTo){
      matchStage.dueDate.$lte = new Date(dueDateTo);
    }
  }

  const pipeline: PipelineStage[]=[
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

  if(search?.trim()){
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

  const sortStage: Record<string, 1 | -1> = {};

  if(sortBy === "amount"){
    sortStage.amount = sortOrder === "asc" ? 1 : -1;
  }else if(sortBy === "dueDate"){
    sortStage.dueDate =sortOrder === "asc" ? 1 : -1;
  }else{
    sortStage.createdAt = -1;
  }

  pipeline.push({
    $sort: sortStage,
  });

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

  const result =await Invoice.aggregate(pipeline);
  const invoices = result[0]?.data || [];
  const total =result[0]?.metadata?.[0]?.total || 0;

  return {
    invoices,
    pagination:{
      page,
      limit,
      total,
      totalPages: Math.ceil(total/limit),
    },
  };
};


export const createInvoiceService = async(payload: {customerId: string;amount: number;taxRate: number;status: InvoiceStatus;issueDate: string;dueDate: string;}) => {
  const customer =await Customer.findById(payload.customerId);
  if(!customer){
    throw new ApiError(404,"Customer not found");
  }

  const tax = Number((payload.amount *(payload.taxRate / 100)).toFixed(2));
  const total = Number((payload.amount + tax).toFixed(2));
  const invoiceId = `INV-${Math.floor(1000000 +Math.random() * 9000000)}`;

  const invoice = await Invoice.create({
    invoiceId,
    customerId: payload.customerId,
    amount: payload.amount,
    taxRate: payload.taxRate,
    tax,
    total,
    status: payload.status,
    issueDate: new Date( payload.issueDate),
    dueDate: new Date(payload.dueDate),
  });

  return invoice;
};


export const updateInvoiceService = async (invoiceId: string,payload: {customerId: string;amount: number;taxRate: number;status: InvoiceStatus;issueDate: string;dueDate: string;}) => {
  const invoice =await Invoice.findOne({invoiceId,});
  if(!invoice){
    throw new ApiError( 404,"Invoice not found" );
  }

  const customer =await Customer.findById(payload.customerId);

  if(!customer){
    throw new ApiError( 404,"Customer not found");
  }

  const tax = Number((payload.amount *(payload.taxRate / 100)).toFixed(2));
  const total = Number((payload.amount + tax).toFixed(2));

  invoice.customerId =payload.customerId as any;
  invoice.amount =payload.amount;
  invoice.taxRate =payload.taxRate;
  invoice.tax = tax;
  invoice.total = total;
  invoice.status =payload.status;
  invoice.issueDate =new Date(payload.issueDate);
  invoice.dueDate =new Date(payload.dueDate);

  await invoice.save();
  return invoice;
};