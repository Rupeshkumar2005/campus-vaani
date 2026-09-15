import { useEffect, useRef, useState } from "react";
import speakingQuestions from "../data/speakingQuestions";
import { LEVEL_CONFIG, LEVEL_STYLES } from "../data/levelConfig";
import { isRecognitionSupported, createRecognizer, compareTranscript } from "../utils/speechRecognition";
import Waveform from "../components/Waveform";
import TimerRing from "../components/TimerRing";
import BackButton from "../components/BackButton";
import ConfirmModal from "../components/ConfirmModal";

const PREP_SECONDS = 20;

export default function SpeakingTest({ level, onFinish, onBack }) {
  const [index, setIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [transcript, setTranscript] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [timeLeft, setTimeLeft] = useState(PREP_SECONDS);
  const [results, setResults] = useState([]);
  const recognizerRef = useRef(null);
  const timerRef = useRef(null);

  const filteredQuestions = speakingQuestions.filter((item) => item.level === level);
  const q = filteredQuestions[index];
  const total = filteredQuestions.length;

  useEffect(() => {
    setTranscript(null);
    setComparison(null);
    setRecording(false);
    setTimeLeft(PREP_SECONDS);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
      if (recognizerRef.current) recognizerRef.current.stop();
    };
  }, [index]);

  function startRecording() {
    if (!isRecognitionSupported()) return;
    clearInterval(timerRef.current);
    setTranscript(null);
    setComparison(null);
    setRecording(true);

    const recognizer = createRecognizer({
      onResult: (text) => {
        setTranscript(text);
        setComparison(compareTranscript(q.passage, text));
      },
      onEnd: () => setRecording(false),
      onError: () => setRecording(false),
    });

    if (!recognizer) {
      setRecording(false);
      return;
    }

    recognizerRef.current = recognizer;
    recognizer.start();
  }

  function recordResult() {
    return { id: q.id, accuracy: comparison ? comparison.accuracy : 0, transcript: transcript || "" };
  }

  function handleNext() {
    const updated = [...results, recordResult()];
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
        `Submit now? You've completed ${results.length}/${total} passages. The rest will show as skipped.`
      )
    ) {
      onFinish(results);
    }
  }

  if (!isRecognitionSupported()) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-14">
        <div className="max-w-xl w-full">
          <BackButton label="Back to levels" onClick={onBack} />
          <p className="text-bad text-sm mt-8">
            Your browser doesn't support speech recognition. Please try Chrome or Edge on desktop.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-14">
      <div className="max-w-xl w-full">
       <BackButton
  label="Back to levels"
  onClick={() => setShowExitConfirm(true)}
/>

        <div className="flex justify-end mb-4">
          <button
           onClick={() => setShowSubmitConfirm(true)}
            className="text-xs font-semibold px-4 py-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-bg transition-colors"
          >
            Submit test now ({results.length}/{total} completed)
          </button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-muted text-xs font-mono">
              {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${LEVEL_STYLES[q.level]}`}>
              {LEVEL_CONFIG[q.level]?.label}
            </span>
          </div>
          {!comparison && <TimerRing seconds={timeLeft} total={PREP_SECONDS} />}
        </div>

        <div className="h-[3px] bg-surface rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500"
            style={{ width: `${(index / total) * 100}%` }}
          />
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 mb-6">
          <p className="text-muted text-xs font-semibold mb-3 uppercase tracking-wide">
            Read this aloud
          </p>
          <p className="text-base leading-relaxed">{q.passage}</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-8 flex flex-col items-center mb-6">
          <Waveform active={recording} />
          <button
            onClick={startRecording}
            disabled={recording}
            className="mt-6 px-7 py-3 rounded-full bg-accent text-bg font-semibold text-sm disabled:opacity-50"
          >
            {recording ? "🎙️ Listening — speak now" : "🎤 Start speaking"}
          </button>
          {recording && (
            <p className="text-muted text-xs mt-3">Recording... it'll stop automatically when you pause</p>
          )}
        </div>

        {comparison && (
          <div className="bg-surface border border-border rounded-xl p-6 mb-6">
            <p className="text-sm font-semibold mb-3">
              Match accuracy: <span className="text-accent">{comparison.accuracy}%</span>
            </p>
            <p className="text-muted text-xs mb-1">What you said:</p>
            <p className="text-sm mb-4 italic">"{transcript}"</p>
            {comparison.missed.length > 0 && (
              <>
                <p className="text-muted text-xs mb-1">Words you may have missed:</p>
                <p className="text-sm text-bad">{comparison.missed.join(", ")}</p>
              </>
            )}
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={!comparison}
          className="w-full py-3 rounded-full bg-accent text-bg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {index + 1 === total ? "Finish test" : "Next passage"}
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
    message={`You've completed ${results.length}/${total} passages. The rest will show as skipped.`}
    confirmLabel="Submit"
    onConfirm={() => onFinish(results)}
    onCancel={() => setShowSubmitConfirm(false)}
  />
)}
    </div>
  );
}