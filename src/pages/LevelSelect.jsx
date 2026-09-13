import { useEffect, useState } from "react";
import { LEVEL_CONFIG, LEVEL_STYLES } from "../data/levelConfig";
import grammarQuestions from "../data/grammarQuestions";
import { getQuestions } from "../utils/api";
import BackButton from "../components/BackButton";

export default function LevelSelect({ moduleType, moduleLabel, onSelect, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  if (moduleType === "grammar") {
    setQuestions(grammarQuestions);
    setLoading(false);
    return;
  }
  getQuestions(moduleType)
    .then(setQuestions)
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, [moduleType]);

  const levels = ["beginner", "medium", "hard"];

  function countFor(level) {
    return questions.filter((q) => q.level === level).length;
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-14">
      <div className="max-w-xl w-full">
        <BackButton label="Back to home" onClick={onBack} />

        <p className="text-muted text-sm mb-2">{moduleLabel}</p>
        <h1 className="text-3xl font-extrabold mb-10">Choose your level</h1>

        {loading && <p className="text-muted text-sm">Loading questions…</p>}
        {error && <p className="text-bad text-sm">{error}</p>}

        {!loading && !error && (
          <div className="flex flex-col gap-3">
            {levels.map((level) => {
              const count = countFor(level);
              const disabled = count === 0;
              return (
                <button
                  key={level}
                  disabled={disabled}
                  onClick={() => onSelect(level, questions)}
                  className={`flex items-center justify-between text-left border border-border rounded-xl px-6 py-5 transition-colors ${
                    disabled ? "opacity-30 cursor-not-allowed" : "bg-surface hover:border-muted"
                  }`}
                >
                  <div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${LEVEL_STYLES[level]}`}>
                      {LEVEL_CONFIG[level]?.label}
                    </span>
                    <p className="text-muted text-sm mt-3">
                      {count} question{count !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <span className="text-accent text-xl">→</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}