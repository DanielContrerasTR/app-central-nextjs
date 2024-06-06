import { type SortOrder } from "../../components/SortButton/sort.utils";

export interface CoveoSearchParams {
  q?: string;
  categories?: string[];
  capabilities?: string[];
  industries?: string[];
  worksWith?: string[];
  developers?: string[];
  languages?: string[];
  sortField?: string;
  sortOrder?: SortOrder;
}

export interface CoveoSearchResponseV2 {
  totalCount: number;
  results: Result[];
}

export interface Result {
  appName: string;
  uri: string;
  icon: string;
  thumbnails: string;
  description: string;
  excerpt: string;
  categories: string[];
  capabilities: string[];
  industry: string[];
  workswith: string[];
  developer: string;
  documenttype: string;
  language: string[];
  producttype: string;
  slug: string;
}
