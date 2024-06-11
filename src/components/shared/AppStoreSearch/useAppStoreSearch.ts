
import { QueryFilters } from 'app/shared/hooks/useQueryFilters';
import { type SortOrder } from '../SortButton/sort.utils';

import { useAppStoreQuery } from './useAppStoreQuery';
import { useConfigStore } from 'app/config/useConfigStore';
import { searchAppsWithCoveo } from 'app/shared/reducers/app-store.reducer';

interface SearchAppsParams {
    query: string; 
    queryFilters: QueryFilters; 
    sortOption: string;
    sortOrder: SortOrder;
}

export const useAppStoreSearch = () => {
    const { query } = useAppStoreQuery();
    const { useAppSelector, dispatch } = useConfigStore();
    
    const { coveoResults: apps } = useAppSelector(({ appStore }) => appStore);

    const searchApps = (params: SearchAppsParams) => {
        void dispatch(searchAppsWithCoveo({
            title: params.query,
            ...params
        }));
    };

    return {
        searchApps,
        apps,
        query
    };
};
