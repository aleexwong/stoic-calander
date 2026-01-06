import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { StoicQuote } from "@/data/stoicQuotes";
import { cn } from "@/lib/utils";

interface QuoteSectionProps {
  quote: StoicQuote;
}

export function QuoteSection({ quote }: QuoteSectionProps) {
  const [copied, setCopied] = useState(false);

  const copyQuote = useCallback(async () => {
    const textToCopy = quote.source 
      ? `"${quote.text}" — ${quote.author}, ${quote.source}`
      : `"${quote.text}" — ${quote.author}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy quote:', err);
    }
  }, [quote]);

  return (
    <div className="relative group">
      <blockquote className="text-center max-w-2xl mx-auto animate-fade-in animation-delay-100">
        <p className="font-serif text-2xl sm:text-3xl md:text-4xl leading-relaxed text-foreground italic">
          "{quote.text}"
        </p>
        <footer className="mt-6 text-sm tracking-wide text-muted-foreground font-sans uppercase">
          <cite className="not-italic">
            — {quote.author}
            {quote.source && (
              <span className="opacity-60">, {quote.source}</span>
            )}
          </cite>
        </footer>
      </blockquote>

      {/* Copy button */}
      <button
        onClick={copyQuote}
        className={cn(
          "absolute -bottom-8 left-1/2 -translate-x-1/2",
          "flex items-center gap-1.5 px-3 py-1.5",
          "text-xs tracking-wide uppercase font-sans",
          "rounded-sm border border-border/50 transition-all duration-300",
          "opacity-0 group-hover:opacity-100 focus:opacity-100",
          "hover:border-border focus:outline-none focus:ring-1 focus:ring-ring",
          "bg-background/80 backdrop-blur-sm",
          "print:hidden",
          copied && "text-primary border-primary/50"
        )}
        aria-label={copied ? "Quote copied" : "Copy quote to clipboard"}
      >
        {copied ? (
          <>
            <Check className="h-3 w-3" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
