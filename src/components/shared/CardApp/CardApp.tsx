import "./CardApp.scss";

import { AppStore } from "app/types/AppStore";
import Image from "next/image";

type CardAppPropsBase = Pick<
  AppStore,
  "icon" | "title" | "description" | "slug"
>;

export interface CardAppProps extends CardAppPropsBase {
  iconSize?: number;
  coverImage?: string;
  readonly?: boolean;
}

export function CardApp(props: CardAppProps) {
  const {
    icon,
    title,
    description,
    coverImage,
    iconSize = 72,
    readonly,
  } = props;

  return (
    <div
      className={`${
        readonly ? "card-app-readonly" : ""
      } d-flex flex-column rounded-2 p-2 card-app`}
    >
      <div className="d-flex">
        <Image
          src={icon}
          alt={title}
          width={iconSize}
          height={iconSize}
          className="rounded-2"
        />
        <div className="d-flex ps-4 flex-column justify-content-center">
          <div className="card-app-title">
            <h3 className="m-0">{title}</h3>
          </div>
          <div className="card-app-description">{description}</div>
        </div>
      </div>
      {coverImage && (
        <div className="card-app-aspect-ratio-grid">
          <img
            src={coverImage}
            alt={description}
            className="w-100 rounded-2 mt-4 card-app-aspect-ratio-grid"
          />
        </div>
      )}
    </div>
  );
}
