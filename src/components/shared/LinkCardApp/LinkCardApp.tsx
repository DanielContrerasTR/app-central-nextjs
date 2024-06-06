import Link from "next/link";
import { CardApp, type CardAppProps } from "../CardApp";

export function LinkCardApp(props: CardAppProps) {
  const { slug } = props;

  return (
    <Link
      href={`/apps/${slug}`}
      className="text-decoration-none hover-interactive"
    >
      <CardApp {...props} />
    </Link>
  );
}
