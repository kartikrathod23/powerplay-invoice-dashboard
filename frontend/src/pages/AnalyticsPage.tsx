import {useNavigate,} from "react-router-dom";
import {useQuery,} from "@tanstack/react-query";
import {ArrowLeft,Building2,ArrowUpRight,} from "lucide-react";

import {getAnalytics,} from "../api/analyticsApi";
import SummaryCards from "../components/dashboard/SummaryCards";
import Card from "../components/ui/Card";

export default function AnalyticsPage(){
  const navigate = useNavigate();

  const {data,isLoading,error,} = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
  });

  if(isLoading){
    return (
      <div className="flex h-screen items-center justify-center">
        Loading analytics...
      </div>
    );
  }

  if(error){
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Failed to load analytics
      </div>
    );
  }

  const analytics = data?.data;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-3xl bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 px-8 py-6 text-white shadow-xl">
            <button
                onClick={() => navigate("/")}
                className="mb-5 flex items-center gap-2 text-sm font-medium text-white/90 transition-all hover:text-white"
            >
                <ArrowLeft size={18}/>
                Back
            </button>

            <div>
                <h1 className="text-4xl font-bold">
                Analytics Dashboard
                </h1>

                <p className="mt-2 text-white/80">
                Revenue insights and top customers
                </p>
            </div>

            </div>

            <div className="mt-6">
                <SummaryCards
                totalBilled={analytics?.totalBilled || 0}
                totalTax={analytics?.totalTax || 0}
                invoiceCount={analytics?.invoiceCount || 0}
                customerCount={analytics?.customerCount || 0}
                />
            </div>

            <div className="mt-6">
            <Card>

                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                    Top Customers
                    </h2>

                    <p className="text-sm text-slate-500">
                    Ranked by invoice value
                    </p>
                </div>

                <div className="rounded-xl bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700">
                    {analytics?.topCustomers?.length || 0} Customers
                </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">

                        <thead>
                        <tr className="bg-slate-50">

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Customer
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Company
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Invoices
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Total Value
                            </th>

                            <th className="px-6 py-4"></th>

                        </tr>
                        </thead>

                        <tbody>

                        {analytics?.topCustomers?.map((customer: any) => {

                            const initials = customer.customerName
                            .split(" ")
                            .map((word: string) => word[0])
                            .join("")
                            .slice(0,2);

                            return (
                            <tr
                                key={customer.customerId}
                                className="border-t border-slate-100 transition-all hover:bg-violet-50/50"
                            >
                                <td className="px-6 py-5">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-sm font-semibold text-white shadow-sm">
                                    {initials}
                                    </div>

                                    <div>
                                    <p className="font-medium text-slate-900">
                                        {customer.customerName}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Customer
                                    </p>
                                    </div>

                                </div>

                                </td>

                                <td className="px-6 py-5">

                                <div className="flex items-center gap-2 text-slate-600">
                                    <Building2 size={14}/>
                                    {customer.company}
                                </div>

                                </td>

                                <td className="px-6 py-5 font-medium text-slate-700">
                                {customer.invoiceCount}
                                </td>

                                <td className="px-6 py-5">

                                <div className="font-semibold text-slate-900">
                                    ₹ {customer.totalValue.toLocaleString()}
                                </div>

                                </td>

                                <td className="px-6 py-5">

                                <button
                                    onClick={() => navigate(`/customers/${customer.customerId}`)}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:bg-slate-100"
                                >
                                    <ArrowUpRight size={18}/>
                                </button>

                                </td>

                            </tr>
                            );
                        })}

                        </tbody>

                    </table>
                </div>

            </Card>
        </div>
      </div>
    </div>
  );
}