import { cn } from "@/lib/utils";

export type ViewMode = 'week' | 'month' | 'year';

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const views: { value: ViewMode; label: string }[] = [
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
];

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center justify-center gap-1 animate-fade-in animation-delay-200">
      <div className="flex items-center rounded-sm border border-border/50 overflow-hidden">
        {views.map((view, index) => (
          <button
            key={view.value}
            onClick={() => onViewChange(view.value)}
            className={cn(
              "px-4 py-2 text-xs tracking-[0.15em] uppercase font-sans transition-all duration-300",
              "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-inset",
              currentView === view.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              index !== views.length - 1 && "border-r border-border/50"
            )}
            aria-pressed={currentView === view.value}
          >
            {view.label}
          </button>
        ))}
      </div>
    </div>
  );
}
