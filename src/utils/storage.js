const KEY = "campusvaani_attempts";

export function saveAttempt({ moduleLabel, level, score, total }) {
  const attempts = getAttempts();
  attempts.unshift({
    moduleLabel,
    level: level || null,
    score,
    total,
    date: new Date().toISOString(),
  });
  // keep only the last 10 attempts
  const trimmed = attempts.slice(0, 10);
  localStorage.setItem(KEY, JSON.stringify(trimmed));
}

export function getAttempts() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}