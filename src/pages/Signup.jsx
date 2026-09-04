import { useState } from "react";
import { signup } from "../utils/api";
import Navbar from "../components/Navbar";

export default function Signup({ onSuccess, onGoToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await signup({ name, email, password, college });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="max-w-sm mx-auto px-6 py-16">
        <h1 className="text-3xl font-extrabold mb-2">Create your account</h1>
        <p className="text-muted text-sm mb-8">Free, forever. No hidden modules.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-3 rounded-lg bg-surface border border-border outline-none focus:border-accent text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 rounded-lg bg-surface border border-border outline-none focus:border-accent text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="px-4 py-3 rounded-lg bg-surface border border-border outline-none focus:border-accent text-sm"
          />
          <input
            type="text"
            placeholder="College name (optional)"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="px-4 py-3 rounded-lg bg-surface border border-border outline-none focus:border-accent text-sm"
          />

          {error && <p className="text-bad text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 rounded-full bg-accent text-bg font-semibold text-sm disabled:opacity-50"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="text-muted text-sm mt-6 text-center">
          Already have an account?{" "}
          <button onClick={onGoToLogin} className="text-accent font-semibold">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}