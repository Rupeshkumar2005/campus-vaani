import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { HeadphoneIcon, BookIcon, PenIcon, MicIcon } from "../components/Icons";
import { getAttempts } from "../utils/api";

const CATEGORIES = [
  {
    name: "Listening",
    Icon: HeadphoneIcon,
    types: ["Multiple Choice", "Fill in the Blanks"],
    active: true,
  },
  {
    name: "Reading",
    Icon: BookIcon,
    types: ["Multiple Choice", "Fill in the Blanks"],
    active: true,
  },
  {
    name: "Writing",
    Icon: PenIcon,
    types: ["Summarize Text", "Write Essay"],
    active: false,
  },
  {
    name: "Speaking",
    Icon: MicIcon,
    types: ["Read Aloud", "Repeat Sentence"],
    active: false,
  },
];

// backend only stores moduleType (e.g. "listening"), not a friendly label —
// map it here for display
const MODULE_LABELS = {
  listening: "Listening Comprehension",
  "listening-level": "Listening Comprehension",
  reading: "Reading Comprehension",
  writing: "Writing",
  speaking: "Speaking",
};

export default function Home({ user, onLogout, onGoToLogin, onGoToSignup, onStart, onGoToPrivacy, onGoToAbout }) {
  const [attempts, setAttempts] = useState([]);
  const [loadingAttempts, setLoadingAttempts] = useState(false);

  useEffect(() => {
    // only logged-in users have attempts saved on the backend
    if (!user) {
      setAttempts([]);
      return;
    }
    setLoadingAttempts(true);
    getAttempts()
      .then((data) => setAttempts(data))
      .catch((err) => {
        console.error("Failed to load recent activity:", err.message);
        setAttempts([]);
      })
      .finally(() => setLoadingAttempts(false));
  }, [user]);

  return (
    <div className="min-h-screen bg-bg">
      <Navbar user={user} onLogout={onLogout} onGoToLogin={onGoToLogin} onGoToSignup={onGoToSignup} />
      <div className="max-w-5xl mx-auto px-6 py-20 relative">
        <div className="hidden md:flex items-end gap-1 absolute top-16 right-6 opacity-20">
          {[10, 22, 14, 30, 18, 26, 12].map((h, i) => (
            <span
              key={i}
              className="w-1.5 bg-accent rounded-full"
              style={{ height: `${h * 2}px` }}
            />
          ))}
        </div>

        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
          Placement Season 2026
        </p>
        <h1 className="text-5xl font-extrabold leading-tight mb-5 max-w-2xl">
          Master your English communication test.
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-xl mb-14">
          Listening, reading, writing, and speaking practice — built for
          campus placements. No subscriptions, no locked modules.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.name}
              className={`relative border border-border rounded-lg p-5 ${
                cat.active ? "bg-surface" : "opacity-40"
              }`}
            >
              <span className="absolute top-4 right-5 text-muted text-xs font-mono">
                0{i + 1}
              </span>
              <div className={cat.active ? "text-accent mb-4" : "text-muted mb-4"}>
                <cat.Icon />
              </div>
              <p className="font-semibold text-lg mb-3">{cat.name}</p>
              <ul className="text-muted text-sm space-y-1 mb-4">
                {cat.types.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              {cat.active ? (
                <button
                  onClick={() => onStart(cat.name.toLowerCase())}
                  className="text-accent text-sm font-semibold"
                >
                  Start practice →
                </button>
              ) : (
                <p className="text-xs text-muted">Coming soon</p>
              )}
            </div>
          ))}
        </div>

        {user && (loadingAttempts || attempts.length > 0) && (
          <div className="mt-16">
            <p className="text-muted text-xs font-semibold tracking-widest uppercase mb-4">
              Recent Activity
            </p>
            {loadingAttempts ? (
              <p className="text-muted text-sm">Loading…</p>
            ) : (
              <div className="flex flex-col gap-2">
                {/* backend already only ever keeps the latest 3, but slice defensively anyway */}
                {attempts.slice(0, 3).map((a) => (
                  <div
                    key={a._id}
                    className="flex items-center justify-between border border-border rounded-lg px-4 py-3 text-sm"
                  >
                    <span>
                      {MODULE_LABELS[a.moduleType] || a.moduleType}
                      {a.level ? ` · ${a.level}` : ""}
                    </span>
                    <span className="text-accent font-semibold">
                      {a.score}/{a.total}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <footer className="mt-20 pt-8 border-t border-border flex gap-6 text-muted text-xs">
  <button onClick={onGoToAbout} className="hover:text-ink transition-colors">
    About
  </button>
  <button onClick={onGoToPrivacy} className="hover:text-ink transition-colors">
    Privacy Policy
  </button>
</footer>
    </div>
  );
}