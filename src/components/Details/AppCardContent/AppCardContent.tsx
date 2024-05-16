import dynamic from "next/dynamic";
import "./AppCardContent.scss";

import { WithChildren } from "app/types/WithChildren";

const SafDivider = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafDivider),
  { ssr: false }
);

interface AppCardContentProps extends WithChildren {
  title: string;
}

export function AppCardContent({ title, children }: AppCardContentProps) {
  return (
    <div className="d-flex flex-column gap-5">
      <div className="gap-2 d-flex flex-column">
        <div className="app-card-content gap-2 d-flex flex-column">
          <span className="fst-normal mt-2 mb-2 app-card-content-title">
            {title}
          </span>
          {children}
        </div>
      </div>
      <SafDivider />
    </div>
  );
}
