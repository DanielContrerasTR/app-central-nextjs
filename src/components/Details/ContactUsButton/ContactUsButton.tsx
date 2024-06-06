import "./ContactUsButton.scss";

import dynamic from "next/dynamic";
import type { MouseEventHandler } from "react";

import { WithId } from "app/types/WithId";

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

interface ContactUsButtonProps extends WithId<string> {
  onBuyClick?: MouseEventHandler;
}

export function ContactUsButton({ onBuyClick, id }: ContactUsButtonProps) {
  return (
    <div className="contact-us-button d-flex">
      <SafButton onClick={onBuyClick} role="link">
        Contact sales
      </SafButton>
      <div>
        <SafTooltip anchor={`anchor-overview-${id}`} placement="bottom-end">
          A sales representative will contact you within 2 to 4 business days.
        </SafTooltip>
        <SafButton appearance="tertiary" id={`anchor-overview-${id}`}>
          <SafIcon
            iconName="info-circle"
            data-testid="details-item-info-icon"
          />
        </SafButton>
      </div>
    </div>
  );
}
