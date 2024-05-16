import "./PlanPricingCard.scss";

import { type ChangeEventHandler } from "react";
import dynamic from "next/dynamic";
import { WithRadio } from "app/types/WithRadio";
import { Plan } from "app/types/AppStore";

const SafDivider = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafDivider),
  { ssr: false }
);
const SafAnchor = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafAnchor),
  { ssr: false }
);
const SafBadge = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafBadge),
  { ssr: false }
);
const SafButton = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafButton),
  { ssr: false }
);
const SafIcon = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafIcon),
  { ssr: false }
);
const SafRadio = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafRadio),
  { ssr: false }
);

interface PlanPricingCardProps extends Plan, WithRadio {
  readonly?: boolean;
  isChecked?: boolean;
  hasButtons?: boolean;
  onChangeHandler?: ChangeEventHandler;
}

export function PlanPricingCard(props: PlanPricingCardProps) {
  const {
    recommended,
    title,
    price,
    subtitle,
    perks,
    periodicity,
    withRadioButton,
    readonly,
    isChecked,
    onChangeHandler,
    hasButtons = true,
  } = props;
  return (
    <div className="d-flex flex-column gap-3 position-relative w-100">
      {recommended && !readonly && (
        <div className="position-absolute w-100 d-flex justify-content-end px-4">
          <SafBadge appearance="info-light" attached>
            Recommended
          </SafBadge>
        </div>
      )}
      <div
        className={`plan-pricing-card d-flex flex-column gap-3 ${
          readonly ? " plan-pricing-card-readonly" : ""
        }`}
      >
        <div className="d-flex gap-2 align-items-center">
          {withRadioButton && !readonly && (
            // TODO: changed this from safRadio to simple input. SafRadio is just not working as expected
            // Remove once safRadio is working as expected
            <SafRadio
              value={title}
              checked={isChecked}
              onClick={onChangeHandler}
            />
          )}
          <span className="plan-pricing-card-title">{title}</span>
        </div>
        <div className="plan-pricing-card-price">
          <span className="plan-pricing-card-price-number">${price}</span>
          <span className="plan-pricing-card-price-period">/{periodicity}</span>
        </div>
        <span className="plan-pricing-card-subtitle">{subtitle}</span>
        <SafDivider />
        <div className="plan-pricing-card-perks d-flex flex-column gap-2">
          {perks.map(perk => (
            <div className="d-flex gap-3" key={perk}>
              <SafIcon iconName="check" />
              <span className="plan-pricing-card-perks-text">{perk}</span>
            </div>
          ))}
        </div>
        {!(withRadioButton ?? readonly) && (
          <div className="d-flex gap-3 flex-column">
            {hasButtons && (
              <>
                <SafDivider />
                <SafButton
                  appearance={recommended ? "primary" : "secondary"}
                  layout="block"
                >
                  Choose Plan
                </SafButton>
              </>
            )}
          </div>
        )}
        {readonly && (
          <>
            <SafDivider />
            <div className="pt-2">
              <SafAnchor href="#">Choose a different plan</SafAnchor>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
