// Free, rule-based writing feedback — no AI/API calls involved.
// Checks structural signals (word count, greeting, closing, subject line,
// paragraph structure) rather than grammar or tone, which would need a
// real language model to evaluate.

const GREETINGS = ["hi", "hello", "dear", "hey", "greetings"];
const CLOSINGS = ["thanks", "regards", "sincerely", "best", "cheers", "warm regards"];

function parseWordRange(wordLimit) {
  const match = wordLimit.match(/(\d+)\s*-\s*(\d+)/);
  if (!match) return null;
  return { min: parseInt(match[1], 10), max: parseInt(match[2], 10) };
}

// Strips a leading "Subject: ..." line (if present) so greeting/closing
// checks look at the actual body of the message, not the subject text.
function stripSubjectLine(text) {
  const subjectMatch = text.match(/subject\s*:\s*[^\n.]*[.\n]?/i);
  if (subjectMatch && text.toLowerCase().indexOf("subject:") < 20) {
    return text.slice(subjectMatch.index + subjectMatch[0].length);
  }
  return text;
}

export function evaluateWriting(response, question) {
  const text = response.trim();

  if (!text) {
    return {
      score: 0,
      total: 1,
      checks: [
        {
          label: "No response given",
          passed: false,
          tip: "This prompt was skipped — try writing a response next time to get feedback.",
        },
      ],
    };
  }

  const bodyText = stripSubjectLine(text);
  const lowerBody = bodyText.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const checks = [];

  // Word count check — gives a specific, dynamic message based on how
  // far off the count actually is.
  const range = parseWordRange(question.wordLimit || "");
  if (range) {
    const inRange = wordCount >= range.min && wordCount <= range.max;
    let tip = null;
    if (!inRange) {
      const diff = wordCount < range.min ? range.min - wordCount : wordCount - range.max;
      tip =
        wordCount < range.min
          ? `You're ${diff} word${diff !== 1 ? "s" : ""} under the suggested minimum — try adding a bit more detail or context.`
          : `You're ${diff} word${diff !== 1 ? "s" : ""} over the suggested maximum — try tightening your sentences.`;
    }
    checks.push({
      label: `Word count: ${wordCount} words (target ${question.wordLimit})`,
      passed: inRange,
      tip,
    });
  }

  // Greeting check — looks within the first line of the actual body
  // (after stripping any subject line), not a fixed character count.
  const firstLineOfBody = lowerBody.split(/\n|\.\s/)[0] || "";
  const hasGreeting = GREETINGS.some((g) => firstLineOfBody.includes(g));
  checks.push({
    label: "Opens with a greeting",
    passed: hasGreeting,
    tip: hasGreeting
      ? null
      : "Start the message on its own line with something like \"Hi [Name],\" before getting into the content.",
  });

  // Closing check
  const hasClosing = CLOSINGS.some((c) => lowerBody.includes(c));
  checks.push({
    label: "Ends with a closing",
    passed: hasClosing,
    tip: hasClosing ? null : "Wrap up with a closing line like \"Thanks,\" or \"Regards,\" before your name.",
  });

  // Paragraph/line-break structure — a wall of text with no breaks reads
  // poorly in a real email, even if the content is otherwise fine.
  const hasLineBreaks = /\n/.test(text);
  if (wordCount > 40) {
    checks.push({
      label: "Uses line breaks between ideas",
      passed: hasLineBreaks,
      tip: hasLineBreaks
        ? null
        : "This reads as one long block — try pressing Enter between the greeting, the main message, and the closing.",
    });
  }

  // Subject line check (only relevant for longer/formal emails)
  if (question.lengthCategory === "long") {
    const hasSubject = /subject\s*:/i.test(text.slice(0, 40));
    checks.push({
      label: "Includes a subject line",
      passed: hasSubject,
      tip: hasSubject ? null : "Formal emails usually start with a \"Subject:\" line at the very top.",
    });
  }

  const score = checks.filter((c) => c.passed).length;
  return { score, total: checks.length, checks };
}