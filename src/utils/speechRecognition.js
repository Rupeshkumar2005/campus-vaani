// Wrapper around the browser's SpeechRecognition API — free speech-to-text,
// no external API key. Chrome/Edge have the best support for this.

export function isRecognitionSupported() {
  return typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function createRecognizer({ onResult, onEnd, onError }) {
  const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognitionClass) return null;

  const recognition = new SpeechRecognitionClass();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };
  recognition.onend = () => onEnd && onEnd();
  recognition.onerror = (event) => onError && onError(event.error);

  return recognition;
}

// Compares the spoken transcript against the target passage and returns a
// word-match percentage plus which target words were missed.
export function compareTranscript(target, spoken) {
  const clean = (str) =>
    str
      .toLowerCase()
      .replace(/[.,!?;:]/g, "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  const targetWords = clean(target);
  const spokenWords = new Set(clean(spoken));

  const matched = targetWords.filter((w) => spokenWords.has(w));
  const missed = targetWords.filter((w) => !spokenWords.has(w));
  const accuracy = targetWords.length ? Math.round((matched.length / targetWords.length) * 100) : 0;

  return { accuracy, matched, missed, targetWords };
}