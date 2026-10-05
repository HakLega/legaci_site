import ButterflyMark from "./butterfly-mark";

type BrandWordmarkProps = { className?: string };

export default function BrandWordmark({ className }: BrandWordmarkProps) {
  return (
    <span className={`brand-name${className ? ` ${className}` : ""}`}>
      Leggar<span className="brand-final-letter">
        e<ButterflyMark className="brand-mark-perched" />
      </span>
    </span>
  );
}
