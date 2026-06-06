import type { ReactNode } from "react";

interface Props{
  children: ReactNode;
}

export default function Card({ children,}: Props) {
  return (
    <div className=" rounded-xl border border-stone-200 bg-white shadow-sm">
      {children}
    </div>
  );
}