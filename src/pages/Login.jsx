import { useState } from "react";
import { login } from "../utils/api";
import Navbar from "../components/Navbar";

export default function Login({ onSuccess, onGoToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login({ email, password });
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
        <h1 className="text-3xl font-extrabold mb-2">Welcome back</h1>
        <p className="text-muted text-sm mb-8">Log in to continue your practice.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            className="px-4 py-3 rounded-lg bg-surface border border-border outline-none focus:border-accent text-sm"
          />

          {error && <p className="text-bad text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 rounded-full bg-accent text-bg font-semibold text-sm disabled:opacity-50"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="text-muted text-sm mt-6 text-center">
          Don't have an account?{" "}
          <button onClick={onGoToSignup} className="text-accent font-semibold">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}