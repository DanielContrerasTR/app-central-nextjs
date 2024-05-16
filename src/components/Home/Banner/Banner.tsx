"use client";

import "./Banner.scss";

import { WithOptionalClassName } from "app/types/WithOptionalClassName";
import dynamic from "next/dynamic";

const SafButton = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafButton),
  { ssr: false }
);
const SafIcon = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafIcon),
  { ssr: false }
);

export function Banner({ className = "" }: WithOptionalClassName) {
  //   const { navigate } = useCustomNavigate();

  return (
    <div className={`d-flex gap-3 browse-apps-banner ${className}`}>
      <div className="flex-fill">
        <p className="m-0 browse-apps-banner-header">
          Shop expert-built apps and add capabilities to your Thomson Reuters
          products
        </p>
        <SafButton
          appearance="secondary"
          className="mt-4 me-3"
          onClick={() => {
            // navigate("/en-us/about");
          }}
        >
          Learn more
        </SafButton>
        <SafButton
          appearance="primary"
          className="mt-4"
          onClick={() => {
            // navigate("/en-us/apps");
          }}
        >
          Browse apps
          <SafIcon slot="end" icon-name="chevron-right" presentation />
        </SafButton>
      </div>
    </div>
  );
}
