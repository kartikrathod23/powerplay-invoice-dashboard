export interface TopCustomer {
  customerName: string;
  company: string;
  invoiceCount: number;
  customerId: string;
  totalValue: number;
}

export interface AnalyticsData {
  totalBilled: number;
  totalTax: number;
  invoiceCount: number;
  customerCount: number;
  topCustomers: TopCustomer[];
}

export interface AnalyticsResponse {
  success: boolean;
  message: string;
  data: AnalyticsData;
}