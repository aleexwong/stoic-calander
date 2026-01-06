import { Printer } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrintButtonProps {
  className?: string;
}

export function PrintButton({ className }: PrintButtonProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className={cn(
        "flex items-center gap-2 px-4 py-2",
        "text-xs tracking-[0.15em] uppercase font-sans",
        "rounded-sm border border-border/50 transition-all duration-300",
        "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        "focus:outline-none focus:ring-1 focus:ring-ring",
        "print:hidden",
        className
      )}
      aria-label="Print calendar"
    >
      <Printer className="h-3.5 w-3.5" />
      <span>Print</span>
    </button>
  );
}
