"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummaryAnalyticsController = void 0;
const analytics_service_1 = require("./analytics.service");
const getSummaryAnalyticsController = async (req, res) => {
    try {
        const analytics = await (0, analytics_service_1.getSummaryAnalyticsService)();
        res.status(200).json({
            success: true,
            message: "Analytics fetched successfully",
            data: analytics,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error?.message || "Failed to fetch analytics",
        });
    }
};
exports.getSummaryAnalyticsController = getSummaryAnalyticsController;
