import { Result } from "app/types/CoveoSearch";
import { type AppStore } from "../../types/AppStore";

const getSafeValue = (value: string, defaultValue: string) =>
  value || defaultValue;

const defaultValues = (result: Result) => ({
  description: getSafeValue(result.description, "No description provided"),
  icon: getSafeValue(result.icon, "Evelyn-icon.svg"),
  coverImage: getSafeValue(result.thumbnails, "Evelyn-cover.svg"),
  title: getSafeValue(result.appName, "No title provided"),
});

export const coveoToAppStore = (results?: Result[]): AppStore[] => {
  if (!results) {
    return [];
  }

  const apps: AppStore[] = results?.map((result: Result, index: number) => {
    const app: AppStore = {
      id: `${result.appName}.${index}`,
      name: result.appName,
      icon: result.icon,
      coverImage: result.thumbnails,
      title: result.appName,
      periodicity: "",
      developerName: result.developer,
      worksWith: result.workswith.at(0) ?? "",
      carrousel: [],
      details: {
        categories: result.categories,
        capabilities: result.capabilities,
        supportedLanguages: result.language,
      },
      setupSecurity: {
        setup: "",
        timeToLaunch: "",
        security: "",
        integrations: [],
        licenses: [],
      },
      description: result.description,
      vendor: {
        website: "",
        email: "",
        address: "",
        phone: "",
        feedback: "",
      },
      policies: {
        returnPolicy: "",
        privacyPolicy: "",
        legalTermsOfUsePolicy: "",
      },
      plans: [],
      faqs: [],
      slug: result.slug,
    };

    // TODO: When the values get indexed just return app
    return {
      ...app,
      ...defaultValues(result),
    };
  });

  return apps;
};
