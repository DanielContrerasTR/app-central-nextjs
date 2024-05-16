/* eslint-disable react/no-danger */
import "./AppCardContentDescription.scss";

import { useState } from "react";
import dynamic from "next/dynamic";

import { WithCompleteDescription } from "app/types/WithCompleteDescription";

const SafAnchor = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafAnchor),
  { ssr: false }
);

interface AppCardContentDescriptionProps extends WithCompleteDescription {
  description: string;
}

export function AppCardContentDescription({
  description,
  useCompleteDescription,
}: AppCardContentDescriptionProps) {
  const [showMore, setShowMore] = useState(false);

  const descriptionClass = `content-description ${
    !showMore && !useCompleteDescription ? "shorter" : ""
  }`;

  const detailsToShowText = showMore ? "Less details" : "More details";

  return (
    <>
      <div>
        <div
          className={descriptionClass}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      {!useCompleteDescription && (
        <SafAnchor
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          {detailsToShowText}
        </SafAnchor>
      )}
    </>
  );
}
