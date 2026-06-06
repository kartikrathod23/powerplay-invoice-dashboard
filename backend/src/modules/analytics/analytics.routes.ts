import { Router } from "express";
import {getSummaryAnalyticsController,} from "./analytics.controller";

const router = Router();
router.get("/summary",getSummaryAnalyticsController);

export default router;