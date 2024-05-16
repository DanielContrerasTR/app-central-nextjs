// import "../../config/envConfig";

import axios, { type Axios } from "axios";

import { type AemAppStore } from "../../types/AemAppStore";
import { type AppStore, type Resource } from "../../types/AppStore";
import { type TopCategory } from "../../types/FilterCategory";

// import {
//   type CoveoSearchParams,
//   type CoveoSearchResponseV2,
// } from "./CoveoSearch";
// import { type CoveoSearchResponseMocked } from "./StoreApi.types";

const client: Axios = axios.create({
  baseURL:
    "https://api-dev.thomsonreuters.com/developer-experience/appstore/v1",
});

async function getAll() {
  const { data } = await client.get<AppStore[]>("/apps");
  return data;
}

async function getFeatured() {
  const { data } = await client.get<AppStore[]>("/apps/featured");
  return data;
}

async function getMostPopular() {
  const { data } = await client.get<AppStore[]>("/apps/most-popular");
  return data;
}

async function getAppDetails(appId: string) {
  const { data } = await client.get<AppStore>(`/apps/${appId}`);
  return data;
}

// async function coveoSearch(
//   params: CoveoSearchParams
// ): Promise<CoveoSearchResponseV2> {
//   const { data } = await client.post("/apps/coveo-search", params);
//   return data;
// }

// async function coveoSearchMock(
//   params: CoveoSearchParams
// ): Promise<CoveoSearchResponseMocked> {
//   const { data } = await client.post<CoveoSearchResponseMocked>(
//     "/search/coveo-mock",
//     params
//   );
//   return data;
// }

async function getLatestResources() {
  const { data } = await client.get<Resource[]>("/resources/latest");
  return data;
}

async function getTopCategories() {
  const { data } = await client.get<TopCategory[]>("/apps/top-categories");
  return data;
}

async function getAppDetailsByPath(path: string) {
  const { data } = await client.get<AemAppStore>("/apps/by-path", {
    params: { path },
  });
  return data;
}

async function getAppDetailsByName(name: string) {
  const { data } = await client.get<AemAppStore>("/apps/by-name", {
    params: { name },
  });
  return data;
}

export default {
  getAppDetailsByPath,
  getAppDetailsByName,
  getAll,
  getFeatured,
  getMostPopular,
  getAppDetails,
  //   coveoSearch,
  //   coveoSearchMock,
  getLatestResources,
  getTopCategories,
};
