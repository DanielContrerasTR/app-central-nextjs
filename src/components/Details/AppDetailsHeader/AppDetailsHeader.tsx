import "./AppDetailsHeader.scss";

import { type MouseEventHandler } from "react";
import dynamic from "next/dynamic";

import { ContactUsButton } from "../ContactUsButton/ContactUsButton";
import Image from "next/image";

const SafBadge = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafBadge),
  { ssr: false }
);

const SafDivider = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafDivider),
  { ssr: false }
);

interface AppDetailsHeaderProps {
  title: string;
  appIcon: string;
  developerName: string;
  worksWith: string;
  startingPrice: number;
  periodicity: string;
  onBuyClick?: MouseEventHandler;
}

export function AppDetailsHeader(props: AppDetailsHeaderProps) {
  const {
    appIcon,
    title,
    developerName,
    worksWith,
    startingPrice,
    periodicity,
    onBuyClick,
  } = props;

  return (
    <div className="details-page-header d-flex gap-4">
      <Image src={appIcon} alt={title} width={140} height={140} />
      <div className="w-100 d-flex flex-column gap-3">
        <div className="details-page-header-top-container d-flex justify-content-between gap-3">
          <div className="details-page-header-top-container-app-name d-flex flex-column">
            <h1 className="details-page-header-top-container-app-name-title m-0">
              {title}
            </h1>
            <span className="details-page-header-top-container-app-name-sub-title">
              {developerName}
            </span>
          </div>
          <div className="details-page-header-top-container-call-to-action-buttons d-flex">
            <ContactUsButton onBuyClick={onBuyClick} id="1" />
          </div>
        </div>
        <SafDivider className="details-divider" />
        <div className="details-page-header-bottom-container d-flex align-items-center gap-4">
          <div className="d-flex flex-column gap-2">
            <span className="details-page-header-bottom-container-title">
              Works with
            </span>
            <SafBadge {...{ appearance: "neutral-light" }}>
              {worksWith}
            </SafBadge>
          </div>
          <div className="d-flex flex-column gap-2">
            <span className="details-page-header-bottom-container-title">
              Starting price
            </span>
            <span className="details-page-header-bottom-container-subtitle">
              ${startingPrice} per {periodicity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
