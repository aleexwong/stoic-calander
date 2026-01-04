import { getDaysInYear, getDayOfYear } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";

interface DotGridProps {
  date: Date;
}

export function DotGrid({ date }: DotGridProps) {
  const year = date.getFullYear();
  const totalDays = getDaysInYear(year);
  const dayOfYear = getDayOfYear(date);

  return (
    <div 
      className="animate-fade-in animation-delay-300"
      role="img"
      aria-label={`${dayOfYear} of ${totalDays} days passed this year`}
    >
      <div 
        className="grid gap-1.5 sm:gap-2 justify-center mx-auto max-w-3xl"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(8px, 10px))',
        }}
      >
        {Array.from({ length: totalDays }, (_, i) => {
          const isPassed = i < dayOfYear;
          const isToday = i === dayOfYear - 1;
          
          return (
            <div
              key={i}
              className={cn(
                "aspect-square rounded-full transition-all duration-500",
                isPassed 
                  ? "bg-dot-passed" 
                  : "bg-dot-remaining",
                isToday && "ring-2 ring-primary ring-offset-1 ring-offset-background"
              )}
              style={{
                width: '8px',
                height: '8px',
              }}
              aria-hidden="true"
            />
          );
        })}
      </div>
    </div>
  );
}
