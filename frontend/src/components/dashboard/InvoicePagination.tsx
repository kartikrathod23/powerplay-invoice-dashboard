import {ChevronLeft,ChevronRight,} from "lucide-react";

interface Props{
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function InvoicePagination({page,totalPages,onPageChange,}: Props) {
  const generatePages = ()=>{
    const pages: number[] = [];
    const start = Math.max( 1, page - 2);
    const end = Math.min(totalPages,page + 2);

    for(let i = start; i <= end; i++){
      pages.push(i);
    }
    return pages;
  };

  const pages = generatePages();

  return (
    <div
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between "
    >
      <p className="text-sm text-slate-500">
        Page{" "}
        <span className="font-semibold text-slate-900">
          {page}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-900">
          {totalPages}
        </span>
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() =>onPageChange(page - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition-all hover:border-violet-400 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft
            size={18}
          />
        </button>

        {pages.map(
          (pageNumber)=>(
            <button
              key={pageNumber}
              onClick={() =>onPageChange(pageNumber)}
              className={`h-10 min-w-[40px] rounded-xl px-3 text-sm font-medium transition-all
                ${page === pageNumber ? `bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md` : `border border-slate-200 bg-white text-slate-700 hover:bg-violet-50` }
              `}
            >
              {pageNumber}
            </button>
          )
        )}

        <button
          disabled={page ===totalPages}
          onClick={() => onPageChange(page + 1 )}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition-all hover:border-violet-400 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-40 "
        >
          <ChevronRight
            size={18}
          />
        </button>
      </div>
    </div>
  );
}