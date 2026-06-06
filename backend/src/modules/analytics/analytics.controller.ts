import {Request,Response,} from "express";
import {getSummaryAnalyticsService,} from "./analytics.service";

export const getSummaryAnalyticsController = async (req: Request,res: Response)=>{
    try{
      const analytics =await getSummaryAnalyticsService();

      res.status(200).json({
        success: true,
        message:"Analytics fetched successfully",
        data: analytics,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error?.message || "Failed to fetch analytics",
      });
    }
};