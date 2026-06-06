import {Search,Filter,CalendarDays,} from "lucide-react";
import Card from "../ui/Card";

interface Props{
  search: string;
  status: string;
  taxRate: string;
  issueDateFrom?: string;
  issueDateTo?: string

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTaxRateChange: (value: string) => void;
  onIssueDateFromChange?: (value: string) => void;
  onIssueDateToChange?: (value: string) => void;
}

export default function InvoiceFilters({
  search,
  status,
  taxRate,
  issueDateFrom,
  issueDateTo,
  onSearchChange,
  onStatusChange,
  onTaxRateChange,
  onIssueDateFromChange,
  onIssueDateToChange,
}: Props) {
  return (
    <Card>
      <div className="p-5">
        <div className="mb-4 flex items-start gap-3">
          <Filter
            size={20}
            className="mt-1 text-violet-600"
          />

          <div>
            <h2 className="font-semibold text-slate-900">
              Filters
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 items-end ">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Search
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Invoice / Customer"
                className="h-[54px] w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>onStatusChange( e.target.value)}
              className="h-[54px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            >
              <option value="">
                All Status
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Unpaid">
                Unpaid
              </option>

              <option value="Overdue">
                Overdue
              </option>

              <option value="Draft">
                Draft
              </option>

              <option value="Sent">
                Sent
              </option>

              <option value="Void">
                Void
              </option>
            </select>
          </div>

          <div>
            <label className=" mb-2 block text-sm font-medium text-slate-600">
              Tax Rate
            </label>

            <select
              value={taxRate}
              onChange={(e) =>onTaxRateChange(e.target.value)}
              className=" h-[54px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            >
              <option value="">
                All Tax Rates
              </option>

              <option value="0">
                0%
              </option>

              <option value="3">
                3%
              </option>

              <option value="5">
                5%
              </option>

              <option value="18">
                18%
              </option>

              <option value="28">
                28%
              </option>
            </select>
          </div>

          <div>
            <label className=" mb-2 block text-sm font-medium text-slate-600 ">
              Issue Date From
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none "
              />

              <input
                type="date"
                value={issueDateFrom || ""}
                onChange={(e) =>onIssueDateFromChange?.(e.target.value)}
                className="h-[54px] w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Issue Date To
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-3 top-1/2  -translate-y-1/2 text-slate-400 pointer-events-none "
              />

              <input
                type="date"
                value={issueDateTo || ""}
                onChange={(e) =>onIssueDateToChange?.(e.target.value)}
                className="h-[54px] w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}