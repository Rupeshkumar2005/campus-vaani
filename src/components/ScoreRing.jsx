export default function ScoreRing({ score, total }) {
  const pct = score / total;
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);
  const color = pct >= 0.8 ? "text-good" : pct >= 0.5 ? "text-accent" : "text-bad";

  return (
    <div className="relative w-28 h-28">
      <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90">
        <circle cx="56" cy="56" r={radius} fill="none" stroke="currentColor" className="text-surface" strokeWidth="8" />
        <circle
          cx="56" cy="56" r={radius} fill="none"
          stroke="currentColor"
          className={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold">{score}/{total}</span>
      </div>
    </div>
  );
}