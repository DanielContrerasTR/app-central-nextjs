import "./ResourceCard.scss";

import Link from "next/link";

interface ResourceCardProps {
  title: string;
  type?: string;
  description: string;
  link: {
    text: string;
    url: string;
  };
}

export function ResourceCard({
  title,
  description,
  link,
  type,
}: ResourceCardProps) {
  const label = type === "video" ? "Watch" : "read";
  return (
    <li className="d-flex flex-column resource-card">
      {type && <p className="m-0 resource-card-type">{type}</p>}
      <h3 className="m-0 resource-card-title">{title}</h3>
      <p className="my-3 resource-card-date">{description}</p>
      <Link href={link.url} aria-label={`${label} ${title}`}>
        {link.text}
      </Link>
    </li>
  );
}
