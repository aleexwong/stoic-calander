import { footerMessages } from "@/data/stoicQuotes";
import { useMemo } from "react";

export function Footer() {
  const message = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * footerMessages.length);
    return footerMessages[randomIndex];
  }, []);

  return (
    <footer className="text-center animate-fade-in animation-delay-500">
      <p className="text-xs tracking-[0.2em] text-muted-foreground/50 font-sans italic">
        {message}
      </p>
    </footer>
  );
}
