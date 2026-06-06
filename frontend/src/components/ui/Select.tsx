interface Option{
  label: string;
  value: string;
}

interface Props{
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

export default function Select({value,onChange,options,}: Props){
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-lg border border-stone-300 bg-white px-4 py-2 ">
      {options.map((option)=>(
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}