import {useNavigate,} from "react-router-dom";
import {Building2,ArrowUpRight,} from "lucide-react";
import Card from "../ui/Card";

interface Customer{
  customerId: string;
  customerName: string;
  company: string;
  invoiceCount: number;
  totalValue: number;
}

interface Props{
  customers: Customer[];
}

export default function TopCustomersTable({customers,}: Props){
  const navigate = useNavigate();

  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Top Customers
          </h2>

          <p className="text-sm text-slate-500">
            Ranked by total invoice value
          </p>
        </div>

        <div className="rounded-xl bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700">
          {customers.length} Customers
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
            {customers.map((customer) => (
              <tr
                key={customer.customerId}
                className="border-t border-slate-100 transition-all hover:bg-violet-50/50"
              >
                <td className="px-6 py-5 font-medium text-slate-900">
                  {customer.customerName}
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Building2 size={14}/>
                    {customer.company}
                  </div>
                </td>

                <td className="px-6 py-5">
                  {customer.invoiceCount}
                </td>

                <td className="px-6 py-5 font-semibold">
                  ₹ {customer.totalValue.toLocaleString()}
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
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}