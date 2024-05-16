import "./CardApp.scss";

export interface CardAppProps {
  icon: string;
  title: string;
  description: string;
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
        <img
          src={icon}
          alt={title}
          width={iconSize}
          height={iconSize}
          className="rounded-2"
        />
        <div className="d-flex ps-4 flex-column justify-content-center">
          <div className="card-app-title">
            <span>{title}</span>
          </div>
          <div className="card-app-description">{description}</div>
        </div>
      </div>
      {coverImage && (
        <img src={coverImage} alt={title} className="w-100 rounded-2 mt-4" />
      )}
    </div>
  );
}
