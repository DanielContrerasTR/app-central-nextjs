import {
  createAsyncThunk,
  createSlice,
  //   isPending,
  //   isRejected,
  type PayloadAction,
} from "@reduxjs/toolkit";

// import { SearcherMock } from "../../components/AppStoreSearch/app-store-searcher-mock";
// import { sortBy } from "../../components/SortButton/sort.utils";
import {
  type AppStore,
  //   type AppStoreFetchParams,
  type Resource,
} from "../../types/AppStore";
import { type TopCategory } from "../../types/FilterCategory";
// import { type CoveoSearchParams } from "../../utils/StoreApi/CoveoSearch";
import StoreApi from "../utils/StoreApi";
// import { type QueryFilters } from "../hooks/useQueryFilters";

// import { coveoToAppStore } from "./coveoToAppStore.utils";
import { serializeAxiosError } from "./reducer.utils";
import { GlobalLoaderHandler } from "app/components/shared/GlobalLoader/GlobalLoaderHandler";
// import { AvailableFilters } from "../const";

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

// Actions
// export const getApps = createAsyncThunk(
//   "appStore/getApps",
//   async (params: AppStoreFetchParams, { dispatch }): Promise<AppStore[]> => {
//     const searcherHandler = async () => {
//       const searcher = new SearcherMock();
//       const apps = await searcher.search(params);
//       return apps;
//     };

//     const globalLoaderHandler = new GlobalLoaderHandler(dispatch);
//     const apps = await globalLoaderHandler.run(searcherHandler);

//     return apps;
//   },
//   { serializeError: serializeAxiosError }
// );

export const getAllApps = createAsyncThunk(
  "appStore/getAll",
  async (_, { dispatch }) => {
    const globalLoaderHandler = new GlobalLoaderHandler(dispatch);
    const apps = await globalLoaderHandler.run(StoreApi.getAll);
    return apps;
  },
  { serializeError: serializeAxiosError }
);

export const getFeaturedApps = createAsyncThunk(
  "appStore/getFeaturedApps",
  async (_, { dispatch }) => {
    const globalLoaderHandler = new GlobalLoaderHandler(dispatch);
    const apps = await globalLoaderHandler.run(StoreApi.getFeatured);
    return apps;
  },
  { serializeError: serializeAxiosError }
);

export const getMostPopularApps = createAsyncThunk(
  "appStore/getMostPopularApps",
  async (_, { dispatch }) => {
    const globalLoaderHandler = new GlobalLoaderHandler(dispatch);
    const apps = await globalLoaderHandler.run(StoreApi.getMostPopular);
    return apps;
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

// export const searchAppsWithCoveo = createAsyncThunk(
//   "appStore/searchAppsCoveo",
//   async (params: AppStoreFetchParams, { dispatch }): Promise<AppStore[]> => {
//     const searcherHandler = async () => {
//       const { title, queryFilters, sort } = params;

//       // eslint-disable-next-line @typescript-eslint/no-shadow
//       const getQueryFiltersByName =
//         (queryFilters: QueryFilters | undefined) =>
//         (filterId: AvailableFilters) =>
//           queryFilters?.[filterId] ?? [];

//       const getByName = getQueryFiltersByName(queryFilters);

//       const query: CoveoSearchParams = {
//         q: title,
//         categories: getByName("categories"),
//         capabilities: getByName("capabilities"),
//         industries: getByName("industries"),
//         worksWith: getByName("works-with"),
//         developers: getByName("developer"),
//         languages: getByName("languages"),
//       };

//       const response = await StoreApi.coveoSearch(query);
//       const apps = coveoToAppStore(response);
//       // TODO: This should be done in the backend later
//       const sortedApps = sortBy(apps, sort);

//       return sortedApps;
//     };

//     const globalLoaderHandler = new GlobalLoaderHandler(dispatch);
//     const apps = await globalLoaderHandler.run(searcherHandler);

//     return apps;
//   },
//   { serializeError: serializeAxiosError }
// );

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
      //   .addCase(searchAppsWithCoveo.fulfilled, (state, action) => {
      //     state.coveoResults = action.payload;
      //   })
      //   .addCase(getApps.fulfilled, (state, action) => {
      //     state.apps = action.payload;
      //   })
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
    //   .addMatcher(isPending(getApps, searchAppsWithCoveo), state => {
    //     state.errorMessage = null;
    //   })
    //   .addMatcher(isRejected(getApps, searchAppsWithCoveo), (state, action) => {
    //     state.errorMessage = action.error.message ?? null;
    //   });
  },
});

export const { reset, add, updateQuery, setMessage, toggleIsInstalled } =
  AppStoreSlice.actions;

export const AppStoreReducer = AppStoreSlice.reducer;
