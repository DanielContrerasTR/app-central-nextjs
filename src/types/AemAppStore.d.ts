export interface AemAppStoreMedia {
  appIcon: string;
  screenshots: string[];
  previewVideo: string;
}

export interface AemAppStoreDeveloper {
  name: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  feedback: string;
  returnPolicy: string;
}

export interface AemAppStorePlans {
  name: string;
  title: string;
  subTitle: string;
  description: string;
  price: string;
  frequency: string;
  recommended: boolean;
}

export interface AemAppStoreFaqs {
  question: string;
  answer: string;
}

export interface AemAppStore {
  htmlDescription: string;
  path: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  industries: string[];
  primaryCategory: string;
  capabilities: string[];
  otherCategories: string[];
  supportedLanguages: string[];
  worksWith: string[];
  timeToLaunch: string;
  setupDocumentUrl: string;
  securityDocumentUrl: string;
  setupExpectations: string;
  securityCompliance: string;
  otherIntegrations: string;
  otherLicenseRequirements: string;
  privacyPolicy: string;
  legalTermsUrl: string;
  helpAndSupportUrl: string;
  media: AemAppStoreMedia;
  developer: AemAppStoreDeveloper;
  plans: AemAppStorePlans[];
  faqs: AemAppStoreFaqs[];
}
