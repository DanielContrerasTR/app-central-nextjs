import "./Header.scss";

import dynamic from "next/dynamic";
import SafSearchAutocomplete from "../../SafSearchAutocomplete/SafSearchAutocomplete";

const SafButton = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafButton),
  { ssr: false }
);
const SafIcon = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafIcon),
  { ssr: false }
);
const SafLogo = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafLogo),
  { ssr: false }
);
const SafProductHeader = dynamic(
  () =>
    import("@saffron/core-components/react").then(
      module => module.SafProductHeader
    ),
  { ssr: false }
);
const SafProductHeaderItem = dynamic(
  () =>
    import("@saffron/core-components/react").then(
      module => module.SafProductHeaderItem
    ),
  { ssr: false }
);

export function Header() {
  return (
    <div id="app-header" className="top-0 w-100 position-fixed">
      <SafProductHeader>
        <SafLogo
          slot="logo"
          appearance="full-color"
          productName="App Central"
        />

        <div
          slot="logo"
          className="d-flex flex-fill justify-content-between search-input"
        >
          <div className="search"><SafSearchAutocomplete /></div>
        </div>

        <div slot="global">
          <SafProductHeaderItem>
            <SafButton appearance="tertiary" icon-only>
              <SafIcon iconName="circle-question" />
            </SafButton>
          </SafProductHeaderItem>
          <SafProductHeaderItem>
            <SafButton appearance="tertiary" icon-only>
              <SafIcon iconName="circle-user" />
            </SafButton>
          </SafProductHeaderItem>
        </div>
      </SafProductHeader>
    </div>
  );
}
