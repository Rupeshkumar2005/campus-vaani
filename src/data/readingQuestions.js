// Reading Comprehension question bank.
// level: "beginner" | "medium" | "hard"
// type: "mcq" | "fill-blank"

const readingQuestions = [
  {
    id: "R01",
    level: "beginner",
    type: "mcq",
    passage:
      "Good time management starts with prioritizing tasks. Employees who list their most important work first tend to finish it before distractions take over the day.",
    question: "What helps employees finish important work, according to the passage?",
    options: [
      "Starting with the least important tasks",
      "Prioritizing and listing important tasks first",
      "Working without any plan",
      "Avoiding all distractions completely",
    ],
    answerIndex: 1,
  },
  {
    id: "R02",
    level: "medium",
    type: "fill-blank",
    passage:
      "Clear written communication reduces the number of follow-up questions a manager needs to ask, which saves everyone valuable time during a busy week.",
    blankPassage:
      "Clear written communication reduces the number of follow-up questions a manager needs to ask, which saves everyone valuable ____ during a busy week.",
    answer: "time",
  },
  {
    id: "R03",
    level: "hard",
    type: "mcq",
    passage:
      "Organizations that invest in employee upskilling often see lower turnover, since employees are more likely to stay where they feel their long-term growth is genuinely supported.",
    question: "Why might upskilling reduce employee turnover, per the passage?",
    options: [
      "Employees are paid significantly more",
      "Employees feel their long-term growth is supported",
      "Employees are promoted immediately",
      "Employees work fewer hours",
    ],
    answerIndex: 1,
  },
  {
    id: "R04",
    level: "beginner",
    type: "fill-blank",
    passage:
      "The new hire completed the onboarding checklist within her first week at the company.",
    blankPassage:
      "The new hire completed the onboarding checklist within her first ____ at the company.",
    answer: "week",
  },
  {
    id: "R05",
    level: "medium",
    type: "mcq",
    passage:
      "Team leads who hold brief daily check-ins tend to catch small problems before they grow into larger delays for the whole project.",
    question: "What is the benefit of daily check-ins, according to the passage?",
    options: [
      "They replace the need for planning",
      "They catch small problems before they grow",
      "They eliminate all project delays",
      "They reduce the size of the team",
    ],
    answerIndex: 1,
  },
];

export default readingQuestions;