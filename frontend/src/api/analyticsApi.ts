import { api } from "./client";
import type { AnalyticsResponse } from "../types/analytics.types";

export const getAnalytics = async () => {
  const response =await api.get<AnalyticsResponse>("/analytics/summary");

  return response.data;
};