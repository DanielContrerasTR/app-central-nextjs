import "./AppCardPlansAndPricings.scss";

import { type ChangeEventHandler } from "react";
import dynamic from "next/dynamic";

import { PlanPricingCard } from "./AppCardPlansAndPricingCard/PlanPricingCard";
import { Plan } from "app/types/AppStore";
import { Alert } from "app/types/Alert";
import { WithRadio } from "app/types/WithRadio";

const SafAlert = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafAlert),
  { ssr: false }
);

interface AppCardPlansAndPricingsProps extends WithRadio {
  plans: Plan[];
  onChangeHandler?: ChangeEventHandler;
  checkedCard?: string;
  title?: string;
  subtitle?: string;
  alert?: Alert;
  hasButtons?: boolean;
}

const defaultTitle = "Plans and pricing";
const defaultSubtitle =
  "You'll have a chance to speak with a sales representative before completing your purchase.";

export function AppCardPlansAndPricings(props: AppCardPlansAndPricingsProps) {
  const {
    plans,
    withRadioButton,
    onChangeHandler,
    checkedCard,
    title,
    subtitle,
    alert,
    hasButtons,
  } = props;

  return (
    <div className="app-cards-plans-pricing-section d-flex flex-column gap-3">
      <span className="app-cards-plans-pricing-section-title">
        {title ?? defaultTitle}
      </span>
      <span className="app-cards-plans-pricing-section-subtitle">
        {subtitle ?? defaultSubtitle}
      </span>
      {alert && (
        <SafAlert
          className="app-cards-plans-pricing-section-alert-hide-cancel"
          appearance={alert?.level}
        >
          {alert.message}
        </SafAlert>
      )}
      <div className="d-flex gap-4 justify-content-around">
        {plans.map(plan => (
          <PlanPricingCard
            {...plan}
            recommended={plan.title === "Advance"}
            key={plan.title}
            withRadioButton={withRadioButton}
            onChangeHandler={onChangeHandler}
            isChecked={checkedCard === plan.title}
            hasButtons={hasButtons}
          />
        ))}
      </div>
    </div>
  );
}
