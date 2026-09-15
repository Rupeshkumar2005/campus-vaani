import { useState } from "react";
import writingQuestions from "../data/writingQuestions";
import BackButton from "../components/BackButton";
import ConfirmModal from "../components/ConfirmModal";

const TYPE_LABELS = {
  business: "Business Communication Writing",
  situational: "Situational Response (Chat/Email)",
};

export default function WritingTest({ writingType, lengthCategory, onFinish, onBack }) {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [showExitConfirm, setShowExitConfirm] = useState(false);
const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [responses, setResponses] = useState([]);

  const filteredQuestions = writingQuestions.filter(
  (item) =>
    item.type === writingType &&
    (writingType !== "business" || item.lengthCategory === lengthCategory)
);
const q = filteredQuestions[index];
const total = filteredQuestions.length;
  const wordCount = typed.trim() ? typed.trim().split(/\s+/).length : 0;

  function handleNext() {
    const updated = [...responses, { id: q.id, given: typed.trim() }];
    setResponses(updated);
    setTyped("");

    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      onFinish(updated);
    }
  }
  function handleSubmitEarly() {
  if (
    window.confirm(
      `Submit now? You've completed ${responses.length}/${total} prompts. The rest will show as skipped.`
    )
  ) {
    onFinish(responses);
  }
}

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-14">
      <div className="max-w-xl w-full">
        <BackButton
  label="Back to home"
  onClick={() => setShowExitConfirm(true)}
/>
        <div className="flex justify-end mb-4">
  <button
    onClick={() => setShowSubmitConfirm(true)}
    className="text-xs font-semibold px-4 py-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-bg transition-colors"
  >
    Submit test now ({responses.length}/{total} completed)
  </button>
</div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-muted text-xs font-mono">
            {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/15 text-accent">
            {TYPE_LABELS[q.type]}
          </span>
        </div>

        <div className="h-[3px] bg-surface rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500"
            style={{ width: `${(index / total) * 100}%` }}
          />
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 mb-6">
          <p className="text-sm leading-relaxed mb-2">{q.prompt}</p>
          <p className="text-muted text-xs">Suggested length: {q.wordLimit}</p>
        </div>

        <textarea
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          placeholder="Write your response here..."
          rows={8}
          className="w-full px-4 py-3 rounded-lg bg-surface border border-border outline-none focus:border-accent text-sm resize-none"
        />
        <p className="text-muted text-xs mt-2 text-right">{wordCount} words</p>

        <button
          onClick={handleNext}
          className="mt-6 w-full py-3 rounded-full bg-accent text-bg font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          {index + 1 === total ? "Finish & review" : "Next prompt"}
        </button>
      </div>
      {showExitConfirm && (
  <ConfirmModal
    title="Exit this practice?"
    message="Your progress will be lost."
    confirmLabel="Exit"
    onConfirm={onBack}
    onCancel={() => setShowExitConfirm(false)}
  />
)}

{showSubmitConfirm && (
  <ConfirmModal
    title="Submit now?"
    message={`You've completed ${responses.length}/${total} prompts. The rest will show as skipped.`}
    confirmLabel="Submit"
    onConfirm={() => onFinish(responses)}
    onCancel={() => setShowSubmitConfirm(false)}
  />
)}
    </div>
  );
}