type ButterflyMarkProps = { className?: string };

export default function ButterflyMark({ className }: ButterflyMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M39 39C27 15 12 11 9 24c-3 13 10 24 28 22" />
      <path d="M41 39c12-24 27-28 30-15 3 13-10 24-28 22" />
      <path d="M38 43C23 36 15 42 19 53c4 10 14 12 21-3" />
      <path d="M42 43c15-7 23-1 19 10-4 10-14 12-21-3" />
      <path d="M40 36v22" />
      <path d="M39 35c-3-7-7-10-12-11M41 35c3-7 7-10 12-11" />
      <circle cx="27" cy="23" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="53" cy="23" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
