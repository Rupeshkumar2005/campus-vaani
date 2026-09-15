// Task Situational Awareness & Response (Chat/Email) — MCQ format.
// Each item presents a workplace message and asks for the most
// appropriate response, matching the real test format.

const situationalQuestions = [
  {
    id: "S01",
    level: "medium",
    type: "mcq",
    passage:
      "A colleague messages: \"I won't be able to join the call, can you take notes for me?\" What is the most appropriate response?",
    options: [
      "I'm busy too, ask someone else.",
      "Sure, I'll take notes and share them with you after.",
      "Fine, but you owe me.",
      "I'll try, no promises.",
    ],
    answerIndex: 1,
  },
  {
    id: "S02",
    level: "medium",
    type: "mcq",
    passage:
      "Your manager emails: \"Can you send me the report by tomorrow morning?\" What is the most appropriate response?",
    options: [
      "Maybe, I'll see how it goes.",
      "Sure, I'll have it ready by tomorrow morning.",
      "Why do you need it so soon?",
      "I don't think I can do that.",
    ],
    answerIndex: 1,
  },
  {
    id: "S03",
    level: "medium",
    type: "mcq",
    passage:
      "A client writes: \"This is the second time my request has been delayed. I'm not happy about this.\" What is the most appropriate response?",
    options: [
      "That's not really our fault.",
      "I understand your frustration — let me personally look into this and update you within the hour.",
      "These things happen sometimes.",
      "I'll pass this along to someone else.",
    ],
    answerIndex: 1,
  },
  {
    id: "S04",
    level: "medium",
    type: "mcq",
    passage:
      "A teammate messages: \"I made a mistake in the shared file, sorry about that.\" What is the most appropriate response?",
    options: [
      "That's a pretty big mistake to make.",
      "No worries, let's fix it together.",
      "You should be more careful next time.",
      "I already noticed, it's fine.",
    ],
    answerIndex: 1,
  },
  {
    id: "S05",
    level: "medium",
    type: "mcq",
    passage:
      "Your team lead asks: \"Are you comfortable presenting this to the client tomorrow?\" What is the most appropriate response?",
    options: [
      "Not really, can someone else do it?",
      "Yes, I'll prepare and be ready to present.",
      "I guess so, if I have to.",
      "I've never done that before.",
    ],
    answerIndex: 1,
  },
  {
    id: "S06",
    level: "medium",
    type: "mcq",
    passage:
      "A colleague from another team messages: \"Can you share the API documentation when you get a chance?\" What is the most appropriate response?",
    options: [
      "I'm quite busy right now.",
      "Sure, I'll send it over shortly.",
      "That's not really my responsibility.",
      "Ask my manager instead.",
    ],
    answerIndex: 1,
  },
];

export default situationalQuestions;