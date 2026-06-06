import {IndianRupee,Receipt,Users,Landmark,} from "lucide-react";
import Card from "../ui/Card";

interface Props{
  totalBilled: number;
  totalTax: number;
  invoiceCount: number;
  customerCount: number;
}

export default function SummaryCards({totalBilled,totalTax,invoiceCount,customerCount,}: Props) {
  const cards=[
    {
      title: "Total Revenue",
      value: `₹${(totalBilled / 100000).toFixed(1)}L`,
      icon: IndianRupee,
    },
    {
      title: "Tax Collected",
      value: `₹${(totalTax / 100000).toFixed(1)}L`,
      icon: Landmark,
    },
    {
      title: "Invoices",
      value: invoiceCount,
      icon: Receipt,
    },
    {
      title: "Customers",
      value: customerCount,
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                  <Icon size={22} className="text-violet-700"/>
                </div>
              </div>

              <p className="mt-3 text-sm tracking-wide text-slate-500">
                {card.title}
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {card.value}
              </h3>
            </div>
          </Card>
        );
      })}
    </div>
  );
}