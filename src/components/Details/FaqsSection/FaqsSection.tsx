import "./FaqsSection.scss";

import dynamic from "next/dynamic";

import { Faq } from "app/types/AppStore";
import { ROUTE_PATHS } from "app/shared/const";
import Link from "next/link";

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
    <div className="d-flex flex-column gap-4 faqs-section pb-5">
      <div className="d-flex w-100 align-items-center justify-content-between">
        <h2 className="faqs-section-title">Frequently asked questions</h2>
      </div>
      <div className="d-flex flex-column gap-3">
        {faqs.map(({ question, answer }) => (
          <dl key={question} className="d-flex flex-column">
            <dt className="question">{question}</dt>
            <dd className="answer">{answer}</dd>
          </dl>
        ))}
      </div>
      <Link href={ROUTE_PATHS.faqPage}>Go to FAQs</Link>
    </div>
  );
}
