import { type SafMenuItemInstance } from "@saffron/core-components";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "app/shared/const";
import dynamic from "next/dynamic";

import { useSideNav } from "./useSideNav";

const SafIcon = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafIcon),
  { ssr: false }
);
const SafMenuItem = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafMenuItem),
  { ssr: false }
);
const SafSideNav = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafSideNav),
  { ssr: false }
);

export function SideNav() {
  const { sideNavState, openSideNav, closeSideNav } = useSideNav();

  return (
    <SafSideNav
      className="dashboard-side-nav-container"
      state={sideNavState}
      onOpen={openSideNav}
      onClose={closeSideNav}
    >
      <MenuItem text="Home" icon="home" href={ROUTE_PATHS.homePage} />
      <MenuItem
        text="Apps"
        icon="file-magnifying-glass"
        href={ROUTE_PATHS.appsPage}
      />
      <MenuItem text="About" icon="circle-info" href={ROUTE_PATHS.aboutPage} />
      <MenuItem
        text="Developers"
        icon="webhook"
        href={ROUTE_PATHS.developersPage}
      />
    </SafSideNav>
  );
}

const isSelected = (path: string) =>
  window.location.pathname === `/${path}`.replace("//", "/");

const useGoTo = () => {
  const router = useRouter();

  const navigate = (
    event: React.FormEvent<SafMenuItemInstance> & {
      target: SafMenuItemInstance;
    },
    path: string
  ) => {
    event.stopPropagation();
    router.push(path);
  };

  return { navigate };
};

interface MenuItemProps {
  text: string;
  icon: string;
  href: string;
}

function MenuItem({ text, icon, href }: MenuItemProps) {
  const { navigate } = useGoTo();

  const selected = isSelected(href);

  return (
    <SafMenuItem
      className={selected ? "selected" : ""}
      onClick={event => {
        navigate(event, href);
      }}
    >
      <SafIcon
        iconName={icon}
        slot="start"
        appearance={selected ? "solid" : "light"}
      />
      <span className="sideNav-item-label">{text}</span>
    </SafMenuItem>
  );
}
