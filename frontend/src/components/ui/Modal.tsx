import type { ReactNode } from "react";

interface Props{
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({open,onClose,children,}: Props) {
  if(!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}