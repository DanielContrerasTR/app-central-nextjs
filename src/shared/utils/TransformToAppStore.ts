import { toSlugCase } from "../../shared/utils/common-utils";
import { type AemAppStore } from "../../types/AemAppStore";
import { type AppStore, type Plan } from "../../types/AppStore";

export const transformToAppStore = (aem: AemAppStore) => {
  const appStore: AppStore = {
    id: aem.name,
    name: aem.name,
    icon: aem.media.appIcon,
    video: aem.media.previewVideo,
    htmlDescription: aem.htmlDescription,
    title: aem.title,
    developerName: aem.developer.name,
    periodicity: "year",
    worksWith: aem.worksWith[0],
    coverImage: aem.media.appIcon,
    carrousel: aem.media.screenshots,
    details: {
      categories: [aem.primaryCategory],
      capabilities: aem.capabilities,
      supportedLanguages: aem.supportedLanguages,
    },
    setupSecurity: {
      setup: aem.setupExpectations,
      setupDocumentUrl: aem.setupDocumentUrl,
      timeToLaunch: aem.timeToLaunch,
      security: aem.securityCompliance,
      securityDocumentUrl: aem.securityDocumentUrl,
      integrations: [aem.otherIntegrations],
      licenses: [aem.otherLicenseRequirements],
    },
    description: aem.description,
    vendor: {
      ...aem.developer,
      support: aem.helpAndSupportUrl,
    },
    policies: {
      returnPolicy: aem.developer?.returnPolicy,
      privacyPolicy: aem.privacyPolicy,
      legalTermsOfUsePolicy: aem.legalTermsUrl,
    },
    plans: aem.plans.map(plan => {
      const { subTitle, description, price, frequency, ...rest } = plan;

      const result: Plan = {
        // TODO: Solve what to do with the id on AEM
        id: "",
        title: rest.title,
        price: parseFloat(price),
        periodicity: frequency,
        subtitle: subTitle,
        perks: description ? description.split("\n") : [],
        recommended: false,
      };

      return result;
    }),
    faqs: aem.faqs,
    slug: toSlugCase(aem.name),
  };

  return appStore;
};
