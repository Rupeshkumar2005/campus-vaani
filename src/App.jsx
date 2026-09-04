import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LevelSelect from "./pages/LevelSelect";
import ListeningTest from "./pages/ListeningTest";
import ReadingTest from "./pages/ReadingTest";
import Results from "./pages/Results";
import readingQuestions from "./data/readingQuestions";

function App() {
  const [screen, setScreen] = useState("home");
  const [user, setUser] = useState(null);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [resultsData, setResultsData] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function goHome() {
    setScreen("home");
  }

  function handleAuthSuccess(userData) {
    setUser(userData);
    setScreen("home");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setScreen("home");
  }

  if (screen === "signup") {
    return (
      <Signup
        onSuccess={handleAuthSuccess}
        onGoToLogin={() => setScreen("login")}
      />
    );
  }

  if (screen === "login") {
    return (
      <Login
        onSuccess={handleAuthSuccess}
        onGoToSignup={() => setScreen("signup")}
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
          setScreen("listening-test");
        }}
        onBack={goHome}
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
          setScreen("results");
        }}
        onBack={() => setScreen("listening-level")}
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
          setScreen("results");
        }}
        onBack={goHome}
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
          setScreen(
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
      onGoToLogin={() => setScreen("login")}
      onGoToSignup={() => setScreen("signup")}
      onStart={(module) => {
        if (!user) {
          setScreen("login");
          return;
        }
        if (module === "listening") {
          setScreen("listening-level");
        } else {
          setScreen(module);
        }
      }}
    />
  );
}

export default App;