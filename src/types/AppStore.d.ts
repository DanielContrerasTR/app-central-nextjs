import { type SortOption } from '../components/SortButton/sort.utils';
import { type QueryFilters } from '../shared/hooks/useQueryFilters';

import { type WithId } from './WithId';

export interface AppStore extends WithId<string> {
  icon: string
  video?: string
  htmlDescription?: string
  coverImage: string
  title: string
  periodicity: string
  developerName: string
  worksWith: string
  carrousel: string[]
  details: Details
  setupSecurity: SetupSecurity
  description: string
  vendor: Vendor
  policies: Policies
  plans: Plan[];
  faqs: Faq[]
}

export interface Details {
  categories: string[]
  capabilities: string[]
  supportedLanguages: string[]
}

export interface SetupSecurity {
  setup: string
  timeToLaunch: string
  security: string
  integrations: string[]
  licenses: string[]
}

export interface Vendor {
  website: string
  email: string
  address: string
  phone: string
  feedback: string
}

export interface Policies {
  returnPolicy: string
  privacyPolicy: string
  legalTermsOfUsePolicy: string
}

export interface Plan extends WithId<string> {
  title: string
  price: number
  periodicity: string
  subtitle: string
  perks: string[]
  recommended: boolean
}

export interface Faq {
  question: string
  answer: string
}

export interface Link {
  text: string,
  url: string
}
export interface Resource {
  title: string;
  type: string,
  date: string,
  duration?: string;
  link: Link;
}
  
// TODO: When the AppStore model is defined, AppStoreFetchParams should change to match the API expected params.
// TODO: Add pagination property
export interface AppStoreFetchParams extends Partial<AppStore> {
  queryFilters?: QueryFilters;
  sort?: SortOption;
}