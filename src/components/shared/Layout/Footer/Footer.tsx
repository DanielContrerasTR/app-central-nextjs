import "./Footer.scss";

import dynamic from "next/dynamic";

const SafAnchor = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafAnchor),
  { ssr: false }
);
const SafFooter = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafFooter),
  { ssr: false }
);
const SafList = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafList),
  { ssr: false }
);
const SafListItem = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafListItem),
  { ssr: false }
);

export function Footer() {
  return (
    <SafFooter className="pt-2 footer">
      <SafList
        slot="footer-links"
        size="medium"
        list-style="none"
        order="unordered"
        inline
      >
        {LINKS.map(link => (
          <SafListItem key={link.name}>
            <SafAnchor
              className="footer__link"
              href={link.href}
              target="_blank"
            >
              {link.name}
            </SafAnchor>
          </SafListItem>
        ))}
      </SafList>
    </SafFooter>
  );
}

const LINKS = [
  {
    name: "Terms of use",
    href: "https://www.thomsonreuters.com/en/terms-of-use.html",
  },
  {
    name: "Privacy",
    href: "https://www.thomsonreuters.com/en/privacy-statement.html",
  },
  {
    name: "Disclaimer",
    href: "https://www.thomsonreuters.com/en/policies/copyright.html",
  },
  {
    name: "Cookies",
    href: "https://www.thomsonreuters.com/en/privacy-statement.html#cookies",
  },
  {
    name: "Accessibility",
    href: "https://www.thomsonreuters.com/en/policies/digital-accessibility-policy.html",
  },
  {
    name: "Do not sell or share my personal information and limit the use of my sensitive personal information",
    href: "https://privacyportal-cdn.onetrust.com/dsarwebform/dbf5ae8a-0a6a-4f4b-b527-7f94d0de6bbc/5dc91c0f-f1b7-4b6e-9d42-76043adaf72d.html",
  },
];
