import "./AppDetailsItem.scss";

import React from "react";
import dynamic from "next/dynamic";

import { WithChildren } from "app/types/WithChildren";

const SafIcon = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafIcon),
  { ssr: false }
);

interface AppDetailsItemProps extends WithChildren {
  title: string;
  isInfo?: boolean;
}

export function AppDetailsItem({
  title,
  isInfo,
  children,
}: AppDetailsItemProps) {
  return (
    <div className="detail-section d-flex flex-column gap-4">
      <div className="d-flex align-items-center gap-2">
        <span className="detail-section-title">{title}</span>
        {isInfo && (
          <SafIcon
            slot="end"
            iconName="info-circle"
            data-testid="details-item-info-icon"
          />
        )}
      </div>
      {children}
    </div>
  );
}
