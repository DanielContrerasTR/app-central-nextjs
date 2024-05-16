import { useConfigStore } from "../../config/useConfigStore";
import { type AppStore, type AppStoreFetchParams } from "../../types/AppStore";
import {
  add,
  getAllApps,
  //   getApps,
  getFeaturedApps,
  getLatestResources,
  getMostPopularApps,
  getTopCategories,
} from "../reducers/app-store.reducer";

export const useAppStore = () => {
  const { useAppSelector, dispatch } = useConfigStore();

  const { apps, featuredApps, mostPopular, resources, topCategories } =
    useAppSelector(({ appStore }) => appStore);
  const successMessage = useAppSelector(
    ({ appStore }) => appStore.successMessage
  );
  const isInstalled = useAppSelector(({ appStore }) => appStore.isInstalled);

  const findById = (id: string) => apps?.find(item => item.id === id);

  //   const fetch = (params?: AppStoreFetchParams) => {
  //     void dispatch(getApps(params ?? {}));
  //   };

  const fetchAllApps = () => {
    void dispatch(getAllApps());
  };
  const fetchFeaturedApps = () => {
    void dispatch(getFeaturedApps());
  };
  const fetchMostPopularApps = () => {
    void dispatch(getMostPopularApps());
  };
  const fetchLatestResources = () => {
    void dispatch(getLatestResources());
  };
  const fetchTopCategories = () => {
    void dispatch(getTopCategories());
  };

  const addToAppSore = (appStore: AppStore) => {
    void dispatch(add(appStore));
  };

  return {
    apps,
    fetch,
    fetchAllApps,
    fetchFeaturedApps,
    fetchMostPopularApps,
    fetchLatestResources,
    fetchTopCategories,
    addToAppSore,
    findById,
    featuredApps,
    mostPopular,
    resources,
    topCategories,
    successMessage,
    isInstalled,
  };
};
