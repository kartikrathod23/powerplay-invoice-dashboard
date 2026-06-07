"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = require("../config/db");
const customer_model_1 = require("../modules/customer/customer.model");
const invoice_model_1 = require("../modules/invoice/invoice.model");
const seedDatabase = async () => {
    try {
        await (0, db_1.connectDB)();
        console.log("Clearing existing data...");
        await invoice_model_1.Invoice.deleteMany({});
        await customer_model_1.Customer.deleteMany({});
        const filePath = path_1.default.join(process.cwd(), "data", "seed-data.json");
        const rawData = fs_1.default.readFileSync(filePath, "utf-8");
        const invoices = JSON.parse(rawData);
        console.log(`Loaded ${invoices.length} invoices`);
        // unique customers creation
        const customerMap = new Map();
        for (const invoice of invoices) {
            customerMap.set(invoice.customer, {
                name: invoice.customer,
                company: invoice.company,
            });
        }
        const customersToInsert = Array.from(customerMap.values());
        const customers = await customer_model_1.Customer.insertMany(customersToInsert);
        console.log(`Inserted ${customers.length} customers`);
        // lookup map
        const customerIdMap = new Map();
        customers.forEach((customer) => {
            customerIdMap.set(customer.name, customer._id.toString());
        });
        // invoice transform
        const invoicesToInsert = invoices.map((invoice) => ({
            invoiceId: invoice.invoiceId,
            customerId: customerIdMap.get(invoice.customer),
            amount: invoice.amount,
            taxRate: invoice.taxRate,
            tax: invoice.tax,
            total: invoice.total,
            status: invoice.status,
            issueDate: new Date(invoice.issueDate),
            dueDate: new Date(invoice.dueDate),
        }));
        await invoice_model_1.Invoice.insertMany(invoicesToInsert);
        console.log(`Inserted ${invoicesToInsert.length} invoices`);
        console.log("Seed completed successfully");
        await (0, db_1.disconnectDB)();
        process.exit(0);
    }
    catch (error) {
        console.error(error);
        await (0, db_1.disconnectDB)();
        process.exit(1);
    }
};
seedDatabase();
