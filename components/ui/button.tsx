import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "glass";
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
        "inline-flex items-center justify-center font-medium transition-all rounded-lg",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sun-500 focus-visible:ring-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "min-h-[44px] min-w-[44px]", // Touch target minimum
        // Size variants
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2.5 text-base",
        size === "lg" && "px-6 py-3 text-lg",
        // Color variants
        variant === "primary" &&
          "glass-btn-primary hover:scale-[1.02] active:scale-[0.98]",
        variant === "secondary" &&
          "bg-sun-100 text-gray-900 dark:bg-gray-800 dark:text-white hover:bg-sun-200 dark:hover:bg-gray-700 active:scale-[0.98]",
        variant === "ghost" &&
          "glass-btn-ghost hover:scale-[1.01] active:scale-[0.99]",
        variant === "glass" &&
          "glass-btn hover:bg-white/80 dark:hover:bg-white/15 active:scale-[0.98]",
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
