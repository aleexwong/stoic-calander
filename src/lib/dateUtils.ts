export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function formatDate(date: Date): {
  weekday: string;
  day: string;
  month: string;
  year: string;
} {
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const day = date.getDate().toString();
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear().toString();
  
  return { weekday, day, month, year };
}

export function getCurrentMonth(): number {
  return new Date().getMonth(); // 0-indexed
}

export const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
] as const;
