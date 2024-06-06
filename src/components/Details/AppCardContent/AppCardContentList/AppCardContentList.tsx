import "./AppCardContentList.scss";

import dynamic from "next/dynamic";

const SafAnchor = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafAnchor),
  { ssr: false }
);
const SafIcon = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafIcon),
  { ssr: false }
);

interface AppCardContentListProps {
  title: string;
  content: string[] | string;
  anchorHref?: string;
  anchorText?: string;
  isInfo?: boolean;
  appTitle?: string;
}

export function AppCardContentList({
  title,
  content,
  anchorHref,
  anchorText,
  isInfo,
  appTitle,
}: AppCardContentListProps) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const parseContent = (content: string[] | string) => {
    if (Array.isArray(content)) {
      return (
        <>
          {content.map(item => (
            <span key={item}>{item}</span>
          ))}
        </>
      );
    }

    return <span>{content}</span>;
  };

  const ariaLabel = `${anchorText} for ${appTitle} `;

  return (
    <dl className="d-flex flex-column gap-2 w-100">
      <dt className="content-list-title d-flex gap-2">
        {title}
        {isInfo && (
          <SafIcon
            slot="end"
            iconName="info-circle"
            data-testid="details-item-info-icon"
          />
        )}
      </dt>
      <dd className="content-list-content d-flex gap-1 flex-column">
        {parseContent(content)}
      </dd>
      {anchorText && (
        <SafAnchor aria-label={ariaLabel} href={anchorHref}>
          {anchorText}
        </SafAnchor>
      )}
    </dl>
  );
}
