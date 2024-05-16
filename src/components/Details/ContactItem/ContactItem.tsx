import dynamic from "next/dynamic";

const SafIcon = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafIcon),
  { ssr: false }
);
const SafAnchor = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafAnchor),
  { ssr: false }
);

interface ContactItemProps {
  label: string;
  url?: string;
  iconName: string;
}

export function ContactItem({ label, url, iconName }: ContactItemProps) {
  return (
    <div className="d-flex gap-2">
      <div slot="start" className="w-10">
        <SafIcon iconName={iconName} />
      </div>
      <SafAnchor href={url}>{label}</SafAnchor>
    </div>
  );
}
