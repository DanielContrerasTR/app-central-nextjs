// import "../../config/envConfig";


import { client } from "./AxiosClient";
import { type AemAppStore } from "../../types/AemAppStore";
import { type AppStore, type Resource } from "../../types/AppStore";
import { type TopCategory } from "../../types/FilterCategory";
import {
  CoveoSearchParams,
  CoveoSearchResponseV2,
} from "app/types/CoveoSearch";

// import {
//   type CoveoSearchParams,
//   type CoveoSearchResponseV2,
// } from "./CoveoSearch";
// import { type CoveoSearchResponseMocked } from "./StoreApi.types";

async function getAll(
  params: CoveoSearchParams
): Promise<CoveoSearchResponseV2> {
  const { data } = await client.post<CoveoSearchResponseV2>(
    "/apps/list",
    params
  );
  return data;
}

async function getFeatured(): Promise<CoveoSearchResponseV2> {
  const { data } = await client.get<CoveoSearchResponseV2>("/apps/featured");
  return data;
}

async function getMostPopular(): Promise<CoveoSearchResponseV2> {
  const { data } = await client.get<CoveoSearchResponseV2>(
    "/apps/most-popular"
  );
  return data;
}

async function getAppDetails(appId: string) {
  const { data } = await client.get<AppStore>(`/apps/${appId}`);
  return data;
}

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
