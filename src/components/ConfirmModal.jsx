export default function ConfirmModal({ title, message, confirmLabel = "Yes, continue", cancelLabel = "Cancel", onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* modal card */}
      <div className="relative bg-surface border border-border rounded-xl p-6 max-w-sm w-full shadow-2xl">
        {title && <p className="font-semibold text-lg mb-2">{title}</p>}
        <p className="text-muted text-sm leading-relaxed mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-full border border-border text-sm font-semibold hover:bg-bg transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-full bg-accent text-bg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}