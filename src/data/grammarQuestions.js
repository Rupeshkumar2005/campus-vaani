// Grammar & Sentence Correction question bank.
// level: "beginner" | "medium" | "hard"
// The sentence has an error; options give possible corrections for the
// underlined/marked portion. correctIndex points to the right fix.

const grammarQuestions = [
  {
    id: "G01",
    level: "beginner",
    sentence: "She don't like attending morning meetings.",
    errorPart: "don't like",
    options: ["doesn't like", "not like", "didn't liked", "no likes"],
    correctIndex: 0,
    explanation: "\"She\" is third-person singular, so the verb needs \"doesn't\", not \"don't\".",
  },
  {
    id: "G02",
    level: "beginner",
    sentence: "Each of the employees have submitted their report.",
    errorPart: "have submitted",
    options: ["has submitted", "having submitted", "had submit", "has submit"],
    correctIndex: 0,
    explanation: "\"Each\" is singular, so it takes the singular verb \"has\", not \"have\".",
  },
  {
    id: "G03",
    level: "medium",
    sentence: "By the time the manager arrives, we finish the presentation.",
    errorPart: "we finish",
    options: ["we will have finished", "we finished", "we are finishing", "we finish"],
    correctIndex: 0,
    explanation: "\"By the time\" with a future event needs the future perfect tense: \"will have finished\".",
  },
  {
    id: "G04",
    level: "medium",
    sentence: "The team is looking forward to discuss the new proposal.",
    errorPart: "to discuss",
    options: ["to discussing", "for discuss", "discussing", "to discussed"],
    correctIndex: 0,
    explanation: "\"Looking forward to\" is followed by a gerund (-ing form), not the base verb: \"to discussing\".",
  },
  {
    id: "G05",
    level: "hard",
    sentence: "Neither the manager nor the employees was informed about the change.",
    errorPart: "was informed",
    options: ["were informed", "was inform", "have informed", "is informed"],
    correctIndex: 0,
    explanation: "With \"neither...nor\", the verb agrees with the nearer subject (\"employees\", plural), so it should be \"were\".",
  },
  {
    id: "G06",
    level: "hard",
    sentence: "The report, along with the supporting documents, were sent yesterday.",
    errorPart: "were sent",
    options: ["was sent", "have been sent", "are sent", "were send"],
    correctIndex: 0,
    explanation: "\"Along with...\" doesn't make the subject plural — the verb agrees with \"the report\" (singular), so \"was sent\" is correct.",
  },
];

export default grammarQuestions;