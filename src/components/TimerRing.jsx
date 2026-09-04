export default function TimerRing({ seconds, total }) {
  const pct = seconds / total;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);
  const urgent = seconds <= 10;

  return (
    <div className="relative w-12 h-12">
      <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
        <circle cx="24" cy="24" r={radius} fill="none" stroke="currentColor" className="text-border" strokeWidth="3" />
        <circle
          cx="24" cy="24" r={radius} fill="none"
          stroke="currentColor"
          className={urgent ? "text-bad" : "text-accent"}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <span className={`absolute inset-0 flex items-center justify-center text-xs font-semibold ${urgent ? "text-bad" : "text-ink"}`}>
        {seconds}
      </span>
    </div>
  );
}