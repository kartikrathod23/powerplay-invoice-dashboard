import {useEffect,useState,} from "react";
import {useMutation,useQuery,useQueryClient,} from "@tanstack/react-query";
import {getCustomers,} from "../../api/customerApi";
import {createInvoice,updateInvoice,} from "../../api/invoiceApi";

interface Props{
  mode: "create" | "edit";
  invoice?: any;
  onSuccess: () => void;
}

export default function InvoiceForm({mode,invoice,onSuccess,}: Props){
  const queryClient = useQueryClient();

  const [customerId,setCustomerId] = useState("");
  const [amount,setAmount] = useState("");
  const [taxRate,setTaxRate] = useState("18");
  const [status,setStatus] = useState("Draft");
  const [issueDate,setIssueDate] = useState("");
  const [dueDate,setDueDate] = useState("");

  const {data: customersData,} = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  useEffect(() => {
    if(mode === "edit" && invoice){
      setCustomerId(invoice.customerId._id);
      setAmount(String(invoice.amount));
      setTaxRate(String(invoice.taxRate));
      setStatus(invoice.status);
      setIssueDate(invoice.issueDate?.split("T")[0]);
      setDueDate(invoice.dueDate?.split("T")[0]);
    }
  }, [mode,invoice]);

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        customerId,
        amount: Number(amount),
        taxRate: Number(taxRate),
        status,
        issueDate,
        dueDate,
      };

      if(mode === "create"){
        return createInvoice(payload);
      }

      return updateInvoice(
        invoice.invoiceId,
        payload
      );
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["invoices"],});
      await queryClient.invalidateQueries({queryKey: ["analytics"],});
      onSuccess();
    },
  });

  const tax =Number(amount || 0) * (Number(taxRate) / 100);
  const total =Number(amount || 0) + tax;

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();mutation.mutate();
      }}
    >
      <div>
        <label className="mb-1 block text-sm font-medium">
          Customer
        </label>

        <select
          value={customerId}
          onChange={(e) =>setCustomerId(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
          required
        >
          <option value="">
            Select Customer
          </option>

          {customersData?.data?.map((customer: any) => (
              <option
                key={customer._id}
                value={customer._id}
              >
                {customer.name}
                {" - "}
                {customer.company}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Amount
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) =>setAmount( e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Tax Rate
        </label>

        <select
          value={taxRate}
          onChange={(e) =>setTaxRate(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        >
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
        <label className="mb-1 block text-sm font-medium">
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>setStatus(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        >
          <option value="Draft">
            Draft
          </option>

          <option value="Sent">
            Sent
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

          <option value="Void">
            Void
          </option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Issue Date
          </label>

          <input
            type="date"
            value={issueDate}
            onChange={(e) =>setIssueDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            required
          />
        </div>
      </div>

      <div className="rounded-2xl bg-violet-50 p-4">
        <p>
          Tax: {" "} ₹{tax.toFixed(2)}
        </p>

        <p className="font-semibold">
          Total: {" "} ₹{total.toFixed(2)}
        </p>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 font-medium text-white"
      >
        {mutation.isPending
          ? "Saving..."
          : mode === "create"
          ? "Create Invoice"
          : "Update Invoice"}
      </button>
    </form>
  );
}