import "./Layout.scss";

import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { SideNav } from "./SideNav/SideNav";
import { useSideNav } from "./SideNav/useSideNav";
import { WithChildren } from "app/types/WithChildren";

export function Layout({ children }: WithChildren) {
  const { sideNavState } = useSideNav();

  return (
    <div className="app-container app-store-layout">
      <Header />

      <div className="container-fluid view-container" id="app-view-container">
        <SideNav />
        <div className={`dashboard-content ${sideNavState}`}>{children}</div>
      </div>

      <Footer />
    </div>
  );
}
