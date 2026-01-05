# Memento Mori — A Stoic Reflection

A minimalist web app that visualizes the passing of time through the lens of Stoic philosophy. Each day is represented as a dot in a year-long grid, paired with daily wisdom from Marcus Aurelius, Seneca, and Epictetus.

![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite)

## Features

- **Multiple Time Views** — Toggle between week, month, and year visualizations
- **100 Stoic Quotes** — Curated wisdom from Marcus Aurelius, Seneca, and Epictetus
- **Daily & Random Modes** — Deterministic daily quote or shuffle for variety
- **Copy to Clipboard** — One-click quote sharing
- **Dark/Light Theme** — Toggle with system preference detection
- **Persistent Preferences** — Quote mode, view, and theme saved to localStorage
- **Progress Stats** — Dynamic percentage based on current view
- **Responsive Design** — Mobile-first approach with fluid typography
- **Accessibility** — Proper ARIA labels, semantic HTML, and screen reader support

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design tokens
- **UI Components:** shadcn/ui (Radix primitives)
- **Routing:** React Router DOM
- **State:** React Query for async state management

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/stoic-calendar.git
cd stoic-calendar

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── DateStrip.tsx      # Current date display
│   ├── DotGrid.tsx        # Week/month/year visualization
│   ├── Footer.tsx         # Random footer messages
│   ├── MonthsRow.tsx      # Month navigation strip
│   ├── ProgressStats.tsx  # Dynamic progress percentage
│   ├── QuoteSection.tsx   # Quote display with copy button
│   ├── QuoteToggle.tsx    # Daily/random toggle
│   ├── ThemeToggle.tsx    # Dark/light mode switch
│   ├── ViewToggle.tsx     # Week/month/year selector
│   └── ui/                # shadcn/ui components
├── data/
│   └── stoicQuotes.ts     # 100 curated quotes
├── lib/
│   ├── dateUtils.ts       # Date helper functions
│   └── utils.ts           # General utilities (cn)
├── pages/
│   ├── Index.tsx          # Main page
│   └── NotFound.tsx       # 404 page
└── hooks/
    └── use-mobile.tsx     # Responsive hook
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build with development mode |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Customization

### Adding Quotes

Edit `src/data/stoicQuotes.ts` to add or modify quotes:

```typescript
{
  text: "Your quote here",
  author: "Author Name",
  source: "Optional Source" // optional
}
```

### Theming

The app uses CSS custom properties defined in `src/index.css`. Key variables:

- `--dot-passed` / `--dot-remaining` — Dot grid colors
- `--progress-track` / `--progress-fill` — Progress bar colors
- `--font-serif` / `--font-sans` — Typography

### localStorage Keys

- `stoic-calendar-theme` — 'light' | 'dark'
- `stoic-calendar-quote-mode` — 'daily' | 'random'
- `stoic-calendar-view-mode` — 'week' | 'month' | 'year'

## Philosophy

"Memento Mori" (remember that you will die) is a Stoic meditation practice. This app serves as a daily reminder to:

- Reflect on the finite nature of time
- Find wisdom in ancient philosophy  
- Make each day count

## License

MIT

---

*"You could leave life right now. Let that determine what you do and say and think."*  
— Marcus Aurelius
