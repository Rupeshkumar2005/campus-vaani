import { useEffect, useRef, useState } from "react";
import situationalQuestions from "../data/situationalQuestions";
import TimerRing from "../components/TimerRing";
import BackButton from "../components/BackButton";
import ConfirmModal from "../components/ConfirmModal";

const ANSWER_SECONDS = 30;
const OPTION_LETTERS = ["A", "B", "C", "D"];

export default function SituationalTest({ onFinish, onBack }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ANSWER_SECONDS);
  const [results, setResults] = useState([]);
  const timerRef = useRef(null);

  const q = situationalQuestions[index];
  const total = situationalQuestions.length;

  useEffect(() => {
    setSelected(null);
    setTimeLeft(ANSWER_SECONDS);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleNext();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function handleNext() {
    clearInterval(timerRef.current);
    const isCorrect = selected === q.answerIndex;
    const given = selected === null ? "" : q.options[selected];

    const updated = [...results, { id: q.id, correct: isCorrect, given }];
    setResults(updated);

    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      onFinish(updated);
    }
  }

  function handleSubmitEarly() {
    if (
      window.confirm(
        `Submit now? You've answered ${results.length}/${total} questions. The rest will show as skipped.`
      )
    ) {
      onFinish(results);
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-14">
      <div className="max-w-xl w-full">
        <BackButton
  label="Back to categories"
  onClick={() => setShowExitConfirm(true)}
/>

        <div className="flex justify-end mb-4">
          <button
           onClick={() => setShowSubmitConfirm(true)}
            className="text-xs font-semibold px-4 py-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-bg transition-colors"
          >
            Submit test now ({results.length}/{total} answered)
          </button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-muted text-xs font-mono">
            {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
          <TimerRing seconds={timeLeft} total={ANSWER_SECONDS} />
        </div>

        <div className="h-[3px] bg-surface rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500"
            style={{ width: `${(index / total) * 100}%` }}
          />
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 mb-8">
          <p className="text-sm leading-relaxed">{q.passage}</p>
        </div>

        <div className="flex flex-col gap-2">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`flex items-center gap-3 text-left px-4 py-3 rounded-lg border transition-colors ${
                selected === i
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-muted"
              }`}
            >
              <span
                className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                  selected === i ? "bg-accent text-bg" : "bg-border text-muted"
                }`}
              >
                {OPTION_LETTERS[i]}
              </span>
              <span className="text-sm">{opt}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="mt-8 w-full py-3 rounded-full bg-accent text-bg font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          {index + 1 === total ? "Finish test" : "Next question"}
        </button>
      </div>
      {showExitConfirm && (
  <ConfirmModal
    title="Exit this test?"
    message="Your progress will be lost."
    confirmLabel="Exit"
    onConfirm={onBack}
    onCancel={() => setShowExitConfirm(false)}
  />
)}

{showSubmitConfirm && (
  <ConfirmModal
    title="Submit now?"
    message={`You've answered ${results.length}/${total} questions. The rest will show as skipped.`}
    confirmLabel="Submit"
    onConfirm={() => onFinish(results)}
    onCancel={() => setShowSubmitConfirm(false)}
  />
)}
    </div>
  );
}