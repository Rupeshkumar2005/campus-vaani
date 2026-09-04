export default function Waveform({ active }) {
  const heights = [14, 26, 18, 34, 20, 30, 16, 24, 12, 28, 18, 22];
  return (
    <div className="flex items-center gap-[3px] h-10">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full ${active ? "bg-accent" : "bg-border"}`}
          style={{
            height: active ? `${h}px` : "6px",
            transition: "height 0.3s ease",
            animation: active ? `pulse-${i % 3} 0.8s ease-in-out infinite` : "none",
            animationDelay: `${(i % 4) * 0.1}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes pulse-0 { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes pulse-1 { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
        @keyframes pulse-2 { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.9; } }
      `}</style>
    </div>
  );
}