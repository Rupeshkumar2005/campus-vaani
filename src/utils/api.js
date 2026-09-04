const API_URL = import.meta.env.VITE_API_URL;

export async function signup({ name, email, password, college }) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, college }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Signup failed");
  return data;
}

export async function login({ email, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function saveAttempt({ moduleType, level, score, total }) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/attempts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ moduleType, level, score, total }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to save attempt");
  return data;
}

export async function getAttempts() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/attempts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch attempts");
  return data;
}
export async function getQuestions(moduleType) {
  const res = await fetch(`${API_URL}/questions?moduleType=${moduleType}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch questions");
  return data;
}