import { getDaysInYear, getDayOfYear, getWeekOfYear, getDaysInMonth, getStartOfWeek, getDayOfWeek } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";
import { ViewMode } from "./ViewToggle";

interface DotGridProps {
  date: Date;
  viewMode: ViewMode;
}

export function DotGrid({ date, viewMode }: DotGridProps) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const dayOfMonth = date.getDate();
  const dayOfYear = getDayOfYear(date);
  const dayOfWeek = getDayOfWeek(date);

  if (viewMode === 'week') {
    return <WeekView date={date} dayOfWeek={dayOfWeek} />;
  }

  if (viewMode === 'month') {
    return <MonthView date={date} month={month} dayOfMonth={dayOfMonth} year={year} />;
  }

  // Year view (default)
  const totalDays = getDaysInYear(year);

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

function WeekView({ date, dayOfWeek }: { date: Date; dayOfWeek: number }) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startOfWeek = getStartOfWeek(date);

  return (
    <div 
      className="animate-fade-in animation-delay-300"
      role="img"
      aria-label={`Day ${dayOfWeek + 1} of 7 in the current week`}
    >
      <div className="flex justify-center gap-4 sm:gap-6">
        {weekDays.map((day, i) => {
          const isPassed = i < dayOfWeek;
          const isToday = i === dayOfWeek;
          const dotDate = new Date(startOfWeek);
          dotDate.setDate(startOfWeek.getDate() + i);

          return (
            <div key={day} className="flex flex-col items-center gap-2">
              <span className={cn(
                "text-xs tracking-wide uppercase font-sans",
                isToday ? "text-primary font-medium" : "text-muted-foreground/60"
              )}>
                {day}
              </span>
              <div
                className={cn(
                  "rounded-full transition-all duration-500",
                  isPassed 
                    ? "bg-dot-passed" 
                    : isToday
                    ? "bg-dot-passed"
                    : "bg-dot-remaining",
                  isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
                style={{
                  width: '16px',
                  height: '16px',
                }}
                aria-hidden="true"
              />
              <span className={cn(
                "text-xs font-sans",
                isToday ? "text-foreground" : "text-muted-foreground/40"
              )}>
                {dotDate.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MonthView({ date, month, dayOfMonth, year }: { date: Date; month: number; dayOfMonth: number; year: number }) {
  const totalDays = getDaysInMonth(year, month);
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  return (
    <div 
      className="animate-fade-in animation-delay-300"
      role="img"
      aria-label={`Day ${dayOfMonth} of ${totalDays} in the current month`}
    >
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3 justify-center mx-auto max-w-md mb-3">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-center text-xs tracking-wide text-muted-foreground/60 font-sans">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3 justify-center mx-auto max-w-md">
        {/* Empty cells for days before the 1st */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Days of the month */}
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const isPassed = day < dayOfMonth;
          const isToday = day === dayOfMonth;
          
          return (
            <div
              key={day}
              className="flex flex-col items-center justify-center gap-1"
            >
              <div
                className={cn(
                  "rounded-full transition-all duration-500",
                  isPassed 
                    ? "bg-dot-passed" 
                    : isToday
                    ? "bg-dot-passed"
                    : "bg-dot-remaining",
                  isToday && "ring-2 ring-primary ring-offset-1 ring-offset-background"
                )}
                style={{
                  width: '12px',
                  height: '12px',
                }}
                aria-hidden="true"
              />
              <span className={cn(
                "text-xs font-sans",
                isToday ? "text-primary font-medium" : isPassed ? "text-muted-foreground/60" : "text-muted-foreground/40"
              )}>
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
