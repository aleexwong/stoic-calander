import { Github, Twitter } from "lucide-react";

export function AuthorCredit() {
  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-3">
      <span className="text-xs text-muted-foreground/40 font-sans">
        Built by{" "}
        <a 
          href="https://twitter.com/alexjxwong" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground/60 hover:text-foreground transition-colors duration-300"
        >
          Alex Wong
        </a>
      </span>
      
      <div className="flex items-center gap-2">
        <a
          href="https://twitter.com/alexjxwong"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground/40 hover:text-foreground transition-colors duration-300"
          aria-label="Follow Alex Wong on Twitter"
        >
          <Twitter className="h-3.5 w-3.5" />
        </a>
        <a
          href="https://github.com/aleexwong/stoic-calander"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground/40 hover:text-foreground transition-colors duration-300"
          aria-label="View source on GitHub"
        >
          <Github className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
