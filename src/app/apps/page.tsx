"use client";

import "./page.scss";

import { Breadcrumb } from "app/components/shared/Breadcrumb/Breadcrumb";
import { FilterChip } from "app/components/shared/FilterChip";
import { LinkCardApp } from "app/components/shared/LinkCardApp";
import { ROUTE_PATHS } from "app/shared/const";
import { useAppStore } from "app/shared/hooks/useAppstore";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const SafBreadcrumbItem = dynamic(
  () =>
    import("@saffron/core-components/react").then(
      module => module.SafBreadcrumbItem
    ),
  { ssr: false }
);
const SafDivider = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafDivider),
  { ssr: false }
);

const Apps = () => {
  const appliedFilters: any[] = [];

  const pageTitle = "Apps";

  const { apps, fetchAllApps } = useAppStore();

  useEffect(() => {
    fetchAllApps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="apps-page" data-testid="apps-page">
      {/* <HelmetTags title={pageTitle} /> */}
      <Breadcrumb>
        <SafBreadcrumbItem href={ROUTE_PATHS.homePage}>Home</SafBreadcrumbItem>
        <SafBreadcrumbItem>{pageTitle}</SafBreadcrumbItem>
      </Breadcrumb>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center w-100 mb-4">
          <span className="section-header-title">{pageTitle}</span>
          {/* <AppsFilter /> */}
        </div>

        <SafDivider className="mb-3" />

        <div className="apps-page-container">
          <p className="m-0 apps-page-results-label">
            Showing {apps.length} apps
            {appliedFilters.length ? " filtered by:" : ""}
          </p>
          <div className="my-4 d-flex gap-2 flex-wrap">
            {appliedFilters.map(filter => (
              <FilterChip key={filter} filterId={filter} />
            ))}
          </div>
          <div className="d-grid gap-4 my-4 apps-page-results">
            {apps.map(app => (
              <LinkCardApp key={app.id} {...app} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apps;
