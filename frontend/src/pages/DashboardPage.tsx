import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "../api/invoiceApi";
import { getAnalytics } from "../api/analyticsApi";
import DashboardHero from "../components/dashboard/DashboardHero";
import SummaryCards from "../components/dashboard/SummaryCards";
import InvoiceFilters from "../components/dashboard/InvoiceFilters";
import InvoiceTable from "../components/dashboard/InvoiceTable";
import InvoicePagination from "../components/dashboard/InvoicePagination";

import InvoiceModal from "../components/invoice/InvoiceModal";
import InvoiceForm from "../components/invoice/InvoiceForm";
import InvoiceDetails from "../components/invoice/InvoiceDetails";
import {getInvoiceById,} from "../api/invoiceApi";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] =useState("");
  const [status, setStatus] =useState("");
  const [taxRate, setTaxRate] =useState("");
  const [issueDateFrom,setIssueDateFrom] = useState("");
  const [issueDateTo,setIssueDateTo,] = useState("");
  const [debouncedSearch] =useDebounce(search, 500);

  const [sortBy, setSortBy] = useState<"amount" | "dueDate" | undefined>();
  const [sortOrder, setSortOrder] =useState<"asc" | "desc">("asc");

  const [createOpen,setCreateOpen] = useState(false);
  const [viewOpen,setViewOpen] =useState(false);
  const [editOpen,setEditOpen] =useState(false);
  const [selectedInvoiceId,setSelectedInvoiceId] = useState("");

  const {data: analyticsData} = useQuery({queryKey: ["analytics"],queryFn: getAnalytics,});

  const {data: invoiceData} = useQuery({queryKey: ["invoice",selectedInvoiceId],
    queryFn: () =>
      getInvoiceById(selectedInvoiceId),
      enabled:!!selectedInvoiceId,
  });

  const {data,isFetching, error} = useQuery({
    queryKey: [
      "invoices",
      page,
      debouncedSearch,
      status,
      taxRate,
      issueDateFrom,
      issueDateTo,
      sortBy,
      sortOrder,
    ],

    queryFn: () => getInvoices({
        page,
        limit: 10,
        search:debouncedSearch || undefined,
        status:status || undefined,
        taxRate:taxRate || undefined,
        issueDateFrom:issueDateFrom || undefined,
        issueDateTo:issueDateTo || undefined,
        sortBy,
        sortOrder,
      }),

    placeholderData: (
      previousData
    ) => previousData,
  });

  if(error){
    return(
      <div className="flex h-screen items-center justify-center text-red-500 ">
        Failed to load dashboard
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="space-y-5">
          <DashboardHero
            onAnalytics={() =>navigate("/analytics") }
            onNewInvoice={() => {
              setCreateOpen(true)
            }}
          />

          <SummaryCards
            totalBilled={analyticsData?.data?.totalBilled || 0}
            totalTax={analyticsData?.data?.totalTax || 0}
            invoiceCount={analyticsData?.data?.invoiceCount || 0}
            customerCount={analyticsData?.data ?.customerCount || 0}
          />

          <InvoiceFilters
            search={search}
            status={status}
            taxRate={taxRate}
            issueDateFrom={issueDateFrom}
            issueDateTo={issueDateTo }

            onSearchChange={( value) =>{
              setPage(1);
              setSearch(value);
            }}

            onStatusChange={(value) =>{
              setPage(1);
              setStatus(value);
            }}

            onTaxRateChange={(value) =>{
              setPage(1);
              setTaxRate(value);
            }}

            onIssueDateFromChange={(value) =>{
              setPage(1);
              setIssueDateFrom(value);
            }}

            onIssueDateToChange={(value) =>{
              setPage(1);
              setIssueDateTo(value);
            }}
          />

{/* table */}
          <div className="relative">
            {isFetching && (
              <div className=" absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-white/50 backdrop-blur-[2px] ">
                <div className=" h-8 w-8 animate-spin rounded-full border-4 border-violet-300 border-t-violet-700" />
              </div>
            )}

            <InvoiceTable
                invoices={data?.data || []}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={(field) => {
                    if(sortBy === field){
                        setSortOrder( sortOrder === "asc"? "desc": "asc");
                    }
                    else{
                        setSortBy(field);
                        setSortOrder("asc");
                    }
                }}
                onViewInvoice={(invoiceId)=>{
                  setSelectedInvoiceId(invoiceId);
                  setViewOpen(true);
                }}
            />
          </div>

{/* pagination */}
          <InvoicePagination
            page={page}
            totalPages={data?.pagination?.totalPages || 1}
            onPageChange={setPage}
          />
        </div>
      </div>


      <InvoiceModal
        open={createOpen}
        title="Create Invoice"
        onClose={() =>setCreateOpen(false)}
      >
        <InvoiceForm
          mode="create"
          onSuccess={() =>setCreateOpen(false)}
        />
      </InvoiceModal>


      <InvoiceModal
        open={viewOpen}
        title="Invoice Details"
        onClose={() =>setViewOpen(false)}
      >
        {invoiceData?.data && (
          <>
            <InvoiceDetails
              invoice={invoiceData.data}
            />

            <button
              onClick={() => {
                setViewOpen(false);
                setEditOpen(true);
              }}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 font-medium text-white"
            >
              Edit Invoice
            </button>
          </>
        )}
      </InvoiceModal>


      <InvoiceModal
        open={editOpen}
        title="Edit Invoice"
        onClose={() =>setEditOpen(false)}
      >
        {invoiceData?.data && (
          <InvoiceForm
            mode="edit"
            invoice={invoiceData.data}
            onSuccess={() =>setEditOpen(false)}
          />
        )}
      </InvoiceModal>
    </div>
  );
}