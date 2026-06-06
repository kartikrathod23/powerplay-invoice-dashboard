import express from "express";
import cors from "cors";
import morgan from "morgan";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

import invoiceRoutes from "./modules/invoice/invoice.routes";
import customerRoutes from "./modules/customer/customer.routes";
import analyticsRoutes from "./modules/analytics/analytics.routes";

const app=express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api/invoices", invoiceRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app