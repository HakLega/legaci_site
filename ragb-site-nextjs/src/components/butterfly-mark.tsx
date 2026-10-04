type ButterflyMarkProps = { className?: string };

export default function ButterflyMark({ className }: ButterflyMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M56 77C54 60 50 41 35 25 27 17 18 11 8 8c8 18 8 37 19 48 8 9 19 11 27 16 4 2 6 4 2 5Z" fill="currentColor" />
      <path d="M55 73c-8-8-17-12-26-9C15 68 9 80 10 98c17-1 31-6 41-16 4-4 6-7 4-9Z" fill="currentColor" />
      <path d="M55 82c12-15 20-32 17-51M58 82c15-12 25-25 31-39" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" />
      <circle cx="72" cy="29" r="3.5" fill="currentColor" />
      <circle cx="90" cy="41" r="3.5" fill="currentColor" />
    </svg>
  );
}
