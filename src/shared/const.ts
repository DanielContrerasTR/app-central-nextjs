import { FilterCategory } from "app/types/FilterCategory";

export const FILTER_CATEGORIES: FilterCategory[] = [
  {
    id: "works-with",
    name: "Works with",
    filters: [
      {
        id: "clear",
        name: "CLEAR",
      },
      {
        id: "cocounsel",
        name: "CoCounsel",
      },
      {
        id: "highq",
        name: "HighQ",
      },
      {
        id: "legal-tracker",
        name: "Legal Tracker",
      },
      {
        id: "onesource-tax-determination",
        name: "ONESOURCE Tax Determination",
      },
      {
        id: "practical-law",
        name: "Practical Law",
      },
      {
        id: "litigation-analytics",
        name: "Litigation Analytics",
      },
      {
        id: "data-hub",
        name: "Data Hub",
      },
    ],
  },
  {
    id: "categories",
    name: "Categories",
    filters: [
      {
        id: "featured",
        name: "Featured",
      },
      {
        id: "most-popular",
        name: "Most Popular",
      },
      {
        id: "newly-released",
        name: "Newly released",
      },
      {
        id: "best-selling",
        name: "Best selling",
      },
      {
        id: "legal",
        name: "Legal",
      },
      {
        id: "tax-and-accounting",
        name: "Tax and Accounting",
      },
      {
        id: "risk-and-fraud",
        name: "Risk and Fraud",
      },
    ],
  },
  {
    id: "capabilities",
    name: "Capabilities",
    filters: [
      {
        id: "ai-drafting",
        name: "AI drafting",
      },
      {
        id: "alert-review",
        name: "Alert review",
      },
      {
        id: "data-analytics",
        name: "Data analytics",
      },
      {
        id: "data-retrieval",
        name: "Data retrieval",
      },
      {
        id: "data-visualization",
        name: "Data visualization",
      },
      {
        id: "document-retrieval",
        name: "Document-retrieval",
      },
      {
        id: "document-review",
        name: "Document review",
      },
      {
        id: "document-synchronization",
        name: "Document synchronization",
      },
      {
        id: "id-verification",
        name: "ID verification",
      },
      {
        id: "legal-data-and-document-sync",
        name: "Legal data and document sync",
      },
      {
        id: "legal-data-management",
        name: "Legal data management",
      },
      {
        id: "legal-document-management",
        name: "Legal document management",
      },
      {
        id: "payment-integrity",
        name: "Payment integrity",
      },
      {
        id: "regional-tax-rules",
        name: "Regional tax rules",
      },
      {
        id: "risk-analysis",
        name: "Risk analysis",
      },
      {
        id: "synchronize-workflows",
        name: "Synchronize workflows",
      },
      {
        id: "tax-calculations",
        name: "Tax calculations",
      },
      {
        id: "transactional-sanctions-screening",
        name: "Transactional sanctions screening",
      },
      {
        id: "workflow-automation",
        name: "Workflow automation",
      },
    ],
  },
  {
    id: "developer",
    name: "Developed by",
    filters: [
      {
        id: "thomson-reuters",
        name: "Thomson Reuters",
      },
      {
        id: "baker-tilly",
        name: "Baker Tilly",
      },
      {
        id: "seeunity",
        name: "SeeUnity",
      },
      {
        id: "syncly",
        name: "Syncly",
      },
      {
        id: "workfusion",
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
