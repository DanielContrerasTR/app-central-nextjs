import Link from "next/link";
import { CardApp, type CardAppProps } from "../CardApp";
import { toSlugCase } from "app/shared/utils/common-utils";

interface LinkCardAppProps extends CardAppProps {}

export function LinkCardApp(props: LinkCardAppProps) {
  const { title } = props;

  const slug = toSlugCase(title);

  return (
    <Link
      href={`/apps/${slug}`}
      className="text-decoration-none hover-interactive"
    >
      <CardApp {...props} />
    </Link>
  );
}
