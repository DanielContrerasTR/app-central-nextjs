import "./FaqsSection.scss";

import dynamic from "next/dynamic";

import { Faq } from "app/types/AppStore";

const SafAnchor = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafAnchor),
  { ssr: false }
);

interface FaqsSectionProps {
  faqs: Faq[];
}

export function FaqsSection({ faqs }: FaqsSectionProps) {
  return (
    <div className="d-flex flex-column gap-4 pt-4 faqs-section">
      <div className="d-flex w-100 align-items-center justify-content-between">
        <span className="faqs-section-title">Frequently asked questions</span>
      </div>
      <div className="d-flex flex-column gap-3">
        {faqs.map(({ question, answer }) => (
          <div key={question} className="d-flex flex-column">
            <span className="question">{question}</span>
            <span className="answer">{answer}</span>
          </div>
        ))}
      </div>
      <SafAnchor>Go to FAQs</SafAnchor>
    </div>
  );
}
