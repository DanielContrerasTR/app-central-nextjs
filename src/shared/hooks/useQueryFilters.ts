import { useMemo } from 'react';

import { transformFromSearchParams, transformToSearchParams } from '../utils/filter-utils';
import { SortOrder } from 'app/components/shared/SortButton/sort.utils';
import { useSearchParamsBase } from 'app/components/shared/SafSearchAutocomplete/useSearchParamsBase';
import { FILTER_CATEGORIES } from '../const';
import { useCustomNavigate } from './useCustomNavigate';
import { usePathname } from 'next/navigation';

export type QueryFilters = Record<string, string[]>;

export const DEFAULT_SORT = 'name';

export const DEFAULT_ORDER = 'asc';

export const useQueryFilters = () => {
    const pathname = usePathname();
    const { navigate } = useCustomNavigate();

    const { searchParams, setSearchParams, getQueryParam, setSearchParamsForce} = useSearchParamsBase();
    
    const queryFilters: QueryFilters = useMemo( () => transformFromSearchParams(searchParams), [searchParams]);

    const setQueryFilters = (newFilters: QueryFilters) => {
        const formatted = transformToSearchParams(newFilters);
        const filterCategories = FILTER_CATEGORIES.map(({id}) => id);
        const otherParams = [...searchParams].filter(([key, _]) => !filterCategories.includes(key));
        
        const updatedSearchParams = setSearchParamsForce({
            ...Object.fromEntries(otherParams),
            ...formatted
        });
        
        navigate(`${pathname}?${updatedSearchParams.toString()}`) 
    };

    const deleteFilter = (category: string, filter: string) => {
        if (searchParams.get(category)) {
            const withoutFilter: QueryFilters = {
                ...queryFilters,
                [category]: (queryFilters[category] ?? []).filter(value => value !== filter)
            };

            setQueryFilters(withoutFilter);
        }
    };

    const appliedFilters = Object.values(queryFilters).flat();

    const sortOption = (getQueryParam('sort') || DEFAULT_SORT);

    const sortOrder = (getQueryParam('order') || DEFAULT_ORDER) as SortOrder;
    
    return {
        queryFilters,
        setQueryFilters,
        appliedFilters,
        deleteFilter,
        sortOption,
        searchParams,
        setSearchParams,
        sortOrder
    };
};
  