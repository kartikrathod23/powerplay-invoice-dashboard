import { Link } from "react-router-dom";
import {CalendarDays,Building2,ArrowUpRight,ArrowUpDown,ArrowDown,ArrowUp,} from "lucide-react";
import Card from "../ui/Card";
import StatusBadge from "../ui/StatusBadge";

interface Props{
  invoices: any[];
  sortBy?: "amount" | "dueDate";
  sortOrder?: "asc" | "desc";
  onSort?: (field: "amount" | "dueDate") => void;
  onViewInvoice?: (invoiceId: string) => void;
  hideCustomer?: boolean;
}


export default function InvoiceTable({invoices,sortBy,sortOrder="desc",onSort,onViewInvoice,hideCustomer = false,}: Props) {
  const renderSortIcon = (field: "amount" | "dueDate")=>{
    if(sortBy !== field){
      return (
        <ArrowUpDown size={14}/>
      );
    }

    return sortOrder === "asc" ? (<ArrowUp size={14} />):(
      <ArrowDown size={14} />
    );
  };

  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Invoices
          </h2>

          <p className="text-sm text-slate-500">
            View and manage all invoices
          </p>
        </div>

        <div className="rounded-xl bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700">
          {invoices.length} Records
        </div>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Invoice
              </th>

              {!hideCustomer && (
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Customer
                </th>
              )}

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                {hideCustomer ? (
                  "Amount"
                ) : (
                  <button
                    onClick={() => onSort?.("amount")}
                    className="flex items-center gap-2 transition-all hover:text-violet-600"
                  >
                    Amount {renderSortIcon("amount")}
                  </button>
                )}
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                {hideCustomer ? (
                  "Due Date"
                ) : (
                  <button
                    onClick={() => onSort?.("dueDate")}
                    className="flex items-center gap-2 transition-all hover:text-violet-600"
                  >
                    Due Date {renderSortIcon("dueDate")}
                  </button>
                )}
              </th>

            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice)=>{
                const initials = invoice.customer?.name?.split(" ")?.map(( word: string) =>word[0])?.join("")?.slice(0, 2);
                return (
                  <tr
                    key={invoice.invoiceId}
                    className="border-t border-slate-100 transition-all hover:bg-violet-50/50"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {invoice.invoiceId}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Invoice ID
                        </p>
                      </div>
                    </td>

                  {!hideCustomer && (
                    <td className="px-6 py-5">
                      <Link
                        to={`/customers/${invoice.customer._id}`}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-sm font-semibold text-white shadow-sm"
                        >
                          {initials}
                        </div>

                        <div>
                          <p className="font-medium text-slate-900">
                            {invoice.customer.name}
                          </p>

                          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <Building2 size={12} />
                            {invoice.customer.company}
                          </div>
                        </div>
                      </Link>
                    </td>
                  )}

                    <td className="px-6 py-5">
                      <div className="font-medium text-slate-700">
                        ₹ {invoice.amount.toLocaleString()}
                      </div>

                      {!hideCustomer && (
                        <div className="mt-1 text-xs text-slate-500">
                          Tax {invoice.taxRate}%
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <div className="font-semibold text-slate-900">
                        ₹ {invoice.total.toLocaleString()}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge
                        status={ invoice.status}
                      />
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <CalendarDays
                          size={16}
                        />

                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <button
                        onClick={() => onViewInvoice?.(invoice.invoiceId)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:bg-slate-100"
                      >
                        <ArrowUpRight size={18}/>
                      </button>
                    </td>

                  </tr>
                );
              }
            )}
          </tbody>

        </table>
      </div>

      {/* Mobile Cards */}

      <div className="space-y-4 p-4 lg:hidden">
        {invoices.map(
          (invoice) => (
            <div
              key={
                invoice.invoiceId
              }
            >
              {/*  */}
            </div>
          )
        )}
      </div>
    </Card>
  );
}