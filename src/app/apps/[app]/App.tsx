"use client";

import "./page.scss";

import dynamic from "next/dynamic";
import { ROUTE_PATHS } from "app/shared/const";
import { Breadcrumb } from "app/components/shared/Breadcrumb/Breadcrumb";
import { AppDetailsHeader } from "app/components/Details/AppDetailsHeader/AppDetailsHeader";
import { AppCardContent } from "app/components/Details/AppCardContent/AppCardContent";
import { AppCardContentList } from "app/components/Details/AppCardContent/AppCardContentList/AppCardContentList";
import { AppDetailsItem } from "app/components/Details/AppDetailsItem/AppDetailsItem";
import { ContactItem } from "app/components/Details/ContactItem/ContactItem";
import { AppCardPlansAndPricings } from "app/components/Details/AppCardContent/AppCardPricesAndPlans/AppCardPlansAndPricings";
import { AppCardCustomPlan } from "app/components/Details/AppCardContent/AppCardCustomPlan/AppCardCustomPlan";
import { ContactUsButton } from "app/components/Details/ContactUsButton/ContactUsButton";
import { FaqsSection } from "app/components/Details/FaqsSection/FaqsSection";
import { Gallery } from "app/components/Details/Gallery/Gallery";
import { AppCardContentDescription } from "app/components/Details/AppCardContent/AppCardContentDescription/AppCardContentDescription";
import { useAppDetailsOnLoad } from "app/shared/hooks/useFetchAppDetails";
import { useGetSource } from "app/shared/hooks/useGetSource";

const SafDivider = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafDivider),
  { ssr: false }
);
const SafBreadcrumbItem = dynamic(
  () =>
    import("@saffron/core-components/react").then(
      module => module.SafBreadcrumbItem
    ),
  { ssr: false }
);

interface AppDetailsProps {
  params: {
    app: string;
  };
}

export const AppDetails = (props: AppDetailsProps) => {
  const { app: slug } = props.params;

  const { getSource } = useGetSource();

  const { app } = useAppDetailsOnLoad(slug);
  // const { resetPurchaseWizardState } = usePurchaseWizard();
  // const { navigate } = useCustomNavigate();

  //   const onContactUsHandler = useCallback(() => {
  //     resetPurchaseWizardState();
  //     setSourceUrl(window.location.href);
  //     navigate(`${ROUTE_PATHS.appsPage}/${slug}/contact-sales`);
  // }, [navigate, resetPurchaseWizardState, slug, setSourceUrl]);

  const appIcon = getSource(app?.icon);

  if (!app) {
    return null;
  }

  const {
    developerName,
    worksWith,
    title,
    description,
    carrousel,
    details,
    setupSecurity,
    vendor,
    plans,
    faqs,
    htmlDescription,
    video,
    policies,
  } = app;

  const { capabilities, categories, supportedLanguages } = details;

  const {
    timeToLaunch,
    integrations,
    licenses,
    security,
    setup,
    setupDocumentUrl,
    securityDocumentUrl,
  } = setupSecurity;

  return (
    <>
      {/* <HelmetTags title={title} description={description} /> */}
      <Breadcrumb>
        <SafBreadcrumbItem href={ROUTE_PATHS.homePage}>Home</SafBreadcrumbItem>
        <SafBreadcrumbItem href={ROUTE_PATHS.appsPage}>Apps</SafBreadcrumbItem>
        <SafBreadcrumbItem>{title}</SafBreadcrumbItem>
      </Breadcrumb>
      <div
        className="gap-4 d-flex flex-column details-page"
        data-testid="details-page"
      >
        <AppDetailsHeader
          startingPrice={plans[0].price}
          appIcon={appIcon}
          {...app}
          // onBuyClick={onContactUsHandler}
        />
        <div>
          <Gallery images={carrousel} video={video} />
        </div>
        <AppCardContent title="Description">
          <AppCardContentDescription
            description={htmlDescription ?? description}
          />
        </AppCardContent>
        <AppCardContent title="App details">
          <div className="d-flex gap-5">
            <AppCardContentList title="Developed by" content={developerName} />
            <AppCardContentList title="Works with" content={worksWith} isInfo />
            <AppCardContentList title="Categories" content={categories} />
            <AppCardContentList title="Capabilities" content={capabilities} />
            <AppCardContentList
              title="Supported languages"
              content={supportedLanguages}
            />
          </div>
        </AppCardContent>
        <AppCardContent title="Setup and security">
          <div className="d-flex gap-5">
            <AppCardContentList
              title="Setup"
              content={setup}
              appTitle={title}
              anchorHref={setupDocumentUrl}
              anchorText="View setup guide"
            />
            <AppCardContentList title="Time to launch" content={timeToLaunch} />
            <AppCardContentList
              title="Security compliance"
              content={security}
              appTitle={title}
              anchorHref={securityDocumentUrl}
              anchorText="View security document"
            />
            <AppCardContentList
              title="Other integrations"
              content={integrations}
            />
            <AppCardContentList
              title="Other license requirements"
              content={licenses}
            />
          </div>
        </AppCardContent>
        <AppCardContent title="Developer contacts and policies">
          <div className="d-flex gap-5">
            <AppDetailsItem title={developerName}>
              <ContactItem
                url={vendor.website}
                iconName="compass"
                label="Website"
              />
              <ContactItem
                url={vendor.support}
                iconName="circle-question"
                label="Support"
              />
              <ContactItem
                url={`mailto:${vendor.email}`}
                iconName="envelope"
                label="Email"
              />
            </AppDetailsItem>
            <AppDetailsItem title="Policies">
              <ContactItem
                url={policies?.returnPolicy}
                iconName="arrow-up"
                label="Return policies"
              />
              <ContactItem
                url={policies?.privacyPolicy}
                iconName="hand"
                label="Privacy policy"
              />
              <ContactItem
                url={policies.legalTermsOfUsePolicy}
                iconName="file-contract"
                label="Legal terms"
              />
            </AppDetailsItem>
          </div>
        </AppCardContent>
        <AppCardPlansAndPricings plans={plans} hasButtons={false} />
        <AppCardCustomPlan />
        <ContactUsButton
          // onBuyClick={onContactUsHandler}
          id="2"
        />
        <SafDivider className="details-divider" />
        <FaqsSection faqs={faqs} />
      </div>
    </>
  );
};
