import { useState, useMemo, useCallback, useEffect } from "react";
import { DateStrip } from "@/components/DateStrip";
import { QuoteSection } from "@/components/QuoteSection";
import { QuoteToggle } from "@/components/QuoteToggle";
import { MonthsRow } from "@/components/MonthsRow";
import { DotGrid } from "@/components/DotGrid";
import { ProgressStats } from "@/components/ProgressStats";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthorCredit } from "@/components/AuthorCredit";
import { ViewToggle, ViewMode } from "@/components/ViewToggle";
import { stoicQuotes, StoicQuote } from "@/data/stoicQuotes";
import { getDayOfYear } from "@/lib/dateUtils";

const STORAGE_KEYS = {
  QUOTE_MODE: 'stoic-calendar-quote-mode',
  VIEW_MODE: 'stoic-calendar-view-mode',
} as const;

const Index = () => {
  const today = useMemo(() => new Date(), []);
  const dayOfYear = getDayOfYear(today);
  
  // Deterministic daily quote based on day of year
  const dailyQuote = useMemo(() => {
    const index = (dayOfYear - 1) % stoicQuotes.length;
    return stoicQuotes[index];
  }, [dayOfYear]);

  // Initialize state from localStorage
  const [mode, setMode] = useState<'daily' | 'random'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.QUOTE_MODE);
      return saved === 'random' ? 'random' : 'daily';
    }
    return 'daily';
  });

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.VIEW_MODE);
      if (saved === 'week' || saved === 'month' || saved === 'year') {
        return saved;
      }
    }
    return 'year';
  });

  const [randomQuote, setRandomQuote] = useState<StoicQuote | null>(null);

  // Persist mode to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUOTE_MODE, mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIEW_MODE, viewMode);
  }, [viewMode]);

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

  const handleViewChange = useCallback((newView: ViewMode) => {
    setViewMode(newView);
  }, []);

  const currentQuote = mode === 'daily' ? dailyQuote : (randomQuote || dailyQuote);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* SEO */}
      <title>Memento Mori — A Stoic Reflection</title>
      <meta name="description" content="A modern memento mori. Reflect on time passing with daily Stoic wisdom from Marcus Aurelius, Seneca, and Epictetus." />

      {/* Author credit - top left */}
      <AuthorCredit />

      {/* Theme toggle - top right */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

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

          {/* View toggle */}
          <ViewToggle currentView={viewMode} onViewChange={handleViewChange} />

          {/* Dot grid visualization */}
          <section aria-labelledby="calendar-heading">
            <h2 id="calendar-heading" className="sr-only">Year Progress Visualization</h2>
            <DotGrid date={today} viewMode={viewMode} />
          </section>

          {/* Progress stats */}
          <ProgressStats date={today} viewMode={viewMode} />

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
