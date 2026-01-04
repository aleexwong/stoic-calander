import { MONTHS, getCurrentMonth } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";

export function MonthsRow() {
  const currentMonth = getCurrentMonth();

  return (
    <nav 
      className="flex flex-wrap justify-center gap-x-4 gap-y-2 animate-fade-in animation-delay-200"
      aria-label="Months of the year"
    >
      {MONTHS.map((month, index) => (
        <span
          key={month}
          className={cn(
            "text-xs tracking-[0.2em] font-sans transition-colors duration-300",
            index === currentMonth
              ? "text-primary font-medium"
              : "text-muted-foreground/60"
          )}
          aria-current={index === currentMonth ? "true" : undefined}
        >
          {month}
        </span>
      ))}
    </nav>
  );
}
