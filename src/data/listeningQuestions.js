// Listening Comprehension question bank.
// level: "beginner" | "medium" | "hard" — controls speech rate + complexity
// type: "mcq" (choose correct option) | "fill-blank" (type the missing word)

const listeningQuestions = [
  {
    id: "L01",
    level: "medium",
    type: "mcq",
    passage:
      "Most companies now expect new employees to be comfortable working in cross-functional teams, where people from different departments collaborate on a single project.",
    question: "What does the passage say companies expect from new employees?",
    options: [
      "Comfort working across departments on shared projects",
      "Preference for working alone on individual tasks",
      "Experience managing a large team of engineers",
      "Willingness to relocate to a different city",
    ],
    answerIndex: 0,
  },
  {
    id: "L02",
    level: "beginner",
    type: "fill-blank",
    passage:
      "The interview panel was impressed by her ability to explain complex technical ideas in simple terms.",
    blankPassage:
      "The interview panel was impressed by her ability to explain complex technical ideas in ____ terms.",
    answer: "simple",
  },
  {
    id: "L03",
    level: "hard",
    type: "mcq",
    passage:
      "Effective communication in the workplace is not only about speaking clearly, but also about listening carefully and responding to what others actually said.",
    question: "According to the passage, effective communication requires:",
    options: [
      "Speaking loudly so everyone can hear",
      "Clear speaking and careful listening",
      "Avoiding conversations with colleagues",
      "Writing detailed reports every day",
    ],
    answerIndex: 1,
  },
  {
    id: "L04",
    level: "beginner",
    type: "fill-blank",
    passage:
      "Before the client meeting, the team reviewed the presentation twice to make sure every slide was accurate.",
    blankPassage:
      "Before the client meeting, the team reviewed the presentation ____ to make sure every slide was accurate.",
    answer: "twice",
  },
  {
    id: "L05",
    level: "medium",
    type: "mcq",
    passage:
      "Remote work has changed how teams collaborate. Many organizations now rely on video calls, shared documents, and instant messaging instead of face-to-face meetings.",
    question: "What has remote work changed, according to the passage?",
    options: [
      "The salary structure of employees",
      "How teams collaborate with each other",
      "The number of holidays companies offer",
      "The location of company headquarters",
    ],
    answerIndex: 1,
  },
];

export default listeningQuestions;