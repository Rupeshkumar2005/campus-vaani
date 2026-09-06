import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LevelSelect from "./pages/LevelSelect";
import ListeningTest from "./pages/ListeningTest";
import ReadingTest from "./pages/ReadingTest";
import Results from "./pages/Results";
import readingQuestions from "./data/readingQuestions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";

function App() {
  const [screen, setScreen] = useState("home");
  const [user, setUser] = useState(null);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [resultsData, setResultsData] = useState(null);

  // Set up the initial history entry, and listen for back/forward
  // navigation (button, keyboard, or touchpad gesture) so it moves
  // between our screens instead of leaving the site entirely.
  useEffect(() => {
    window.history.replaceState({ screen: "home" }, "");

    function handlePopState(e) {
      setScreen(e.state?.screen || "home");
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Use this for any "forward" navigation — it updates the screen AND
  // records a browser history entry, so the back gesture has something
  // to go back to.
  function navigate(nextScreen) {
    setScreen(nextScreen);
    window.history.pushState({ screen: nextScreen }, "");
  }

  // Use this for any "back" action (our own Back buttons) — it lets the
  // browser's real history take us back, which then triggers popstate
  // above and updates the screen. Keeps gesture-back and button-back
  // consistent with each other.
  function goBack() {
    window.history.back();
  }

  function handleAuthSuccess(userData) {
    setUser(userData);
    navigate("home");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("home");
  }

  if (screen === "signup") {
    return (
      <Signup
        onSuccess={handleAuthSuccess}
        onGoToLogin={() => navigate("login")}
      />
    );
  }

  if (screen === "login") {
    return (
      <Login
        onSuccess={handleAuthSuccess}
        onGoToSignup={() => navigate("signup")}
      />
    );
  }
  if (screen === "privacy") {
  return (
    <PrivacyPolicy
      user={user}
      onLogout={handleLogout}
      onGoToLogin={() => navigate("login")}
      onGoToSignup={() => navigate("signup")}
      onBack={goBack}
    />
  );
}

if (screen === "about") {
  return (
    <About
      user={user}
      onLogout={handleLogout}
      onGoToLogin={() => navigate("login")}
      onGoToSignup={() => navigate("signup")}
      onBack={goBack}
    />
  );
}

  if (screen === "listening-level") {
    return (
      <LevelSelect
        moduleType="listening"
        moduleLabel="Listening Comprehension"
        onSelect={(level, questions) => {
          setSelectedLevel(level);
          setFetchedQuestions(questions);
          navigate("listening-test");
        }}
        onBack={goBack}
      />
    );
  }

  if (screen === "listening-test") {
    return (
      <ListeningTest
        level={selectedLevel}
        questions={fetchedQuestions}
        onFinish={(r) => {
          setResultsData({
            moduleKey: "listening-level",
            moduleLabel: "Listening Comprehension",
            moduleType: "listening",
            questions: fetchedQuestions.filter((q) => q.level === selectedLevel),
            level: selectedLevel,
            results: r,
          });
          navigate("results");
        }}
        onBack={goBack}
      />
    );
  }

  if (screen === "reading") {
    return (
      <ReadingTest
        onFinish={(r) => {
          setResultsData({
            moduleKey: "reading",
            moduleLabel: "Reading Comprehension",
            moduleType: "reading",
            questions: readingQuestions,
            level: null,
            results: r,
          });
          navigate("results");
        }}
        onBack={goBack}
      />
    );
  }

  if (screen === "results") {
    return (
      <Results
        results={resultsData.results}
        questions={resultsData.questions}
        moduleLabel={resultsData.moduleLabel}
        moduleType={resultsData.moduleType}
        level={resultsData.level}
        onRetry={() =>
          navigate(
            resultsData.moduleKey === "listening-level" ? "listening-level" : resultsData.moduleKey
          )
        }
      />
    );
  }

  return (
    <Home
      user={user}
      onLogout={handleLogout}
      onGoToLogin={() => navigate("login")}
      onGoToSignup={() => navigate("signup")}
       onGoToPrivacy={() => navigate("privacy")}
  onGoToAbout={() => navigate("about")}
      onStart={(module) => {
        if (!user) {
          navigate("login");
          return;
        }
        if (module === "listening") {
          navigate("listening-level");
        } else {
          navigate(module);
        }
      }}
    />
  );
}

export default App;