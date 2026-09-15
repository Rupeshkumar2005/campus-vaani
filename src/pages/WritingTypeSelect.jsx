import { useState } from "react";
import writingQuestions from "../data/writingQuestions";
import BackButton from "../components/BackButton";
import situationalQuestions from "../data/situationalQuestions";

const TYPES = [
  { key: "business", label: "Business Communication Writing" },
  { key: "situational", label: "Situational Response (Chat/Email)" },
];

const LENGTHS = [
  { key: "short", label: "Short (40-80 words)" },
  { key: "long", label: "Long (120-180 words)" },
];

export default function WritingTypeSelect({ onSelect, onBack }) {
  const [showLengths, setShowLengths] = useState(false);

  function countForType(type) {
  if (type === "situational") {
    return situationalQuestions.length;
  }
  return writingQuestions.filter((q) => q.type === type).length;
}

  function countForLength(length) {
    return writingQuestions.filter(
      (q) => q.type === "business" && q.lengthCategory === length
    ).length;
  }

  if (showLengths) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-14">
        <div className="max-w-xl w-full">
          <BackButton label="Back to categories" onClick={() => setShowLengths(false)} />

          <p className="text-muted text-sm mb-2">Writing Practice</p>
          <h1 className="text-3xl font-extrabold mb-10">Choose a length</h1>

          <div className="flex flex-col gap-3">
            {LENGTHS.map((l) => {
              const count = countForLength(l.key);
              const disabled = count === 0;
              return (
                <button
                  key={l.key}
                  disabled={disabled}
                  onClick={() => onSelect("business", l.key)}
                  className={`flex items-center justify-between text-left border border-border rounded-xl px-6 py-5 transition-colors ${
                    disabled ? "opacity-30 cursor-not-allowed" : "bg-surface hover:border-muted"
                  }`}
                >
                  <div>
                    <p className="font-semibold">{l.label}</p>
                    <p className="text-muted text-sm mt-1">
                      {count} prompt{count !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <span className="text-accent text-xl">→</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-14">
      <div className="max-w-xl w-full">
        <BackButton label="Back to home" onClick={onBack} />

        <p className="text-muted text-sm mb-2">Writing Practice</p>
        <h1 className="text-3xl font-extrabold mb-10">Choose a category</h1>

        <div className="flex flex-col gap-3">
          {TYPES.map((t) => {
            const count = countForType(t.key);
            const disabled = count === 0;
            return (
              <button
                key={t.key}
                disabled={disabled}
                onClick={() => {
                  if (t.key === "business") {
                    setShowLengths(true);
                  } else {
                    onSelect(t.key, null);
                  }
                }}
                className={`flex items-center justify-between text-left border border-border rounded-xl px-6 py-5 transition-colors ${
                  disabled ? "opacity-30 cursor-not-allowed" : "bg-surface hover:border-muted"
                }`}
              >
                <div>
                  <p className="font-semibold">{t.label}</p>
                  <p className="text-muted text-sm mt-1">
                    {count} prompt{count !== 1 ? "s" : ""}
                  </p>
                </div>
                <span className="text-accent text-xl">→</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}