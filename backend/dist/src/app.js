"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const notFound_1 = require("./middleware/notFound");
const errorHandler_1 = require("./middleware/errorHandler");
const invoice_routes_1 = __importDefault(require("./modules/invoice/invoice.routes"));
const customer_routes_1 = __importDefault(require("./modules/customer/customer.routes"));
const analytics_routes_1 = __importDefault(require("./modules/analytics/analytics.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/health", (_, res) => {
    res.json({
        success: true,
        message: "Server is healthy",
    });
});
app.use("/api/invoices", invoice_routes_1.default);
app.use("/api/customers", customer_routes_1.default);
app.use("/api/analytics", analytics_routes_1.default);
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
exports.default = app;
