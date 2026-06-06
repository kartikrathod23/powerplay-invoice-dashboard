import {useParams,useNavigate,} from "react-router-dom";
import {useQuery,} from "@tanstack/react-query";
import {ArrowLeft,Building2,Mail,ReceiptText,IndianRupee,} from "lucide-react";
import {getCustomerProfile,} from "../api/customerApi";
import InvoiceTable from "../components/dashboard/InvoiceTable";

import {useState,} from "react";
import InvoiceModal from "../components/invoice/InvoiceModal";
import InvoiceDetails from "../components/invoice/InvoiceDetails";
import InvoiceForm from "../components/invoice/InvoiceForm";
import {getInvoiceById,} from "../api/invoiceApi";

export default function CustomerProfilePage(){
  const navigate = useNavigate();
  const {customerId,} = useParams();
  const [viewOpen,setViewOpen] = useState(false);
  const [editOpen,setEditOpen] = useState(false);
  const [selectedInvoiceId,setSelectedInvoiceId] = useState("");

  const {data,isLoading,error,} = useQuery({
    queryKey: ["customer",customerId],
    queryFn: () => getCustomerProfile(customerId!),
    enabled: !!customerId,
  });

  const {data: invoiceData,} = useQuery({
    queryKey: ["invoice",selectedInvoiceId],
    queryFn: () => getInvoiceById(selectedInvoiceId),
    enabled: !!selectedInvoiceId,
  });


  if(isLoading){
    return (
      <div className="flex h-screen items-center justify-center">
        Loading customer...
      </div>
    );
  }

  if(error){
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Failed to load customer
      </div>
    );
  }

  const customer = data?.data?.customer;
  const summary = data?.data?.summary;
  const invoices = data?.data?.invoiceHistory || [];

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

            <div className="flex items-center gap-5">
                
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">
              {customer?.name?.split(" ").map((word: string) => word[0]).join("").slice(0,2)}
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {customer?.name}
              </h1>

              <p className="mt-2 flex items-center gap-2 text-white/80">
                <Building2 size={16}/>
                {customer?.company}
              </p>
            </div>

          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <ReceiptText className="text-violet-600"/>
              <span className="text-slate-500">
                Total Invoices
              </span>
            </div>

            <h2 className="mt-3 text-3xl font-bold">
              {summary?.invoiceCount || 0}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <IndianRupee className="text-violet-600"/>
              <span className="text-slate-500">
                Total Revenue
              </span>
            </div>

            <h2 className="mt-3 text-3xl font-bold">
               ₹ {(summary?.totalBilled || 0).toLocaleString()}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Mail className="text-violet-600"/>
              <span className="text-slate-500">
                Company
              </span>
            </div>

            <h2 className="mt-3 text-xl font-semibold">
              {customer?.company}
            </h2>
          </div>

        </div>

        <div className="mt-6">
            <InvoiceTable
                invoices={invoices}
                hideCustomer
                onViewInvoice={(invoiceId) => {
                    setSelectedInvoiceId(invoiceId);
                    setViewOpen(true);
                }}
            />
        </div>
      </div>

      <InvoiceModal
        open={viewOpen}
        title="Invoice Details"
        onClose={() => setViewOpen(false)}
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
            onClose={() => setEditOpen(false)}
            >
            {invoiceData?.data && (
                <InvoiceForm
                mode="edit"
                invoice={invoiceData.data}
                onSuccess={() => setEditOpen(false)}
                />
            )}
        </InvoiceModal>
      
    </div>
  );
}