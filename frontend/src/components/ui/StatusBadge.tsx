interface Props{
  status: string;
}

export default function StatusBadge({status,}: Props){
  const styles: Record<string, string>={
    Paid:"bg-green-100 text-green-700",
    Unpaid:"bg-yellow-100 text-yellow-700",
    Overdue:"bg-red-100 text-red-700",
    Draft:"bg-stone-100 text-stone-700",
    Sent:"bg-blue-100 text-blue-700",
    Void:"bg-zinc-100 text-zinc-700",
  };

  return(
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}