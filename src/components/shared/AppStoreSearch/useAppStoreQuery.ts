import { useConfigStore } from 'app/config/useConfigStore';
import { updateQuery } from 'app/shared/reducers/app-store.reducer';

export const useAppStoreQuery = () => {
    const { useAppSelector, dispatch } = useConfigStore();

    const query = useAppSelector(({ appStore }) => appStore.query);

    const updateQueryValue = (value: string) => {
        dispatch(updateQuery(value));
    };

    const reset = () => {
        dispatch(updateQuery(''));
    };

    return {
        query,
        updateQueryValue,
        reset
    };
};
