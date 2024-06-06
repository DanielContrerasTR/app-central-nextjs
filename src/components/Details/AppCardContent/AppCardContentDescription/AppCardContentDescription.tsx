/* eslint-disable react/no-danger */
import "./AppCardContentDescription.scss";

import { useEffect, useRef, useState } from "react";
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
  const descriptionRef = useRef<HTMLDivElement>(null);

  const descriptionClass = `content-description ${
    !showMore && !useCompleteDescription ? "shorter" : ""
  }`;
  const detailsToShowText = showMore ? "Less details" : "More details";

  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      if (descriptionRef.current?.contains(event.target as Node)) {
        descriptionRef.current.classList.remove("shorter");
      }
    };

    const currentRef = descriptionRef.current;
    if (currentRef) {
      currentRef.addEventListener("focusin", handleFocusIn);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("focusin", handleFocusIn);
      }
    };
  }, [showMore]);

  return (
    <>
      <div>
        <div
          className={descriptionClass}
          dangerouslySetInnerHTML={{ __html: description }}
          ref={descriptionRef}
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
