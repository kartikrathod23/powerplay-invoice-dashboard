"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerProfileController = exports.getCustomersController = void 0;
const customer_service_1 = require("./customer.service");
const getCustomersController = async (req, res) => {
    try {
        const customers = await (0, customer_service_1.getCustomersService)();
        res.status(200).json({
            success: true,
            message: "Customers fetched successfully",
            data: customers,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error?.message || "Failed to fetch customers",
        });
    }
};
exports.getCustomersController = getCustomersController;
const getCustomerProfileController = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const result = await (0, customer_service_1.getCustomerProfileService)(customerId);
        res.status(200).json({
            success: true,
            message: "Customer profile fetched successfully",
            data: result,
        });
    }
    catch (error) {
        if (error.message === "Customer not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getCustomerProfileController = getCustomerProfileController;
