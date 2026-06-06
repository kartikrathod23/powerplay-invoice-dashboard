import Button from "../ui/Button";

interface Props{
  onNewInvoice: () => void;
  onAnalytics: () => void;
}

export default function DashboardHero({onNewInvoice,onAnalytics,}: Props){
  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 p-6 shadow-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Invoice Management Dashboard
          </h1>

          <p className="mt-2 text-sm text-white/80">
            Manage invoices, customers
            and analytics in one place.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onAnalytics}
          >
            Analytics
          </Button>

          <Button onClick={onNewInvoice}>
            + New Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}