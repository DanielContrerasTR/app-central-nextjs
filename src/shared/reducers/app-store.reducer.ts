import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  AppStoreFetchParams,
  type AppStore,
  type Resource,
} from "../../types/AppStore";
import { type TopCategory } from "../../types/FilterCategory";
import StoreApi from "../utils/StoreApi";

import { serializeAxiosError } from "./reducer.utils";
import { GlobalLoaderHandler } from "app/components/shared/GlobalLoader/GlobalLoaderHandler";
import { AvailableFilters } from "../const";
import { CoveoSearchParams } from "app/types/CoveoSearch";
import { coveoToAppStore } from "./coveoToAppStore.utils";

export const initialState = {
  query: "",
  apps: [] as AppStore[],
  featuredApps: [] as AppStore[],
  mostPopular: [] as AppStore[],
  resources: [] as Resource[],
  topCategories: [] as TopCategory[],
  coveoResults: [] as AppStore[],
  isInstalled: false,
  successMessage: null as string | null,
  errorMessage: null as undefined | null | string,
};

export type AppStoreState = Readonly<typeof initialState>;

export const getAllApps = createAsyncThunk(
  "appStore/getAll",
  async (appStoreFetchParams: AppStoreFetchParams, { dispatch }) => {
    const getAllAppsHandler = async () => {
      const searchParams = getSearchParams(appStoreFetchParams);
      const response = await StoreApi.getAll(searchParams);
      const apps = coveoToAppStore(response.results);
      return apps;
    };
    const globalLoaderHandler = new GlobalLoaderHandler(dispatch);
    const apps = await globalLoaderHandler.run(getAllAppsHandler);
    return apps;
  },
  { serializeError: serializeAxiosError }
);

export const getFeaturedApps = createAsyncThunk(
  "appStore/getFeaturedApps",
  async (_, { dispatch }) => {
    const globalLoaderHandler = new GlobalLoaderHandler(dispatch);
    const response = await globalLoaderHandler.run(StoreApi.getFeatured);
    const apps = coveoToAppStore(response.results);
    return apps.slice(0, 3);
  },
  { serializeError: serializeAxiosError }
);

export const getMostPopularApps = createAsyncThunk(
  "appStore/getMostPopularApps",
  async (_, { dispatch }) => {
    const globalLoaderHandler = new GlobalLoaderHandler(dispatch);
    const response = await globalLoaderHandler.run(StoreApi.getMostPopular);
    const apps = coveoToAppStore(response.results);
    return apps.slice(0, 6);
  },
  { serializeError: serializeAxiosError }
);

export const getLatestResources = createAsyncThunk(
  "appStore/getLatestResources",
  async (_, { dispatch }) => {
    const globalLoaderHandler = new GlobalLoaderHandler(dispatch);
    const apps = await globalLoaderHandler.run(StoreApi.getLatestResources);
    return apps;
  },
  { serializeError: serializeAxiosError }
);

export const getTopCategories = createAsyncThunk(
  "appStore/getTopCategories",
  async (_, { dispatch }) => {
    const globalLoaderHandler = new GlobalLoaderHandler(dispatch);
    const apps = await globalLoaderHandler.run(StoreApi.getTopCategories);
    return apps;
  },
  { serializeError: serializeAxiosError }
);

export const AppStoreSlice = createSlice({
  name: "appStore",
  initialState: initialState as AppStoreState,
  reducers: {
    reset() {
      return initialState;
    },
    add(state, action: PayloadAction<AppStore>) {
      state.apps.push(action.payload);
    },
    updateQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    toggleIsInstalled(state) {
      state.isInstalled = !state.isInstalled;
    },
    setMessage(state, action: PayloadAction<string>) {
      state.successMessage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllApps.fulfilled, (state, action) => {
        state.apps = action.payload;
      })
      .addCase(getFeaturedApps.fulfilled, (state, action) => {
        state.featuredApps = action.payload;
      })
      .addCase(getMostPopularApps.fulfilled, (state, action) => {
        state.mostPopular = action.payload;
      })
      .addCase(getLatestResources.fulfilled, (state, action) => {
        state.resources = action.payload;
      })
      .addCase(getTopCategories.fulfilled, (state, action) => {
        state.topCategories = action.payload;
      });
  },
});

export const { reset, add, updateQuery, setMessage, toggleIsInstalled } =
  AppStoreSlice.actions;

export const AppStoreReducer = AppStoreSlice.reducer;

const getSearchParams = (appStoreFetchParams: AppStoreFetchParams) => {
  const {
    title,
    queryFilters,
    sort: sortField,
    sortOrder,
  } = appStoreFetchParams;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getQueryFiltersByName =
    (queryFilters: Record<string, string[]> | undefined) =>
    (filterId: AvailableFilters) =>
      queryFilters?.[filterId] ?? [];

  const getByName = getQueryFiltersByName(queryFilters);

  const params: CoveoSearchParams = {
    q: title,
    categories: getByName("categories"),
    capabilities: getByName("capabilities"),
    industries: getByName("industries"),
    worksWith: getByName("works-with"),
    developers: getByName("developer"),
    languages: getByName("languages"),
    sortField,
    sortOrder,
  };

  return params;
};
