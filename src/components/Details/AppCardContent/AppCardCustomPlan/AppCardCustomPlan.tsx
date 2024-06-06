import "./AppCardCustomPlan.scss";

import { type ChangeEventHandler } from "react";
import dynamic from "next/dynamic";
import { WithRadio } from "app/types/WithRadio";

const SafDivider = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafDivider),
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

interface AppCardCustomPlanProps extends WithRadio {
  isChecked?: boolean;
  onChangeHandler?: ChangeEventHandler;
}

export function AppCardCustomPlan({
  withRadioButton,
  isChecked,
  onChangeHandler,
}: AppCardCustomPlanProps) {
  return (
    <div className="app-card-custom-plan d-flex flex-column gap-3">
      <div className="d-flex gap-2 align-items-center">
        {withRadioButton && (
          <SafRadio
            value="Custom Plan"
            checked={isChecked}
            onClick={onChangeHandler}
          />
        )}
        <h3 className="app-card-custom-plan-title">Custom Plan</h3>
      </div>
      <span className="app-card-custom-plan-subtitle">
        Provide your contact info and one of our sales representatives will work
        with you to customize a plan that meets your specific needs.{" "}
      </span>
      <SafDivider />
      <ul className="d-flex flex-column gap-3 app-card-custom-plan-perks">
        <li className="d-flex gap-3">
          <SafIcon iconName="check" />
          <span className="plan-pricing-card-perks-text">
            Choose the number of users
          </span>
        </li>
        <li className="d-flex gap-3">
          <SafIcon iconName="check" />
          <span className="plan-pricing-card-perks-text">
            Access to all app features
          </span>
        </li>
        <li className="d-flex gap-3">
          <SafIcon iconName="check" />
          <span className="plan-pricing-card-perks-text">
            Automatic renewal, cancel anytime
          </span>
        </li>
        <li className="d-flex gap-3">
          <SafIcon iconName="check" />
          <span className="plan-pricing-card-perks-text">
            Setup fee determined based on the number of users
          </span>
        </li>
      </ul>
    </div>
  );
}
