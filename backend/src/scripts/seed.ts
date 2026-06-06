import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import { connectDB, disconnectDB } from "../config/db";
import { Customer } from "../modules/customer/customer.model";
import { Invoice } from "../modules/invoice/invoice.model";

type SeedInvoice ={
  invoiceId: string;
  customer: string;
  company: string;
  amount: number;
  taxRate: number;
  tax: number;
  total: number;
  status: string;
  issueDate: string;
  dueDate: string;
};

const seedDatabase = async ()=>{
  try{
    await connectDB();
    console.log("Clearing existing data...");

    await Invoice.deleteMany({});
    await Customer.deleteMany({});

    const filePath = path.join(process.cwd(),"data","seed-data.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const invoices: SeedInvoice[] = JSON.parse(rawData);

    console.log(`Loaded ${invoices.length} invoices`);

    // unique customers creation
    const customerMap = new Map<string,{name: string; company: string; }>();

    for(const invoice of invoices){
      customerMap.set(invoice.customer,{
        name: invoice.customer,
        company: invoice.company,
      });
    }

    const customersToInsert = Array.from(customerMap.values())
    const customers = await Customer.insertMany(customersToInsert);

    console.log(`Inserted ${customers.length} customers`);

    // lookup map
    const customerIdMap = new Map<string,string>();

    customers.forEach((customer)=>{
      customerIdMap.set(
        customer.name,
        customer._id.toString()
      );
    });

    // invoice transform
    const invoicesToInsert = invoices.map((invoice)=>({
        invoiceId: invoice.invoiceId,
        customerId: customerIdMap.get(invoice.customer),
        amount: invoice.amount,
        taxRate: invoice.taxRate,
        tax: invoice.tax,
        total: invoice.total,
        status: invoice.status,
        issueDate: new Date(invoice.issueDate),
        dueDate: new Date( invoice.dueDate),
      })
    );

    await Invoice.insertMany(invoicesToInsert);
    console.log(`Inserted ${invoicesToInsert.length} invoices`);
    console.log("Seed completed successfully");

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error(error);
    await disconnectDB();
    process.exit(1);
  }
};

seedDatabase();