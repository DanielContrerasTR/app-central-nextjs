export const useCurrentEnvironment = () => {
    const isAppStoreMfe = Boolean(document.getElementById('app-store-mfe'));

    return { isAppStoreMfe: true };
};
