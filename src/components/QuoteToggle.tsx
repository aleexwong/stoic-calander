import { cn } from "@/lib/utils";

interface QuoteToggleProps {
  mode: 'daily' | 'random';
  onToggle: () => void;
}

export function QuoteToggle({ mode, onToggle }: QuoteToggleProps) {
  return (
    <div className="flex items-center justify-center gap-3 animate-fade-in animation-delay-100">
      <button
        onClick={onToggle}
        className={cn(
          "relative flex items-center gap-2 px-4 py-2 text-xs tracking-[0.15em] uppercase font-sans",
          "rounded-sm border border-border/50 transition-all duration-300",
          "hover:border-border focus:outline-none focus:ring-1 focus:ring-ring"
        )}
        role="switch"
        aria-checked={mode === 'random'}
        aria-label={`Quote mode: ${mode}. Click to switch.`}
      >
        <span className={cn(
          "transition-opacity duration-300",
          mode === 'daily' ? "text-foreground" : "text-muted-foreground/60"
        )}>
          Daily
        </span>
        <span className="text-muted-foreground/30" aria-hidden="true">/</span>
        <span className={cn(
          "transition-opacity duration-300",
          mode === 'random' ? "text-foreground" : "text-muted-foreground/60"
        )}>
          Random
        </span>
      </button>
    </div>
  );
}
