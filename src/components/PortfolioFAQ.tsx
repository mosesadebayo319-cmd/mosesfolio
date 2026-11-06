const questions = [
  {
    question: 'Can you handle both the marketing and the website?',
    answer:
      'Yes. We can define a connected scope covering your message, website, and the channels that bring people to it. Each deliverable and its responsibilities are agreed before work begins.',
  },
  {
    question: 'How do we choose the right budget?',
    answer:
      'We start with the goal, essential features, channels, and timing. The project assistant can show indicative service ranges. Moses confirms the final scope, quote, and delivery terms.',
  },
  {
    question: 'Do you work with nonprofits and small businesses?',
    answer:
      'Yes. My portfolio includes nonprofit campaigns, a business website for MoTechy, and ImpactDesk, a reporting workspace for nonprofit teams. The approach is adapted to the organisation’s needs.',
  },
  {
    question: 'What should I bring to our first conversation?',
    answer:
      'A short description of your business, what you want to achieve, any existing website or social profiles, your preferred timing, and a budget if you have one. We can work through the rest together.',
  },
]
export default function PortfolioFAQ() {
  return (
    <div className="jl-faq-list">
      {questions.map((item) => (
        <details key={item.question}>
          <summary>
            {item.question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
