import "./Banner.scss";

import { WithOptionalClassName } from "app/types/WithOptionalClassName";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { ROUTE_PATHS } from "app/shared/const";

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
  const router = useRouter();

  return (
    <div className={`d-flex gap-3 browse-apps-banner ${className}`}>
      <div className="flex">
        <h1 className="m-0 browse-apps-banner-header">
          Shop expert-built apps and add capabilities to your Thomson Reuters
          products
        </h1>
        <div className="d-flex align-items-center justify-content-start">
          <SafButton
            appearance="secondary"
            onClick={() => router.push(ROUTE_PATHS.aboutPage)}
            className="mt-4 me-3 text-decoration-none link-button-secondary"
          >
            Learn more
          </SafButton>
          <SafButton
            onClick={() => router.push(ROUTE_PATHS.appsPage)}
            className="mt-4 text-decoration-none link-button-primary"
          >
            Browse apps
            <SafIcon slot="end" icon-name="chevron-right" presentation />
          </SafButton>
        </div>
      </div>
    </div>
  );
}
