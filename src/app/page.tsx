"use client";

import "./page.scss";

import { Banner } from "app/components/Home/Banner";
import { ResourceCard } from "app/components/Home/ResourceCard";
import { TopCategory } from "app/components/Home/TopCategory";
import { LinkCardApp } from "app/components/shared/LinkCardApp";
import { useAppStore } from "app/shared/hooks/useAppstore";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";

const SafDivider = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafDivider),
  { ssr: false }
);
const SafButton = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafButton),
  { ssr: false }
);
const SafIcon = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafIcon),
  { ssr: false }
);

export default function Home() {
  const {
    featuredApps,
    mostPopular,
    resources,
    topCategories,
    fetchFeaturedApps,
    fetchMostPopularApps,
    fetchLatestResources,
    fetchTopCategories,
  } = useAppStore();

  useEffect(() => {
    fetchFeaturedApps();
    fetchMostPopularApps();
    fetchLatestResources();
    fetchTopCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-store-home" data-testid="home-page">
      {/* <HelmetTags title={SITE_NAME} /> */}
      <Banner className="w-100" />
      <div className="content">
        <div className="d-flex justify-content-between align-items-center w-100">
          <span className="section-header-title">Apps by product</span>
        </div>
        <div className="my-4 d-flex gap-2 flex-wrap">
          {topCategories.map(category => (
            <TopCategory key={category.filterId} {...category} />
          ))}
          <Link href="/apps">Show more</Link>
        </div>

        <SafDivider className="mb-4 home-divider" />

        <div className="d-flex justify-content-between align-items-center w-100">
          <span className="section-header-title">Featured apps</span>
          <SafButton appearance="tertiary">
            Explore all
            <SafIcon slot="end" icon-name="chevron-right" presentation />
          </SafButton>
        </div>
        <div className="d-grid gap-4 my-4 featured-apps">
          {featuredApps.map(app => (
            <LinkCardApp key={app.id} {...app} />
          ))}
        </div>

        <SafDivider className="mb-4 home-divider" />

        <div className="d-flex justify-content-between align-items-center w-100">
          <span className="section-header-title">Most popular</span>
          <SafButton
            appearance="tertiary"
            onClick={() => {
              // navigate("/en-us/apps?categories=most-popular");
            }}
          >
            Explore all
            <SafIcon slot="end" icon-name="chevron-right" presentation />
          </SafButton>
        </div>
        <div className="align-items-center d-grid gap-4 my-4 most-popular-apps">
          {mostPopular.map(app => (
            <LinkCardApp key={app.id} {...app} coverImage={undefined} />
          ))}
        </div>

        <SafDivider className="mb-4 home-divider" />

        <div className="d-flex justify-content-between align-items-center w-100">
          <span className="section-header-title">Resources</span>
          <SafButton appearance="tertiary">
            Explore all
            <SafIcon slot="end" icon-name="chevron-right" presentation />
          </SafButton>
        </div>
        <div className="align-items-center d-grid gap-4 my-4 latest-resources">
          {resources.map(({ date, duration, ...rest }) => (
            <ResourceCard
              key={rest.title}
              {...rest}
              description={`Posted on: ${date}${
                duration ? `. Duration: ${duration}` : ""
              }`}
            />
          ))}
        </div>
      </div>
      <div className="align-items-center w-100 help-section">
        <span className="section-header-title">Need help?</span>
        <div className="align-items-center d-grid gap-4 my-4 latest-resources">
          <ResourceCard
            title="Frequently asked questions"
            description="New to the App Central? Check out the FAQs."
            link={{
              text: "Go to FAQs",
              url: "/",
            }}
          />
          <ResourceCard
            title="Sales support"
            description="Need help with your purchase or got some pricing questions?"
            link={{
              text: "Call 1 800-000-0000",
              url: "/",
            }}
          />
          <ResourceCard
            title="Account and login"
            description="Can't sign in or experiencing other account-related issues?"
            link={{
              text: "Go to account support",
              url: "/",
            }}
          />
        </div>
      </div>
    </div>
  );
}
