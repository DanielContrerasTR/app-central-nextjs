import { useConfigStore } from "app/config/useConfigStore";
import { setLoading } from "../reducers/global-loader.reducer";
import { getSafeId } from "../utils/common-utils";

export const useGlobalLoader = () => {
  const { useAppSelector, dispatch } = useConfigStore();

  const { loading: globalLoading } = useAppSelector(
    ({ globalLoader }) => globalLoader
  );

  const isLoading = !!globalLoading.length;

  const startGlobalLoading = (id?: string) => {
    const safeId = getSafeId(id);

    dispatch(
      setLoading({
        id: safeId,
        loading: true,
      })
    );

    return safeId;
  };

  const finishGlobalLoading = (id: string) => {
    dispatch(
      setLoading({
        id,
        loading: false,
      })
    );
  };

  return {
    globalLoading,
    isLoading,
    startGlobalLoading,
    finishGlobalLoading,
  };
};
