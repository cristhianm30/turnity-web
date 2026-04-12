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
  required,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  ...props
}: InputProps) {
  const inputId = id || props.name;
  const errorId = error ? `${inputId}-error` : undefined;
  const descIds = [ariaDescribedBy, errorId].filter(Boolean).join(" ");

  return (
    <div className="w-full">
       {label && (
         <label
           htmlFor={inputId}
           className="mb-2 block text-sm font-medium text-[#1c1207]"
         >
           {label}
           {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
         </label>
       )}
      <input
        id={inputId}
        className={cn(
          "w-full px-0 py-2.5 font-medium transition-colors",
          "placeholder-[#c4a882]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "min-h-[44px]", // Touch target minimum
          // Variant: standard (underline only)
          variant === "standard" &&
            "bg-transparent border-b-2 border-[#e8dcd0] focus:border-[#f59e0b] focus-visible:ring-[#f59e0b]",
          // Variant: filled
          variant === "filled" &&
            "bg-[#faf6f1] border border-[#e8dcd0] rounded-lg px-4 focus:border-[#f59e0b] focus:bg-white focus-visible:ring-[#f59e0b]",
          error && "border-red-500 focus:border-red-500 focus-visible:ring-red-500",
          className
        )}
        required={required}
        aria-label={ariaLabel}
        aria-describedby={descIds || undefined}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
      {error && (
        <p 
          id={errorId}
          className="mt-1 text-sm text-red-600" 
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
