'use client'

import { useAppStoreQuery } from '../AppStoreSearch/useAppStoreQuery';

import { type ListBoxOption } from './SafSearchAutocompleteBase';
import { useSearchParamsBase } from './useSearchParamsBase';
import { sleep } from 'app/shared/utils/sleep-util';
import { useCustomNavigate } from 'app/shared/hooks/useCustomNavigate';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

export const useSearchAutocomplete = () => {
    const pathname = usePathname();
    
    const { navigate, navigateBase } = useCustomNavigate();

    const { updateQueryValue, reset } = useAppStoreQuery();

    // TODO: The source of truth for the query input is based on the q param from url.
    // Is this ok?
    const { searchParams, setSearchParams, getQueryParam } = useSearchParamsBase();

    // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
 
      return params.toString();
    },
    [searchParams]
  );

    const query = getQueryParam('q');

    const setQuery = (q: string) => {
        const updatedSearchParams = createQueryString('q', q);
        navigateBase.push(`${pathname}?${updatedSearchParams}`)
    };

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const searchAutocomplete = async (query: string) => {
        await sleep(300);
        // TODO: Add logic for getting response from backend based on the query
        return MOCKED_SUGGESTIONS;
    };

    const clear = () => {
        setQuery('');
        setSearchParams({ q: '' });
        reset();
    };

    // Selecting a suggestion from the list
    const onSelectedSuggestion = async (option: ListBoxOption) => {
        setQuery(option.label);
        // TODO: Navigate to specific content based on the selected option?
        // At the moment, for all options this is doing the onGlobalSearch process
        await onGlobalSearch(option.label);
    };

    // Clicking on the button and redirect to search results page with non specific item
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const onGlobalSearch = async (query: string) => {
        setQuery(query);
        const updatedSearchParams = createQueryString('q', query);
        // TODO: Find a better way to prevent losing url search params
        navigateBase.replace(`/search-results?${updatedSearchParams}`)
        
        updateQueryValue(query);
    };

    return {
        searchAutocomplete,
        inputValue: query,
        setQuery,
        clear,
        onSelectedSuggestion,
        onGlobalSearch
    };
};

const MOCKED_SUGGESTIONS: ListBoxOption[] = [
    {
        label: 'Evelyn',
        value: 'evelyn'
    },
    {
        label: 'Evelyn apps',
        value: 'evelyn-apps'
    },
    {
        label: 'Evelyn articles',
        value: 'evelyn-articles'
    },
    {
        label: 'Evelyn integrations',
        value: 'evelyn-integrations'
    },
    {
        label: 'Evelyn insights',
        value: 'evelyn-insights'
    },
    {
        label: 'Evelyn developers',
        value: 'evelyn-developers'
    },
    {
        label: 'Evelyn applications',
        value: 'evelyn-applications'
    },
    {
        label: 'Evelyn help',
        value: 'evelyn-help'
    }
];
