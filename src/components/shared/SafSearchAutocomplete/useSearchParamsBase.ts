import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useSearchParamsBase = () => {
  const searchParams = useSearchParams();

  const getQueryParam = (key: string) => {
    const param = searchParams.get(key) ?? "";
    return param;
  };
  
  const setSearchParams = useCallback(
    (newSearchParams: { [key:string]: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const key in newSearchParams) {
        params.set(key, newSearchParams[key]);
      }
 
      return params;
    },
    [searchParams]
  );

  const setSearchParamsForce = useCallback(
    (newSearchParams: { [key:string]: string }) => {
      const params = new URLSearchParams();

      for (const key in newSearchParams) {
        params.set(key, newSearchParams[key]);
      }
 
      return params;
    },
    []
  );

  return {
    searchParams,
    setSearchParams,
    getQueryParam,
    setSearchParamsForce,
  };
};
