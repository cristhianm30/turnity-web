import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export function Card({
  className,
  children,
  hoverable = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[#e8dcd0] bg-white px-6 py-5",
        "transition-all duration-200",
        hoverable && "hover:border-[#d4a574] hover:bg-[#faf6f1]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
