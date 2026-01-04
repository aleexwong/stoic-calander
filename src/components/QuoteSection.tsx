import { StoicQuote } from "@/data/stoicQuotes";

interface QuoteSectionProps {
  quote: StoicQuote;
}

export function QuoteSection({ quote }: QuoteSectionProps) {
  return (
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
  );
}
