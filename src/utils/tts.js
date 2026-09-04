// Wrapper around the browser's SpeechSynthesis API — free, no API key needed.

let voicesCache = [];

function loadVoices() {
  return new Promise((resolve) => {
    const existing = window.speechSynthesis.getVoices();
    if (existing.length) {
      voicesCache = existing;
      resolve(existing);
      return;
    }
    window.speechSynthesis.onvoiceschanged = () => {
      voicesCache = window.speechSynthesis.getVoices();
      resolve(voicesCache);
    };
  });
}

function pickEnglishVoice(voices) {
  return (
    voices.find((v) => v.lang === "en-US") ||
    voices.find((v) => v.lang?.startsWith("en")) ||
    voices[0]
  );
}

export function isSpeechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export async function speak(text, { rate = 1, onEnd } = {}) {
  if (!isSpeechSupported()) {
    onEnd && onEnd();
    return;
  }
  window.speechSynthesis.cancel();

  const voices = voicesCache.length ? voicesCache : await loadVoices();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = pickEnglishVoice(voices);
  utterance.rate = rate;
  utterance.onend = () => onEnd && onEnd();

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (isSpeechSupported()) window.speechSynthesis.cancel();
}