import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  variant?: "glass" | "solid";
}

export function Card({
  className,
  children,
  hoverable = false,
  variant = "glass",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-200",
        variant === "glass"
          ? "glass-card"
          : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm",
        hoverable && variant === "glass" && "hover:shadow-2xl hover:bg-white/75 dark:hover:bg-black/50",
        hoverable && variant === "solid" && "hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
