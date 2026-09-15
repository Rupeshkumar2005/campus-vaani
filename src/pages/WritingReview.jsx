import writingQuestions from "../data/writingQuestions";
import { evaluateWriting } from "../utils/writingEvaluator";
import BackButton from "../components/BackButton";

export default function WritingReview({ responses, onBack }) {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-14">
      <div className="max-w-xl w-full">
        <BackButton label="Back to home" onClick={onBack} />

        <p className="text-muted text-sm mb-2">Writing Practice · Review</p>
        <h1 className="text-3xl font-extrabold mb-10">
          Compare your answers
        </h1>

        <div className="flex flex-col gap-6">
          {responses.map((r, i) => {
            const q = writingQuestions.find((item) => item.id === r.id);
            const { score, total, checks } = evaluateWriting(r.given, q);

            return (
              <div key={r.id} className="border border-border rounded-xl p-5 bg-surface">
                <p className="text-muted text-xs font-semibold mb-3 uppercase tracking-wide">
                  Prompt {i + 1}
                </p>
                <p className="text-sm mb-4">{q.prompt}</p>

                <p className="text-xs text-muted font-semibold mb-1">Your response</p>
                <p className="text-sm mb-4 whitespace-pre-wrap bg-bg border border-border rounded-lg p-3">
                  {r.given || <span className="text-muted italic">Skipped</span>}
                </p>

               <p className="text-xs text-accent font-semibold mb-2">
  Quick check — {score}/{total} passed
</p>
<div className="flex flex-col gap-1.5 mb-4">
  {checks.map((f, fi) => (
                    <div key={fi} className="text-sm">
                      <span className={f.passed ? "text-good" : "text-bad"}>
                        {f.passed ? "✓" : "✗"}
                      </span>{" "}
                      <span className={f.passed ? "text-ink" : "text-muted"}>{f.label}</span>
                      {f.tip && (
                        <p className="text-muted text-xs ml-4 mt-0.5">{f.tip}</p>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-good font-semibold mb-1">Model answer</p>
                <p className="text-sm whitespace-pre-wrap bg-good/5 border border-good/30 rounded-lg p-3">
                  {q.modelAnswer}
                </p>
              </div>
            );
          })}
        </div>

        <button
          onClick={onBack}
          className="mt-10 w-full py-3 rounded-full bg-accent text-bg font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}