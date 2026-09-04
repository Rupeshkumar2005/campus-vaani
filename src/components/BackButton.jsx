export default function BackButton({ label, onClick }) {
  return (
    <div className="sticky top-0 z-20 bg-bg/95 backdrop-blur-sm py-3 -mt-3 mb-6">
      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
      >
        <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs">
          ←
        </span>
        {label}
      </button>
    </div>
  );
}