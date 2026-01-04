import { getDaysInYear, getDayOfYear } from "@/lib/dateUtils";

interface ProgressStatsProps {
  date: Date;
}

export function ProgressStats({ date }: ProgressStatsProps) {
  const year = date.getFullYear();
  const totalDays = getDaysInYear(year);
  const dayOfYear = getDayOfYear(date);
  
  const percentPassed = ((dayOfYear / totalDays) * 100).toFixed(1);
  const percentRemaining = (100 - parseFloat(percentPassed)).toFixed(1);

  return (
    <div className="text-center space-y-4 animate-fade-in animation-delay-400">
      <p className="text-sm tracking-wide text-muted-foreground font-sans">
        <span className="text-foreground/80">{percentPassed}%</span>
        <span className="opacity-50"> passed</span>
        <span className="mx-3 opacity-30" aria-hidden="true">·</span>
        <span className="text-foreground/80">{percentRemaining}%</span>
        <span className="opacity-50"> remaining</span>
      </p>
      
      {/* Progress bar */}
      <div 
        className="w-full max-w-xs mx-auto h-0.5 bg-progress-track rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={parseFloat(percentPassed)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Year progress: ${percentPassed}% complete`}
      >
        <div 
          className="h-full bg-progress-fill rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentPassed}%` }}
        />
      </div>
    </div>
  );
}
