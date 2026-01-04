import { formatDate } from "@/lib/dateUtils";

interface DateStripProps {
  date: Date;
}

export function DateStrip({ date }: DateStripProps) {
  const { weekday, day, month, year } = formatDate(date);

  return (
    <header className="animate-fade-in">
      <p
        className="text-center text-sm tracking-[0.25em] uppercase text-muted-foreground font-sans"
        aria-label={`Today is ${weekday}, ${month} ${day}, ${year}`}
      >
        <span>{weekday}</span>
        <span className="mx-3 opacity-40" aria-hidden="true">·</span>
        <span>{day}</span>
        <span className="mx-3 opacity-40" aria-hidden="true">·</span>
        <span>{month}</span>
        <span className="mx-3 opacity-40" aria-hidden="true">·</span>
        <span>{year}</span>
      </p>
    </header>
  );
}
