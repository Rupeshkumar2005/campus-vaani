// Writing practice prompts.
// type: "business" (Business Communication Writing) | "situational" (Chat/Email Response)
// Since writing has no single "correct" answer, each prompt includes a
// model answer for self-review instead of an auto-graded correctIndex.

const writingQuestions = [
  {
    id: "W01",
    type: "business",
    lengthCategory: "short",
    prompt:
      "Write a short email to your manager informing them that you will be 30 minutes late to work tomorrow due to a doctor's appointment.",
    wordLimit: "40-60 words",
    modelAnswer:
      "Subject: Slightly Late Arrival Tomorrow\n\nHi [Manager's name],\n\nI have a doctor's appointment tomorrow morning and expect to reach the office about 30 minutes late. I'll make sure my morning tasks are covered before I leave and will be available on chat if needed.\n\nThanks for understanding.\n\n[Your name]",
  },
  {
    id: "W02",
    type: "business",
    lengthCategory: "short",
    prompt:
      "Write a brief message to a colleague asking them to review a document you've shared before the end of the day.",
    wordLimit: "30-50 words",
    modelAnswer:
      "Hi [Name], I've shared the draft report with you — could you review it and share feedback by end of day? Happy to hop on a quick call if anything's unclear. Thanks!",
  },
  {
  id: "W07",
  type: "business",
  lengthCategory: "long",
  prompt:
    "Write an email to your team summarizing the outcomes of a project review meeting, including two key decisions made and the next steps each team member is responsible for.",
  wordLimit: "120-150 words",
  modelAnswer:
    "Subject: Project Review — Summary & Next Steps\n\nHi Team,\n\nThanks for joining today's project review. Here's a quick summary of what we covered:\n\nKey decisions:\n1. We will move the launch date to the 15th to allow more time for QA testing.\n2. The design team will finalize the updated mockups by Friday.\n\nNext steps:\n- Priya: Update the QA test plan by Wednesday.\n- Arjun: Share the revised mockups with stakeholders.\n- Everyone: Please review the shared doc and flag any blockers by tomorrow EOD.\n\nLet me know if I've missed anything from our discussion. Thanks for your continued effort on this.\n\nBest,\n[Your name]",
},
{
  id: "W08",
  type: "business",
  lengthCategory: "long",
  prompt:
    "Write an email to a client explaining a delay in project delivery, the reason behind it, and the revised timeline, while maintaining a professional and reassuring tone.",
  wordLimit: "120-160 words",
  modelAnswer:
    "Subject: Update on Your Project Timeline\n\nDear [Client's name],\n\nI wanted to personally update you on the status of your project. Due to an unexpected delay in receiving third-party assets, we are slightly behind our original schedule.\n\nWe understand how important timely delivery is to you, and we've already adjusted our internal resources to minimize further delays. Our revised delivery date is now [new date], and we're confident we can meet this without compromising on quality.\n\nWe sincerely apologize for any inconvenience this may cause and appreciate your patience. Please feel free to reach out if you have any questions or concerns in the meantime.\n\nBest regards,\n[Your name]",
},
  
];

export default writingQuestions;