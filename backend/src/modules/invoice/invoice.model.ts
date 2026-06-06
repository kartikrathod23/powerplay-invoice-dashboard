import {Schema,model,Document,Types,} from "mongoose";

export enum InvoiceStatus{
  SENT = "Sent",
  UNPAID = "Unpaid",
  OVERDUE = "Overdue",
  PAID = "Paid",
  VOID = "Void",
  DRAFT = "Draft",
}

export interface IInvoice extends Document{
  invoiceId: string;
  customerId: Types.ObjectId;
  amount: number;
  taxRate: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const invoiceSchema = new Schema<IInvoice>({
    invoiceId:{
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    customerId:{
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    amount:{
      type: Number,
      required: true,
      min: 0,
    },
    taxRate:{
      type: Number,
      required: true,
      enum: [0, 3, 5, 18, 28],
    },
    tax:{
      type: Number,
      required: true,
      min: 0,
    },
    total:{
      type: Number,
      required: true,
      min: 0,
    },
    status:{
      type: String,
      enum: Object.values(InvoiceStatus),
      required: true,
      index: true,
    },
    issueDate:{
      type: Date,
      required: true,
      index: true,
    },
    dueDate:{
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

invoiceSchema.index({ invoiceId: 1 });
invoiceSchema.index({ customerId: 1 });
invoiceSchema.index({ status: 1 });
invoiceSchema.index({ issueDate: 1 });
invoiceSchema.index({ dueDate: 1 });
invoiceSchema.index({customerId: 1,status: 1,});
invoiceSchema.index({issueDate: -1,});

export const Invoice = model<IInvoice>("Invoice",invoiceSchema);