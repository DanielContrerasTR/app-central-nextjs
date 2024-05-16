"use client";

import Link from "next/link";
import "./ResourceCard.scss";

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
  return (
    <div className="d-flex flex-column resource-card">
      {type && <p className="m-0 resource-card-type">{type}</p>}
      <p className="m-0 resource-card-title">{title}</p>
      <p className="my-3 resource-card-date">{description}</p>
      <Link href={link.url}>{link.text}</Link>
    </div>
  );
}
