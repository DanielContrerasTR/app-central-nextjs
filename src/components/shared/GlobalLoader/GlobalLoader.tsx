"use client";

import "./GlobalLoader.scss";

import dynamic from "next/dynamic";

import { useGlobalLoader } from "app/shared/hooks/useGlobalLoader";

const SafProgressRing = dynamic(
  () =>
    import("@saffron/core-components/react").then(
      module => module.SafProgressRing
    ),
  { ssr: false }
);

export interface GlobalLoaderProps {
  loaderElement?: JSX.Element;
}

export function GlobalLoader({ loaderElement }: GlobalLoaderProps) {
  const { isLoading } = useGlobalLoader();

  if (!isLoading) {
    return null;
  }

  if (loaderElement) {
    return loaderElement;
  }

  return (
    <div className="loading-overlay" data-testid="global-loader">
      <div className="loading-container">
        <SafProgressRing
          role="progressbar"
          id="indeterminate-ring"
          label="Loading"
          progressSize="large"
          className="tab-loader-ring"
          data-testid="saf-progress-ring"
        />
      </div>
    </div>
  );
}
