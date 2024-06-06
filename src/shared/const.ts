import { FilterCategory } from "app/types/FilterCategory";

export const FILTER_CATEGORIES: FilterCategory[] = [
  {
    id: "works-with",
    name: "Works with",
    filters: [
      {
        id: "CLEAR",
        name: "CLEAR",
      },
      {
        id: "CoCounsel",
        name: "CoCounsel",
      },
      {
        id: "HighQ",
        name: "HighQ",
      },
      {
        id: "Legal Tracker",
        name: "Legal Tracker",
      },
      {
        id: "ONESOURCE Tax Determination",
        name: "ONESOURCE Tax Determination",
      },
      {
        id: "Practical Law",
        name: "Practical Law",
      },
      {
        id: "Litigation Analytics",
        name: "Litigation Analytics",
      },
      {
        id: "ONESOURCE Data Hub",
        name: "ONESOURCE Data Hub",
      },
    ],
  },
  {
    id: "categories",
    name: "Categories",
    filters: [
      {
        id: "Featured",
        name: "Featured",
      },
      {
        id: "Most Popular",
        name: "Most Popular",
      },
      {
        id: "Newly released",
        name: "Newly released",
      },
      {
        id: "Best selling",
        name: "Best selling",
      },
      {
        id: "Legal",
        name: "Legal",
      },
      {
        id: "Tax and Accounting",
        name: "Tax and Accounting",
      },
      {
        id: "Risk and Fraud",
        name: "Risk and Fraud",
      },
    ],
  },
  {
    id: "capabilities",
    name: "Capabilities",
    filters: [
      {
        id: "Customer operations",
        name: "Customer operations",
      },
      {
        id: "Exemption certificates",
        name: "Exemption certificates",
      },
      {
        id: "Partner master data",
        name: "Partner master data",
      },
      {
        id: "Data and document management",
        name: "Data and document management",
      },
      {
        id: "Data access",
        name: "Data access",
      },
      {
        id: "Data validation",
        name: "Data validation",
      },
      {
        id: "Document management",
        name: "Document management",
      },
    ],
  },
  {
    id: "developer",
    name: "Developed by",
    filters: [
      {
        id: "Thomson Reuters",
        name: "Thomson Reuters",
      },
      {
        id: "Baker Tilly",
        name: "Baker Tilly",
      },
      {
        id: "SeeUnity",
        name: "SeeUnity",
      },
      {
        id: "Syncly Ltd.",
        name: "Syncly Ltd.",
      },
      {
        id: "Workfusion",
        name: "Workfusion",
      },
    ],
  },
];

export type AvailableFilters =
  | "works-with"
  | "categories"
  | "capabilities"
  | "app-type"
  | "industries"
  | "products"
  | "developer"
  | "languages";

export const SITE_NAME = "App Central";

export const BASE_PATH = "/";

export const ROUTE_PATHS = {
  homePage: `${BASE_PATH}`,
  aboutPage: `${BASE_PATH}about`,
  appsPage: `${BASE_PATH}apps`,
  purchasePage: `${BASE_PATH}purchase`,
  searchResultsPage: `${BASE_PATH}search-results`,
  developersPage: `${BASE_PATH}developers`,
};
