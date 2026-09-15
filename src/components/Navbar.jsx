import LogoMark from "./LogoMark";

export default function Navbar({ user, onLogout, onGoToLogin, onGoToSignup, onGoHome }) {
  return (
    <nav className="border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={onGoHome} className="flex items-center gap-2.5">
  <LogoMark />
  <p className="font-extrabold text-lg tracking-tight">
    Campus<span className="text-accent">Vaani</span>
  </p>
</button>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-muted text-sm">Hi, {user.name.split(" ")[0]}</span>
            <button
              onClick={onLogout}
              className="text-muted text-sm hover:text-ink transition-colors"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={onGoToLogin}
              className="text-muted text-sm hover:text-ink transition-colors"
            >
              Log in
            </button>
            <button
              onClick={onGoToSignup}
              className="text-bg bg-accent text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}