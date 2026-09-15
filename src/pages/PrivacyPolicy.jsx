import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

export default function PrivacyPolicy({ user, onLogout, onGoToLogin, onGoToSignup, onGoHome, onBack }) {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar user={user} onLogout={onLogout} onGoToLogin={onGoToLogin} onGoToSignup={onGoToSignup} onGoHome={onGoHome} />
      <div className="max-w-2xl mx-auto px-6 py-14">
        <BackButton label="Back to home" onClick={onBack} />

        <h1 className="text-3xl font-extrabold mb-6">Privacy Policy</h1>
        <p className="text-muted text-sm mb-10">Last updated: September 2026</p>

        <div className="flex flex-col gap-6 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="text-ink font-semibold text-base mb-2">What we collect</h2>
            <p>
              When you create an account, we collect your name, email address, and
              optionally your college name. When you practice, we store your test
              scores and the level/module you attempted, linked to your account.
            </p>
          </section>

          <section>
            <h2 className="text-ink font-semibold text-base mb-2">How we use it</h2>
            <p>
              Your information is used solely to run your account (login,
              tracking your practice history) and to improve CampusVaani. We do
              not sell or share your personal data with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-ink font-semibold text-base mb-2">Password security</h2>
            <p>
              Passwords are stored using one-way hashing (bcrypt) and are never
              stored or visible in plain text, including to us.
            </p>
          </section>

          <section>
            <h2 className="text-ink font-semibold text-base mb-2">Cookies and advertising</h2>
            <p>
              CampusVaani may display advertisements through Google AdSense.
              Google may use cookies to serve ads based on your visits to this
              and other websites. You can opt out of personalized advertising by
              visiting Google's Ads Settings.
            </p>
          </section>

          <section>
            <h2 className="text-ink font-semibold text-base mb-2">Contact</h2>
            <p>
              For questions about this policy or your data, reach out at{" "}
              <a href="mailto:rupeshku092@gmail.com" className="text-accent">
                rupeshku092@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}