import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  "aria-label": ariaLabel,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors rounded-lg",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f59e0b] focus-visible:ring-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "min-h-[44px] min-w-[44px]", // Touch target minimum
        // Size variants
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2.5 text-base",
        size === "lg" && "px-6 py-3 text-lg",
        // Color variants
        variant === "primary" &&
          "bg-[#f59e0b] text-white hover:bg-[#b45309] active:bg-[#b45309]",
        variant === "secondary" &&
          "bg-[#fef3c7] text-[#1c1207] hover:bg-[#fde68a] active:bg-[#fde68a]",
        variant === "ghost" &&
          "text-[#1c1207] hover:bg-[#faf6f1] active:bg-[#f5f0e6]",
        className
      )}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span 
            className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
