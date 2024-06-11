import { screen, waitFor } from '@testing-library/react';

import { initialState } from '../../shared/reducers/app-store.reducer';
import { renderWithProvidersAndMemoryRouter } from '../../shared/utils/test/renderWithProviders';
import { type CoveoSearchParams,type CoveoSearchResponseV2 } from '../../utils/StoreApi/CoveoSearch';
import StoreApi from '../../utils/StoreApi/StoreApi';

import data from './search-page-coveo-response.mock.json';
import {SearchPage} from './SearchPage';

// TODO: Why this tests are taking so long to complete?
jest.setTimeout(20000);

describe('SearchPage', () => {

    beforeAll(() => {
        process.env.APP_STORE_PATH = '/app-store';

        // TODO: Is this the best way of mocking the search implementation?
        jest.spyOn(StoreApi, 'coveoSearch').mockImplementation(async (params: CoveoSearchParams) =>  data as CoveoSearchResponseV2);
        
    });
    
    it('render the component without error', async () => {
        renderWithProvidersAndMemoryRouter(<SearchPage />, {
            preloadedState:{ appStore: initialState},
            initialEntries:[{
                pathname: '/search',
                search: '?q=invoice&categories=featured' 
            }]
        });

        await waitFor(() => { expect(screen.getByTestId('search-page')).toBeInTheDocument(); });
        
        expect(screen.getByTestId('apps-filter')).toBeInTheDocument();
        expect(screen.getByTestId('app-store-card-search-results')).toBeInTheDocument();

        const grid = screen.queryByTestId('app-grid');
        expect(grid).toBeDefined();
        expect(grid?.childElementCount).toBe(1);
    });
});