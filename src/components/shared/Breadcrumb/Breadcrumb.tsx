import "./Breadcrumb.scss";

import dynamic from "next/dynamic";

// import { useCurrentEnvironment } from "../../shared/hooks/useLocalDevelopment";
import { WithChildren } from "app/types/WithChildren";

const SafBreadcrumb = dynamic(
  () =>
    import("@saffron/core-components/react").then(
      module => module.SafBreadcrumb
    ),
  { ssr: false }
);

export function Breadcrumb({ children }: WithChildren) {
  //   const { isAppStoreMfe } = useCurrentEnvironment();

  //   if (!isAppStoreMfe) {
  //     return null;
  //   }

  return (
    <SafBreadcrumb className="d-flex align-items-center py-0 px-4 app-store-breadcrumb">
      {children}
    </SafBreadcrumb>
  );
}
