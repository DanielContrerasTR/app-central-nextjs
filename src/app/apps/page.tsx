"use client";

import "./page.scss";

import { useAppStoreSearch } from "app/components/shared/AppStoreSearch/useAppStoreSearch";

import { Breadcrumb } from "app/components/shared/Breadcrumb/Breadcrumb";
import { LinkCardApp } from "app/components/shared/LinkCardApp";
import { ROUTE_PATHS } from "app/shared/const";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useQueryFilters } from "app/shared/hooks/useQueryFilters";
import { AppsFilter } from "app/components/shared/AppsFilter/AppsFilter";
import { AppsAndFiltersInfo } from "app/components/shared/AppsAndFiltersInfo/AppsAndFiltersInfo";

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
  const pageTitle = 'Apps';

  const { apps, searchApps } = useAppStoreSearch();

  const { sortOption, sortOrder, queryFilters } = useQueryFilters();
  
  useEffect(() => {
      searchApps({
          query: '',
          queryFilters,
          sortOption,
          sortOrder
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFilters, sortOption]);

  return (
    <div className="apps-page" data-testid="apps-page">
      <Breadcrumb>
        <SafBreadcrumbItem href={ROUTE_PATHS.homePage}>Home</SafBreadcrumbItem>
        <SafBreadcrumbItem>{pageTitle}</SafBreadcrumbItem>
      </Breadcrumb>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center w-100 mb-4">
          <span className="section-header-title">{pageTitle}</span>
          <AppsFilter />
        </div>

        <SafDivider className="mb-3" />

        <div className="apps-page-container">
          <AppsAndFiltersInfo apps={apps} />

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
