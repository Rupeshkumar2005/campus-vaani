import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LevelSelect from "./pages/LevelSelect";
import ListeningTest from "./pages/ListeningTest";
import ReadingTest from "./pages/ReadingTest";
import GrammarTest from "./pages/GrammarTest";
import WritingTypeSelect from "./pages/WritingTypeSelect";
import WritingTest from "./pages/WritingTest";
import WritingReview from "./pages/WritingReview";
import SituationalTest from "./pages/SituationalTest";
import SpeakingTest from "./pages/SpeakingTest";
import Results from "./pages/Results";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";
import readingQuestions from "./data/readingQuestions";
import situationalQuestions from "./data/situationalQuestions";

function App() {
  const [screen, setScreen] = useState("home");
  const [user, setUser] = useState(null);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedWritingType, setSelectedWritingType] = useState(null);
  const [selectedWritingLength, setSelectedWritingLength] = useState(null);
  const [resultsData, setResultsData] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    window.history.replaceState({ screen: "home" }, "");

    function handlePopState(e) {
      setScreen(e.state?.screen || "home");
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(nextScreen) {
    setScreen(nextScreen);
    window.history.pushState({ screen: nextScreen }, "");
  }

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
      onGoHome={() => navigate("home")}
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
      onGoHome={() => navigate("home")}
      onBack={goBack}
    />
  );
}

  if (screen === "listening-level") {
    return (
      <LevelSelect
        moduleType="listening"
        moduleLabel="Workplace Listening Comprehension"
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
            moduleLabel: "Workplace Listening Comprehension",
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

  if (screen === "grammar-level") {
    return (
      <LevelSelect
        moduleType="grammar"
        moduleLabel="Grammar & Sentence Correction"
        onSelect={(level, questions) => {
          setSelectedLevel(level);
          setFetchedQuestions(questions);
          navigate("grammar-test");
        }}
        onBack={goBack}
      />
    );
  }

  if (screen === "grammar-test") {
    return (
      <GrammarTest
        level={selectedLevel}
        onFinish={(r) => {
          setResultsData({
            moduleKey: "grammar-level",
            moduleLabel: "Grammar & Sentence Correction",
            moduleType: "grammar",
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

  if (screen === "speaking-level") {
    return (
      <LevelSelect
        moduleType="speaking"
        moduleLabel="Spoken Communication Simulation"
        onSelect={(level, questions) => {
          setSelectedLevel(level);
          setFetchedQuestions(questions);
          navigate("speaking-test");
        }}
        onBack={goBack}
      />
    );
  }

  if (screen === "speaking-test") {
    return (
      <SpeakingTest
        level={selectedLevel}
        onFinish={(r) => {
          setResultsData({ speakingResults: r });
          navigate("speaking-review");
        }}
        onBack={() => navigate("speaking-level")}
      />
    );
  }

  if (screen === "speaking-review") {
    const avgAccuracy = Math.round(
      resultsData.speakingResults.reduce((sum, r) => sum + r.accuracy, 0) /
        resultsData.speakingResults.length
    );
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-14">
        <div className="max-w-xl w-full">
          <p className="text-muted text-sm mb-2 text-center">
            Spoken Communication Simulation · Result
          </p>
          <h1 className="text-5xl font-extrabold mb-10 text-center">
            {avgAccuracy}% avg accuracy
          </h1>
          <button
            onClick={() => navigate("home")}
            className="w-full py-3 rounded-full bg-accent text-bg font-semibold text-sm"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  if (screen === "writing-type") {
    return (
      <WritingTypeSelect
        onSelect={(type, length) => {
          if (type === "situational") {
            navigate("situational-test");
          } else {
            setSelectedWritingType(type);
            setSelectedWritingLength(length);
            navigate("writing");
          }
        }}
        onBack={goBack}
      />
    );
  }

  if (screen === "situational-test") {
    return (
      <SituationalTest
        onFinish={(r) => {
          setResultsData({
            moduleKey: "writing-type",
            moduleLabel: "Situational Response (Chat/Email)",
            moduleType: "situational",
            questions: situationalQuestions,
            level: null,
            results: r,
          });
          navigate("results");
        }}
        onBack={() => navigate("writing-type")}
      />
    );
  }

  if (screen === "writing") {
    return (
      <WritingTest
        writingType={selectedWritingType}
        lengthCategory={selectedWritingLength}
        onFinish={(responses) => {
          setResultsData({ responses });
          navigate("writing-review");
        }}
        onBack={() => navigate("writing-type")}
      />
    );
  }

  if (screen === "writing-review") {
    return (
      <WritingReview
        responses={resultsData.responses}
        onBack={() => navigate("home")}
      />
    );
  }

  if (screen === "reading") {
    return (
      <ReadingTest
        onFinish={(r) => {
          setResultsData({
            moduleKey: "reading",
            moduleLabel: "Workplace Reading Comprehension",
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
        onRetry={() => navigate(resultsData.moduleKey)}
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
    onGoHome={() => navigate("home")}
    onStart={(module) => {
        if (!user) {
          navigate("login");
          return;
        }
        if (module === "listening") {
          navigate("listening-level");
        } else if (module === "grammar") {
          navigate("grammar-level");
        } else if (module === "writing") {
          navigate("writing-type");
        } else if (module === "speaking") {
          navigate("speaking-level");
        } else {
          navigate(module);
        }
      }}
    />
  );
}

export default App;