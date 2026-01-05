import { getDaysInYear, getDayOfYear, getDaysInMonth, getDayOfWeek } from "@/lib/dateUtils";
import { ViewMode } from "./ViewToggle";

interface ProgressStatsProps {
  date: Date;
  viewMode: ViewMode;
}

export function ProgressStats({ date, viewMode }: ProgressStatsProps) {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  let total: number;
  let passed: number;
  let label: string;

  if (viewMode === 'week') {
    total = 7;
    passed = getDayOfWeek(date) + 1; // +1 because getDayOfWeek is 0-indexed
    label = "of week";
  } else if (viewMode === 'month') {
    total = getDaysInMonth(year, month);
    passed = date.getDate();
    label = "of month";
  } else {
    total = getDaysInYear(year);
    passed = getDayOfYear(date);
    label = "of year";
  }

  const percentPassed = ((passed / total) * 100).toFixed(1);
  const percentRemaining = (100 - parseFloat(percentPassed)).toFixed(1);

  return (
    <div className="text-center space-y-4 animate-fade-in animation-delay-400">
      <p className="text-sm tracking-wide text-muted-foreground font-sans">
        <span className="text-foreground/80">{percentPassed}%</span>
        <span className="opacity-50"> passed</span>
        <span className="mx-3 opacity-30" aria-hidden="true">·</span>
        <span className="text-foreground/80">{percentRemaining}%</span>
        <span className="opacity-50"> remaining</span>
        <span className="mx-3 opacity-30" aria-hidden="true">·</span>
        <span className="opacity-50">{label}</span>
      </p>
      
      {/* Progress bar */}
      <div 
        className="w-full max-w-xs mx-auto h-0.5 bg-progress-track rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={parseFloat(percentPassed)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress: ${percentPassed}% complete ${label}`}
      >
        <div 
          className="h-full bg-progress-fill rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentPassed}%` }}
        />
      </div>

      {/* Day counter */}
      <p className="text-xs tracking-wide text-muted-foreground/60 font-sans">
        Day {passed} of {total}
      </p>
    </div>
  );
}
