import { Schema,model,Document } from "mongoose";

export interface ICustomer extends Document{
  name: string;
  company: string;
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema<ICustomer>({
    name:{
      type: String,
      required: true,
      trim: true,
    },

    company:{
      type: String,
      required: true,
      trim: true,
    },
  },
  {timestamps: true,}
);

customerSchema.index({ name: 1 });

export const Customer= model<ICustomer>("Customer",customerSchema);
