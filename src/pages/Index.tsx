import { useState, useMemo, useCallback } from "react";
import { DateStrip } from "@/components/DateStrip";
import { QuoteSection } from "@/components/QuoteSection";
import { QuoteToggle } from "@/components/QuoteToggle";
import { MonthsRow } from "@/components/MonthsRow";
import { DotGrid } from "@/components/DotGrid";
import { ProgressStats } from "@/components/ProgressStats";
import { Footer } from "@/components/Footer";
import { stoicQuotes, StoicQuote } from "@/data/stoicQuotes";
import { getDayOfYear } from "@/lib/dateUtils";

const Index = () => {
  const today = useMemo(() => new Date(), []);
  const dayOfYear = getDayOfYear(today);
  
  // Deterministic daily quote based on day of year
  const dailyQuote = useMemo(() => {
    const index = (dayOfYear - 1) % stoicQuotes.length;
    return stoicQuotes[index];
  }, [dayOfYear]);

  const [mode, setMode] = useState<'daily' | 'random'>('daily');
  const [randomQuote, setRandomQuote] = useState<StoicQuote | null>(null);

  const handleToggle = useCallback(() => {
    if (mode === 'daily') {
      // Switch to random mode - pick a random quote
      const randomIndex = Math.floor(Math.random() * stoicQuotes.length);
      setRandomQuote(stoicQuotes[randomIndex]);
      setMode('random');
    } else {
      // Switch back to daily mode
      setMode('daily');
    }
  }, [mode]);

  const currentQuote = mode === 'daily' ? dailyQuote : (randomQuote || dailyQuote);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* SEO */}
      <title>Memento Mori — A Stoic Reflection</title>
      <meta name="description" content="A modern memento mori. Reflect on time passing with daily Stoic wisdom from Marcus Aurelius, Seneca, and Epictetus." />

      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center px-4 py-12 sm:py-16 md:py-20">
        <div className="container max-w-4xl mx-auto space-y-12 sm:space-y-16 md:space-y-20">
          
          {/* Date strip */}
          <DateStrip date={today} />

          {/* Quote section with toggle */}
          <section className="space-y-8" aria-labelledby="quote-heading">
            <h1 id="quote-heading" className="sr-only">Daily Stoic Quote</h1>
            <QuoteSection quote={currentQuote} />
            <QuoteToggle mode={mode} onToggle={handleToggle} />
          </section>

          {/* Months row */}
          <MonthsRow />

          {/* Dot grid visualization */}
          <section aria-labelledby="calendar-heading">
            <h2 id="calendar-heading" className="sr-only">Year Progress Visualization</h2>
            <DotGrid date={today} />
          </section>

          {/* Progress stats */}
          <ProgressStats date={today} />

        </div>
      </main>

      {/* Footer */}
      <div className="py-8 sm:py-12">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
