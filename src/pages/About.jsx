import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

export default function About({ user, onLogout, onGoToLogin, onGoToSignup, onGoHome, onBack }) {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar user={user} onLogout={onLogout} onGoToLogin={onGoToLogin} onGoToSignup={onGoToSignup} onGoHome={onGoHome} />
      <div className="max-w-2xl mx-auto px-6 py-14">
        <BackButton label="Back to home" onClick={onBack} />

        <h1 className="text-3xl font-extrabold mb-6">About CampusVaani</h1>

        <div className="flex flex-col gap-6 text-sm leading-relaxed text-muted">
          <p>
            CampusVaani is a free English communication test-prep platform built
            for students preparing for campus placements. Many popular test-prep
            tools lock their best features behind paid upgrades — CampusVaani
            exists so that students at any college, regardless of budget, can
            practice the listening, reading, writing, and speaking formats used
            in real placement tests.
          </p>

          <p>
            The platform currently offers a Listening Comprehension module with
            beginner, medium, and hard difficulty levels, using browser-based
            text-to-speech so practice audio is generated for free with no
            external costs. Reading, writing, and speaking modules are in
            active development.
          </p>

          <p>
            CampusVaani was built and is maintained independently. Feedback and
            suggestions are always welcome at{" "}
            <a href="mailto:rupeshku092@gmail.com" className="text-accent">
              rupeshku092@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}