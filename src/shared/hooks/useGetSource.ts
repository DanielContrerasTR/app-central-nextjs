// import { useEnvConfig } from "./useEnvConfig";

export const useGetSource = () => {
  //   const { outputDomain } = useEnvConfig();

  const isValidHttpUrl = (string: string) => {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  };

  const getSource = (source: string | undefined) => {
    if (!source) {
      return "";
    }

    if (isValidHttpUrl(source)) {
      return source;
    }

    // return `${outputDomain}${source}`;
    return `/${source}`;
  };

  return {
    getSource,
    isValidHttpUrl,
  };
};
