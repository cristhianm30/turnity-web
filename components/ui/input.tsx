import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "standard" | "filled";
  label?: string;
  error?: string;
}

export function Input({
  className,
  variant = "standard",
  label,
  error,
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name;

  return (
    <div className="w-full">
       {label && (
         <label
           htmlFor={inputId}
           className="mb-2 block text-sm font-medium text-[#1c1207]"
         >
           {label}
         </label>
       )}
      <input
        id={inputId}
        className={cn(
          "w-full px-0 py-2.5 font-medium transition-colors",
          "placeholder-[#c4a882]",
          "focus:outline-none",
          // Variant: standard (underline only)
          variant === "standard" &&
            "bg-transparent border-b-2 border-[#e8dcd0] focus:border-[#f59e0b]",
          // Variant: filled
          variant === "filled" &&
            "bg-[#faf6f1] border border-[#e8dcd0] rounded-lg px-4 focus:border-[#f59e0b] focus:bg-white",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
