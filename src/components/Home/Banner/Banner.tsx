import "./Banner.scss";

import { WithOptionalClassName } from "app/types/WithOptionalClassName";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

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
      <div className="flex-fill">
        <p className="m-0 browse-apps-banner-header">
          Shop expert-built apps and add capabilities to your Thomson Reuters
          products
        </p>
        <SafButton
          appearance="secondary"
          className="mt-4 me-3"
          onClick={() => {
            router.push("/about");
          }}
        >
          Learn more
        </SafButton>
        <SafButton
          appearance="primary"
          className="mt-4"
          onClick={() => {
            router.push("/apps");
          }}
        >
          Browse apps
          <SafIcon slot="end" icon-name="chevron-right" presentation />
        </SafButton>
      </div>
    </div>
  );
}
