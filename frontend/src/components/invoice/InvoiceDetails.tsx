interface Props{
  invoice: any;
}

export default function InvoiceDetails({invoice}: Props){
  return(
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold">
          Customer
        </h3>

        <p>{invoice.customerId.name}</p>

        <p className="text-slate-500">
          {invoice.customerId.company}
        </p>
      </div>

      <div>
        <h3 className="font-semibold">
          Invoice
        </h3>

        <p>
          Amount: ₹{invoice.amount}
        </p>

        <p>
          Tax: ₹{invoice.tax}
        </p>

        <p>
          Total: ₹{invoice.total}
        </p>

        <p>
          Status: {invoice.status}
        </p>
      </div>

      <div>
        <h3 className="font-semibold">
          Dates
        </h3>

        <p>
          Issue: {new Date( invoice.issueDate).toLocaleDateString()}
        </p>

        <p>
          Due:{new Date(invoice.dueDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}