import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  variant?:"primary"|"secondary";
}

export default function Button({variant = "primary",className = "",children,...props}: ButtonProps){
  const base ="px-4 py-2 rounded-lg text-sm font-medium transition-all";

  const variants = {
    primary:"bg-zinc-900 text-white hover:bg-zinc-800",
    secondary:"border border-stone-300 bg-white hover:bg-stone-50",
  };

  return(
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
    </button>
  );
}