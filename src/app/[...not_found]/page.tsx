"use client";

import "./page.scss";

import { ROUTE_PATHS } from "app/shared/const";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const SafButton = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafButton),
  { ssr: false }
);
const SafEmptyState = dynamic(
  () =>
    import("@saffron/core-components/react").then(
      module => module.SafEmptyState
    ),
  { ssr: false }
);
const SafIcon = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafIcon),
  { ssr: false }
);

const NotFound = () => {
  const router = useRouter();

  return (
    <div
      className="d-flex align-items-center justify-content-center not-found-page"
      data-testid="not-found-page"
    >
      <SafEmptyState is-center="true" empty-state-title="404">
        <SafIcon slot="icon" size={45} icon-name="circle-exclamation" />
        <p>Sorry, the page you visited does not exist.</p>
        <div slot="actions">
          <SafButton
            appearance="primary"
            onClick={() => {
              router.push(ROUTE_PATHS.homePage);
            }}
          >
            Back Home
          </SafButton>
        </div>
      </SafEmptyState>
    </div>
  );
};

export default NotFound;
