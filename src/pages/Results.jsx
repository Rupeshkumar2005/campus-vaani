import { useEffect } from "react";
import { LEVEL_CONFIG, LEVEL_STYLES } from "../data/levelConfig";
import ScoreRing from "../components/ScoreRing";
import { saveAttempt } from "../utils/api";

export default function Results({ results, questions, moduleLabel, moduleType, level, onRetry }) {
  // `questions` = full set of questions in this module/level (source of truth for total)
  // `results`   = only the ones the user actually answered (may be fewer than questions.length)
  const totalQuestions = questions.length;
  const attemptedCount = results.length;
  const skippedCount = totalQuestions - attemptedCount;
  const score = results.filter((r) => r.correct).length;

  const pct = attemptedCount > 0 ? Math.round((score / attemptedCount) * 100) : 0;

  // Build a lookup so we can match each question to its result (if any) by id
  const resultById = Object.fromEntries(results.map((r) => [r.id, r]));

  useEffect(() => {
    saveAttempt({ moduleType, level, score, total: attemptedCount, skipped: skippedCount }).catch((err) => {
      console.error("Failed to save attempt:", err.message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-14">
      <div className="max-w-xl w-full">
        <p className="text-muted text-sm mb-8 text-center">
          {moduleLabel} · Result
        </p>

        <div className="flex justify-center mb-4">
          <ScoreRing score={score} total={attemptedCount || totalQuestions} />
        </div>

        <div className="flex justify-center gap-6 mb-6 text-center">
          <div>
            <p className="text-lg font-semibold">{attemptedCount}/{totalQuestions}</p>
            <p className="text-muted text-xs">Attempted</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-good">{score}</p>
            <p className="text-muted text-xs">Correct</p>
          </div>
          {skippedCount > 0 && (
            <div>
              <p className="text-lg font-semibold text-muted">{skippedCount}</p>
              <p className="text-muted text-xs">Skipped</p>
            </div>
          )}
        </div>

        <p className="text-muted text-center mb-12">
          {skippedCount > 0
            ? `You submitted early — ${skippedCount} question${skippedCount > 1 ? "s" : ""} left unattempted.`
            : pct >= 80
            ? "Strong performance — keep this pace up."
            : pct >= 50
            ? "Decent start. Review the misses below and try again."
            : "Room to grow. Review the answers below and retry."}
        </p>

        <div className="flex flex-col gap-3 mb-10">
          {questions.map((question, i) => {
            const qid = question._id ?? question.id;
            const r = resultById[qid];
            const attempted = Boolean(r);
            const correct = attempted && r.correct;

            return (
              <div
                key={qid}
                className={`border rounded-xl px-5 py-4 ${
                  attempted ? "border-border bg-surface" : "border-dashed border-border bg-surface/50"
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-muted text-xs font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${LEVEL_STYLES[question.level]}`}>
                      {LEVEL_CONFIG[question.level]?.label}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      !attempted
                        ? "bg-border text-muted"
                        : correct
                        ? "bg-good/15 text-good"
                        : "bg-bad/15 text-bad"
                    }`}
                  >
                    {!attempted ? "Not attempted" : correct ? "Correct" : "Incorrect"}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{question.passage}</p>
                {attempted && !correct && (
                  <p className="mt-2 text-sm text-muted">
                    Your answer: <span className="text-ink">{r.given || "—"}</span>{" "}
                    · Correct:{" "}
                    <span className="text-good">
                      {question.type === "mcq"
                        ? question.options[question.answerIndex]
                        : question.answer}
                    </span>
                  </p>
                )}
                {!attempted && (
                  <p className="mt-2 text-sm text-muted italic">
                    You skipped this one — retry the level to see it again.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onRetry}
          className="w-full py-3 rounded-full bg-accent text-bg font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Practice again
        </button>
      </div>
    </div>
  );
}