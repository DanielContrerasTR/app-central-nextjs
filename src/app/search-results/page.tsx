"use client";

import './page.scss';

import { useEffect } from 'react';
import { SafDivider } from '@saffron/core-components/react';

import { AppsFilter } from 'app/components/shared/AppsFilter/AppsFilter';
import { useAppStoreSearch } from 'app/components/shared/AppStoreSearch/useAppStoreSearch';
import { useQueryFilters } from 'app/shared/hooks/useQueryFilters';
import { useSearchAutocomplete } from 'app/components/shared/SafSearchAutocomplete/useSearchAutocomplete';
import { useAppStoreQuery } from 'app/components/shared/AppStoreSearch/useAppStoreQuery';
import { useGlobalLoader } from 'app/shared/hooks/useGlobalLoader';
import { AppStoreCardSearchResults } from 'app/components/shared/AppStoreSearch/AppStoreCardSearchResults';

export function SearchPage() {
    const { apps, searchApps } = useAppStoreSearch();

    const { sortOption, sortOrder, queryFilters } = useQueryFilters();

    const { inputValue: query } = useSearchAutocomplete();

    const { updateQueryValue } = useAppStoreQuery();

    const { isLoading } = useGlobalLoader();

    // When loading the page in the navigator using the url we need to rehydrate state
    useEffect(() => {
        updateQueryValue(query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        searchApps({
            query,
            queryFilters,
            sortOption,
            sortOrder
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, queryFilters, sortOption]);

    if (isLoading) {
        return null;
    }

    return (
        // TODO: Is it necessary to add a base layout??
        <div className='p-4 apps-page search-page' data-testid='search-page'>
            {/* <HelmetTags title='Search results' /> */}
            <div className='apps-page-content'>
                <div className='d-flex justify-content-between align-items-center w-100 mb-3'>
                    <h1 className='section-header-title'>
                        <span className='query-length'>{apps.length}</span> results for “{query}”
                    </h1>
                    <AppsFilter />
                </div>

                <SafDivider className='mb-3' />

                <AppStoreCardSearchResults />
            </div>
            <div className='d-flex gap-3 flex-column' />
        </div>
    );
}


export default SearchPage;