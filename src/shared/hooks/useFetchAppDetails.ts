import { useEffect, useState } from "react";

// import { transformToAppStore } from "../../pages/AppDetails/utils";
import { type AppStore } from "../../types/AppStore";
import StoreApi from "../utils/StoreApi";
import { useGlobalLoader } from "./useGlobalLoader";
import { useRouter } from "next/navigation";
import { transformToAppStore } from "../utils/TransformToAppStore";
import { ROUTE_PATHS } from "../const";

// import { useCustomNavigate } from "./useCustomNavigate";

const useFetchAppDetails = () => {
  const { startGlobalLoading, finishGlobalLoading } = useGlobalLoader();

  const fetchAppDetailsById = async (id: string) => {
    if (!id) {
      return null;
    }

    const loaderId = startGlobalLoading();
    let data: AppStore | null = null;

    try {
      if (id === "evelyn" || id === "syncly") {
        const response = await StoreApi.getAppDetailsByName(id);
        data = transformToAppStore(response);
      } else {
        data = await StoreApi.getAppDetails(id);
      }
      return data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e); // TODO: Handle the exception in a better way
    } finally {
      finishGlobalLoading(loaderId);
    }
    return null;
  };

  return { fetchAppDetailsById };
};

export const useAppDetailsOnLoad = (id: string | undefined) => {
  const [app, setApp] = useState<AppStore>();
  const router = useRouter();
  const { fetchAppDetailsById } = useFetchAppDetails();

  useEffect(() => {
    const fetch = async () => {
      if (!id) {
        return;
      }

      const response = await fetchAppDetailsById(id);

      if (!response) {
        router.push(ROUTE_PATHS.notFoundPage);
        return;
      }
      setApp(response);
    };

    void fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { app };
};
