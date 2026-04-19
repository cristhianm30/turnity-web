import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "standard" | "filled" | "glass";
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
           className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
         >
           {label}
           {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
         </label>
       )}
      <input
        id={inputId}
        className={cn(
          "w-full px-0 py-2.5 font-medium transition-all duration-200",
          "placeholder-gray-400 dark:placeholder-gray-500",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950",
          "min-h-[44px]", // Touch target minimum
           // Variant: standard (underline only)
           variant === "standard" &&
             "bg-transparent border-b-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-brand-500 dark:focus:border-brand-400 focus-visible:ring-brand-500/30 dark:focus-visible:ring-brand-400/30",
           // Variant: filled
           variant === "filled" &&
             "bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-lg px-4 focus:border-brand-500 dark:focus:border-brand-400 focus:bg-white dark:focus:bg-white/10 focus-visible:ring-brand-500/30 dark:focus-visible:ring-brand-400/30",
           // Variant: glass
           variant === "glass" &&
             "glass dark:bg-white/5 border border-white/30 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-4 focus:border-brand-400 dark:focus:border-brand-400 focus:ring-brand-500/20 dark:focus:ring-brand-400/20",
          error && "border-red-500 dark:border-red-900/50 focus:border-red-500 dark:focus:border-red-400 focus-visible:ring-red-500/30 dark:focus-visible:ring-red-400/30",
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
          className="mt-1 text-sm text-red-600 dark:text-red-400 font-medium" 
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
