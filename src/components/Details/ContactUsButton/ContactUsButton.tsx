import dynamic from "next/dynamic";
import "./ContactUsButton.scss";

import type { MouseEventHandler } from "react";

const SafButton = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafButton),
  { ssr: false }
);
const SafTooltip = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafTooltip),
  { ssr: false }
);
const SafIcon = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafIcon),
  { ssr: false }
);

interface ContactUsButtonProps {
  onBuyClick?: MouseEventHandler;
}

export function ContactUsButton({ onBuyClick }: ContactUsButtonProps) {
  return (
    <div className="contact-us-button d-flex">
      <SafButton onClick={onBuyClick}>Contact us</SafButton>
      <div>
        <SafTooltip anchor="anchor-overview" placement="bottom-end">
          A sales representative will contact you within 2 to 4 business days.
        </SafTooltip>
        <SafButton appearance="tertiary" id="anchor-overview">
          <SafIcon
            iconName="info-circle"
            data-testid="details-item-info-icon"
          />
        </SafButton>
      </div>
    </div>
  );
}
