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
  anchorText?: string;
  isInfo?: boolean;
}

export function AppCardContentList({
  title,
  content,
  anchorText,
  isInfo,
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

  return (
    <div className="d-flex flex-column gap-2 w-100">
      <div className="d-flex gap-2">
        <span className="content-list-title">{title}</span>
        {isInfo && (
          <SafIcon
            slot="end"
            iconName="info-circle"
            data-testid="details-item-info-icon"
          />
        )}
      </div>
      <div className="content-list-content d-flex gap-1 flex-column">
        {parseContent(content)}
      </div>
      {anchorText && <SafAnchor>{anchorText}</SafAnchor>}
    </div>
  );
}
