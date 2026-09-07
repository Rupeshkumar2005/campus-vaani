import { useEffect, useRef, useState } from "react";
import { LEVEL_CONFIG, LEVEL_STYLES } from "../data/levelConfig";
import { speak, stopSpeaking, isSpeechSupported } from "../utils/tts";
import Waveform from "../components/Waveform";
import TimerRing from "../components/TimerRing";
import BackButton from "../components/BackButton";

const ANSWER_SECONDS = 30;
const MAX_REPLAYS = 2;
const OPTION_LETTERS = ["A", "B", "C", "D"];

export default function ListeningTest({ level, questions, onFinish, onBack }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [replaysUsed, setReplaysUsed] = useState(0);
  const [selected, setSelected] = useState(null);
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(ANSWER_SECONDS);
  const [results, setResults] = useState([]);
  const timerRef = useRef(null);

  const filteredQuestions = questions.filter((item) => item.level === level);
  const q = filteredQuestions[index];
  const total = filteredQuestions.length;

  useEffect(() => {
    setPlaying(false);
    setHasPlayedOnce(false);
    setReplaysUsed(0);
    setSelected(null);
    setTyped("");
    setTimeLeft(ANSWER_SECONDS);
    clearInterval(timerRef.current);
    return () => stopSpeaking();
  }, [index]);

  useEffect(() => {
    if (!hasPlayedOnce) return;
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
  }, [hasPlayedOnce]);

  function playAudio() {
    if (playing) return;
    if (hasPlayedOnce) setReplaysUsed((r) => r + 1);
    setPlaying(true);
    speak(q.passage, {
      rate: LEVEL_CONFIG[q.level]?.rate ?? 1,
      onEnd: () => {
        setPlaying(false);
        setHasPlayedOnce(true);
      },
    });
  }

  function handleNext() {
    stopSpeaking();
    let isCorrect = false;
    let given = "";

    if (q.type === "mcq") {
      given = selected === null ? "" : q.options[selected];
      isCorrect = selected === q.answerIndex;
    } else {
      given = typed.trim();
      isCorrect = given.toLowerCase() === q.answer.toLowerCase();
    }

        const updated = [...results, { id: q._id ?? q.id, correct: isCorrect, given }];
    setResults(updated);

    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      onFinish(updated);
    }
  }

  // Lets the user end the test at any point. Whatever's in `results` so far
  // (i.e. only the questions actually answered) is passed on — the rest are
  // left out, so Results.jsx can correctly mark them "Not attempted" instead
  // of silently disappearing.
  function handleSubmitEarly() {
    stopSpeaking();
    if (
      window.confirm(
        `Submit now? You've answered ${results.length}/${total} questions. The rest will show as skipped.`
      )
    ) {
      onFinish(results);
    }
  }

  const replaysLeft = MAX_REPLAYS - replaysUsed;
  const canReplay = replaysUsed < MAX_REPLAYS && !playing;

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-14">
      <div className="max-w-xl w-full">
        {/* Top bar */}
        <BackButton
          label="Back to levels"
          onClick={() => {
            if (window.confirm("Exit this test? Your progress will be lost.")) {
              stopSpeaking();
              onBack();
            }
          }}
        />

        {/* Early-submit control */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSubmitEarly}
            className="text-xs font-semibold px-4 py-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-bg transition-colors"
          >
            Submit test now ({results.length}/{total} answered)
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
          {hasPlayedOnce && <TimerRing seconds={timeLeft} total={ANSWER_SECONDS} />}
        </div>

        {/* Progress bar */}
        <div className="h-[3px] bg-surface rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500"
            style={{ width: `${(index / total) * 100}%` }}
          />
        </div>

        {!isSpeechSupported() && (
          <p className="text-bad text-sm mb-4">
            Your browser doesn't support spoken audio. Try Chrome or Edge.
          </p>
        )}

        {/* Audio card */}
        <div className="bg-surface border border-border rounded-xl p-8 flex flex-col items-center mb-8">
          <Waveform active={playing} />
          <button
            onClick={playAudio}
            disabled={playing || (!canReplay && hasPlayedOnce)}
            className="mt-6 px-7 py-3 rounded-full bg-accent text-bg font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
          >
            {playing ? "Playing…" : hasPlayedOnce ? "Replay audio" : "▶ Play audio"}
          </button>
          {hasPlayedOnce && (
            <div className="flex items-center gap-1.5 mt-4">
              {Array.from({ length: MAX_REPLAYS }).map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i < MAX_REPLAYS - replaysLeft ? "bg-muted" : "bg-accent"
                  }`}
                />
              ))}
              <span className="text-muted text-xs ml-1.5">{replaysLeft} replays left</span>
            </div>
          )}
        </div>

        {/* Question */}
        {hasPlayedOnce && (
          <div>
            {q.type === "mcq" ? (
              <div>
                <p className="font-semibold mb-4">{q.question}</p>
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
              </div>
            ) : (
              <div>
                <p className="font-semibold mb-4">Fill in the missing word</p>
                <p className="text-muted mb-4 leading-relaxed">{q.blankPassage}</p>
                <input
                  autoFocus
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                  placeholder="Type the missing word"
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-border outline-none focus:border-accent text-sm"
                />
              </div>
            )}

            <button
              onClick={handleNext}
              className="mt-8 w-full py-3 rounded-full bg-accent text-bg font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              {index + 1 === total ? "Finish test" : "Next question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}